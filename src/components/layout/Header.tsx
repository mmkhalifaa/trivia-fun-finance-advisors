
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoginModal } from '../login/LoginModal';

export const Header = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-10">
      <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl text-primary">QuizMaster</Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/challenges" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Challenges
            </Link>
            <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </Link>
            <Link to="/badges" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Badges
            </Link>
          </nav>
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
    </header>
  );
};
