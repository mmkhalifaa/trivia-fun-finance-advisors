
import { useAuth } from '../../context/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoginModal } from '../login/LoginModal';
import { Home, Award, BarChart3, User, BookOpen, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Header = () => {
  const { user, logout, isAdmin } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/challenges', label: 'Challenges', icon: BookOpen },
    { path: '/leaderboard', label: 'Leaderboard', icon: BarChart3 },
    { path: '/badges', label: 'Badges', icon: Award },
    { path: '/profile', label: 'Profile', icon: User },
  ];
  
  // Only show admin link to users with admin role
  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin', icon: Settings });
  }

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-10">
      <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl text-primary mr-8">PB Trivia</Link>
          
          {/* Navigation tabs - now at the same level as the title */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  cn(
                    "flex items-center justify-center px-4 h-full transition-all duration-300 relative",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 w-full h-0.5 bg-primary" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div className="hidden md:block text-sm mr-2">
                <span className="font-medium">{user.name}</span>
                {isAdmin && <span className="ml-1 text-muted-foreground">(Admin)</span>}
              </div>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                  <span className="sr-only">Profile</span>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {user.name.charAt(0)}
                  </div>
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
      
      {/* Mobile navigation - show tabs on smaller screens */}
      <div className="md:hidden border-t border-border bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center h-12 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  cn(
                    "flex items-center justify-center px-4 h-full transition-all duration-300 relative flex-shrink-0",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 w-full h-0.5 bg-primary" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
