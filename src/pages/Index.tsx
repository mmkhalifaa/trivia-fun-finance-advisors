
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '../components/layout/MainLayout';
import { DailyChallenge } from '../components/home/DailyChallenge';
import { LeaderboardPreview } from '../components/home/LeaderboardPreview';
import { RecentActivity } from '../components/home/RecentActivity';
import { PageTransition } from '../components/shared/Transitions';
import { LoginModal } from '../components/login/LoginModal';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { user, logout } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <PageTransition>
        <div className="flex flex-col gap-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Welcome {user ? user.name : 'Back'}</h1>
                <p className="text-muted-foreground">Stay up to date with our daily trivia challenges</p>
              </div>
              <div>
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{user.role === 'admin' ? 'Admin' : 'User'}</span>
                    <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
                  </div>
                ) : (
                  <LoginModal />
                )}
              </div>
            </div>
          </motion.div>

          <DailyChallenge />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LeaderboardPreview />
            <RecentActivity />
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Home;
