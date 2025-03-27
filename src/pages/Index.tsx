
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '../components/layout/MainLayout';
import { DailyChallenge } from '../components/home/DailyChallenge';
import { LeaderboardPreview } from '../components/home/LeaderboardPreview';
import { RecentActivity } from '../components/home/RecentActivity';
import { PageTransition } from '../components/shared/Transitions';

const Home = () => {
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
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">Stay up to date with our daily trivia challenges</p>
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
