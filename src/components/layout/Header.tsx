
import { useAuth } from '../../context/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home, Award, BarChart3, User, BookOpen, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Header = () => {
  const { user, isAdmin } = useAuth();

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
        
        {/* Profile Badge - Always visible on desktop, right-aligned */}
        <div className="ml-auto">
          {user && (
            <Link to="/profile" className="flex items-center gap-2">
              <span className="hidden md:inline-block text-sm font-medium">
                {user.name}
                {isAdmin && <span className="ml-1 text-xs text-muted-foreground">(Admin)</span>}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {user.name?.charAt(0) || 'U'}
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
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium mt-1">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full" />
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
