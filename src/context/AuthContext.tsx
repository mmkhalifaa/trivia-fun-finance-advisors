import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

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
  adminAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAdmin: (password: string) => Promise<void>;
  logout: () => void;
  logoutAdmin: () => void;
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
  id: '3',
  name: 'Dave Frame',
  email: 'dave.frame@example.com',
  role: 'user'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(false);
  
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
    
    // Check if admin is authenticated
    const isAdminAuth = localStorage.getItem('adminAuthenticated') === 'true';
    setAdminAuthenticated(isAdminAuth);
  }, []);
  
  const isAdmin = user?.role === 'admin';
  
  // Auto login for demo purposes (simulating SSO)
  useEffect(() => {
    if (!user) {
      // For demo, we auto-login as Dave Frame
      setUser(MOCK_USER);
      localStorage.setItem('currentUser', JSON.stringify(MOCK_USER));
    }
  }, [user]);
  
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
  
  // Admin login - separate from regular login
  const loginAdmin = async (password: string) => {
    // Simple check - in a real app, this would be more secure
    if (password === 'admin') {
      setAdminAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid admin password'));
  };
  
  const logout = () => {
    setUser(MOCK_USER); // Switch back to default user instead of null
    localStorage.setItem('currentUser', JSON.stringify(MOCK_USER));
  };
  
  const logoutAdmin = () => {
    setAdminAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAdmin, 
      adminAuthenticated, 
      login, 
      loginAdmin, 
      logout,
      logoutAdmin 
    }}>
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
    const { adminAuthenticated } = useAuth();
    
    // If admin is not authenticated, show login requirement
    if (!adminAuthenticated) {
      return <AdminLogin />;
    }
    
    // Admin is authenticated, show the protected component
    return <Component {...props} />;
  };
};

// Admin Login Component
const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const { loginAdmin } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(password);
    } catch (err) {
      setError('Invalid admin password');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Admin Access Required</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToHome}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>
        <p className="text-muted-foreground mb-6">
          Enter your admin password to access this area.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter password"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <p className="text-xs text-muted-foreground mt-2">
              (Hint: The password is "admin" for this demo)
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Login to Admin
          </button>
        </form>
      </div>
    </div>
  );
};
