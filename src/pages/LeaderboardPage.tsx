
import { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';
import { PageTransition } from '../components/shared/Transitions';
import { cn } from '../lib/utils';
import { mockLeaderboardDaily, mockLeaderboardWeekly, mockLeaderboardAllTime } from '../data/mockData';

type TimeframeType = 'daily' | 'weekly' | 'allTime';

const LeaderboardPage = () => {
  const [timeframe, setTimeframe] = useState<TimeframeType>('daily');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <MainLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank among other advisors</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={() => setTimeframe('daily')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              timeframe === 'daily'
                ? "bg-primary text-white shadow-md"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            )}
          >
            Today
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              timeframe === 'weekly'
                ? "bg-primary text-white shadow-md"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            )}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe('allTime')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              timeframe === 'allTime'
                ? "bg-primary text-white shadow-md"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            )}
          >
            All Time
          </button>
        </div>
        
        <LeaderboardTable 
          data={
            timeframe === 'daily' 
              ? mockLeaderboardDaily
              : timeframe === 'weekly'
              ? mockLeaderboardWeekly
              : mockLeaderboardAllTime
          }
          timeframe={timeframe}
        />
      </PageTransition>
    </MainLayout>
  );
};

export default LeaderboardPage;
