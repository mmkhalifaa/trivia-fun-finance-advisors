
import React from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CalendarClock, 
  FileEdit, 
  BarChart2, 
  Settings, 
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';

export const AdminLayout = () => {
  const location = useLocation();
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/quizzes', label: 'Quiz Manager', icon: FileEdit },
    { path: '/admin/scheduled', label: 'Scheduled', icon: CalendarClock },
    { path: '/admin/reports', label: 'Reports', icon: BarChart2 },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];
  
  const handleLogout = () => {
    logoutAdmin();
    // Stay on the same page, which will now show the admin login form
  };
  
  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="bg-background min-h-screen">
      {/* Top header with back button */}
      <header className="bg-white border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to App</span>
          </Link>
          <h1 className="text-xl font-bold mx-auto">Admin Portal</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Admin Logout</span>
          </Button>
        </div>
      </header>
      
      <div className="container max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar navigation */}
        <aside className="w-full md:w-56 shrink-0">
          <nav className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="p-4">
              <h2 className="font-medium">Administration</h2>
            </div>
            <Separator />
            <div className="p-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>
        </aside>
        
        {/* Main content area */}
        <main className="flex-1 bg-white rounded-lg border border-border p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
