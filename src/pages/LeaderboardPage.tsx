
import { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';
import { PageTransition } from '../components/shared/Transitions';
import { cn } from '../lib/utils';
import { mockLeaderboardDaily, mockLeaderboardWeekly, mockLeaderboardAllTime } from '../data/mockData';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../components/ui/tabs';

type TimeframeType = 'daily' | 'weekly' | 'allTime';
type LeaderboardType = 'individuals' | 'teams';

// Mock team leaderboard data
const mockTeamLeaderboardDaily = [
  {
    id: 't1',
    name: 'Miami',
    position: 1,
    members: 12,
    points: 4250,
    streak: 5,
    isUserTeam: false
  },
  {
    id: 't2',
    name: 'Dallas',
    position: 2,
    members: 8,
    points: 3980,
    streak: 3,
    isUserTeam: true
  },
  {
    id: 't3',
    name: 'FIG',
    position: 3,
    members: 6,
    points: 3720,
    streak: 4,
    isUserTeam: false
  },
  {
    id: 't4',
    name: 'Austin',
    position: 4,
    members: 10,
    points: 3650,
    streak: 2,
    isUserTeam: false
  },
  {
    id: 't5',
    name: 'Chicago',
    position: 5,
    members: 9,
    points: 3520,
    streak: 1,
    isUserTeam: false
  },
  {
    id: 't6',
    name: 'GIO',
    position: 6,
    members: 7,
    points: 3310,
    streak: 2,
    isUserTeam: false
  }
];

const mockTeamLeaderboardWeekly = [
  {
    id: 't1',
    name: 'Miami',
    position: 1,
    members: 12,
    points: 18250,
    streak: 3,
    isUserTeam: false
  },
  {
    id: 't3',
    name: 'FIG',
    position: 2,
    members: 6,
    points: 17950,
    streak: 2,
    isUserTeam: false
  },
  {
    id: 't2',
    name: 'Dallas',
    position: 3,
    members: 8,
    points: 16780,
    streak: 1,
    isUserTeam: true
  }
];

const mockTeamLeaderboardAllTime = [
  {
    id: 't3',
    name: 'FIG',
    position: 1,
    members: 6,
    points: 143720,
    streak: 0,
    isUserTeam: false
  },
  {
    id: 't1',
    name: 'Miami',
    position: 2,
    members: 12,
    points: 139500,
    streak: 0,
    isUserTeam: false
  },
  {
    id: 't2',
    name: 'Dallas',
    position: 3,
    members: 8,
    points: 127800,
    streak: 0,
    isUserTeam: true
  }
];

const LeaderboardPage = () => {
  const [timeframe, setTimeframe] = useState<TimeframeType>('daily');
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>('individuals');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const getIndividualData = () => {
    switch (timeframe) {
      case 'daily': return mockLeaderboardDaily;
      case 'weekly': return mockLeaderboardWeekly;
      case 'allTime': return mockLeaderboardAllTime;
    }
  };

  const getTeamData = () => {
    switch (timeframe) {
      case 'daily': return mockTeamLeaderboardDaily;
      case 'weekly': return mockTeamLeaderboardWeekly;
      case 'allTime': return mockTeamLeaderboardAllTime;
    }
  };
  
  return (
    <MainLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">See how you and your team rank among others</p>
        </div>
        
        <Tabs value={leaderboardType} onValueChange={(value) => setLeaderboardType(value as LeaderboardType)} className="mb-6">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="individuals" className="flex-1">Individuals</TabsTrigger>
            <TabsTrigger value="teams" className="flex-1">Markets & Teams</TabsTrigger>
          </TabsList>
        </Tabs>
        
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
        
        {leaderboardType === 'individuals' ? (
          <LeaderboardTable 
            data={getIndividualData()}
            timeframe={timeframe}
            type="individuals"
          />
        ) : (
          <LeaderboardTable 
            data={getTeamData()}
            timeframe={timeframe}
            type="teams"
          />
        )}
      </PageTransition>
    </MainLayout>
  );
};

export default LeaderboardPage;
