
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Award, BarChart3, User, BookOpen, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

export const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <nav className="w-full border-t border-border bg-white backdrop-blur-md">
      <div className="container max-w-5xl mx-auto">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                cn(
                  "flex flex-col items-center justify-center w-full h-full transition-all duration-300",
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
        </div>
      </div>
    </nav>
  );
};
