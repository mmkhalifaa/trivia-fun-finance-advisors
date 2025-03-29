
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Simplified user model - in a real app, this would be more complex
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from an API/database
const MOCK_ADMIN: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin'
};

const MOCK_USER: User = {
  id: '2',
  name: 'Regular User',
  email: 'user@example.com',
  role: 'user'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check if there's an existing session in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);
  
  const isAdmin = user?.role === 'admin';
  
  // Mock login function - in a real app, this would validate credentials with a server
  const login = async (email: string, password: string) => {
    // For demo purposes, we're just checking the email
    if (email === 'admin@example.com') {
      setUser(MOCK_ADMIN);
      localStorage.setItem('currentUser', JSON.stringify(MOCK_ADMIN));
    } else {
      setUser(MOCK_USER);
      localStorage.setItem('currentUser', JSON.stringify(MOCK_USER));
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };
  
  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component to protect routes that require admin access
export const withAdminAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { isAdmin, user } = useAuth();
    
    // If no user is logged in or user is not an admin, show login requirement
    if (!user || !isAdmin) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
            <p className="text-muted-foreground mb-6">
              You need to be logged in as an administrator to access this page.
            </p>
            {!user ? (
              <p>Please log in to continue.</p>
            ) : (
              <p>Your current account doesn't have administrator privileges.</p>
            )}
          </div>
        </div>
      );
    }
    
    // User is admin, show the protected component
    return <Component {...props} />;
  };
};
