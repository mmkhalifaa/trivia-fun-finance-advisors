
import { useAuth } from '../../context/AuthContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home, Award, BarChart3, BookOpen, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get initials from user's name (first letter of first and last name)
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`;
    }
    return name.charAt(0);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/challenges', label: 'Challenges', icon: BookOpen },
    { path: '/leaderboard', label: 'Leaderboard', icon: BarChart3 },
    { path: '/badges', label: 'Badges', icon: Award },
    { path: '/admin', label: 'Admin', icon: Settings }, // Admin tab always visible
  ];

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-10">
      <div className="container max-w-5xl mx-auto px-4 flex items-center h-16">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-primary mr-6">
          PB Trivia
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center flex-1 h-full">
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
        </nav>
        
        {/* Profile Avatar with Initials */}
        <div className="ml-auto">
          {user && (
            <Link to="/profile">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {user.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-white overflow-x-auto">
        <nav className="flex items-center justify-between">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                cn(
                  "flex flex-col items-center justify-center py-2 px-2 flex-1 transition-all duration-300 relative",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn(
                    "w-5 h-5 mb-1 transition-all duration-300",
                    isActive ? "scale-110" : ""
                  )} />
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 w-10 h-1 bg-primary rounded-t-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
