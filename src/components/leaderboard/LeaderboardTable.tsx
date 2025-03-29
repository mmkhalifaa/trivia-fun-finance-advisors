
import { useMemo, useState } from 'react';
import { Medal, Search, Trophy, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  position: number;
  points: number;
  streak: number;
  isCurrentUser: boolean;
}

interface TeamLeaderboardEntry {
  id: string;
  name: string;
  position: number;
  members: number;
  points: number;
  streak?: number;
  isUserTeam: boolean;
}

interface LeaderboardTableProps {
  data: LeaderboardUser[] | TeamLeaderboardEntry[];
  timeframe: 'daily' | 'weekly' | 'allTime';
  type: 'individuals' | 'teams';
}

export const LeaderboardTable = ({ data, timeframe, type }: LeaderboardTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    return data.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);
  
  const getTimeframeLabel = () => {
    switch (timeframe) {
      case 'daily': return "Today's";
      case 'weekly': return "This Week's";
      case 'allTime': return "All-Time";
    }
  };

  return (
    <div className="dashboard-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder={type === 'individuals' ? "Search advisors..." : "Search markets & teams..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="p-4">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Rank</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                {type === 'individuals' ? 'Advisor' : 'Market/Team'}
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-muted-foreground">Points</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-muted-foreground hidden md:table-cell">
                {type === 'individuals' ? 'Streak' : 'Members'}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(item => {
                const isUser = type === 'individuals' 
                  ? (item as LeaderboardUser).isCurrentUser 
                  : (item as TeamLeaderboardEntry).isUserTeam;
                  
                return (
                  <tr 
                    key={item.id}
                    className={cn(
                      "transition-all duration-200",
                      isUser ? "bg-primary/5 rounded-lg" : ""
                    )}
                  >
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center">
                        <div className="relative">
                          {item.position === 1 && (
                            <Trophy className="absolute -top-1 -left-1 w-4 h-4 text-amber-500" />
                          )}
                          {item.position === 2 && (
                            <Medal className="absolute -top-1 -left-1 w-4 h-4 text-slate-400" />
                          )}
                          {item.position === 3 && (
                            <Medal className="absolute -top-1 -left-1 w-4 h-4 text-amber-700" />
                          )}
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                            item.position === 1 ? "bg-amber-100 text-amber-800" :
                            item.position === 2 ? "bg-slate-100 text-slate-800" :
                            item.position === 3 ? "bg-amber-900/20 text-amber-800" :
                            "bg-secondary text-foreground"
                          )}>
                            {item.position}
                          </div>
                        </div>
                      </div>
                    </td>
                    {type === 'individuals' ? (
                      // Individual advisor row
                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center gap-3">
                          <img 
                            src={(item as LeaderboardUser).avatar}
                            alt={item.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className={cn(
                              "font-medium",
                              isUser ? "text-primary" : ""
                            )}>
                              {item.name}
                              {isUser && " (You)"}
                            </p>
                          </div>
                        </div>
                      </td>
                    ) : (
                      // Team row
                      <td className="px-4 py-3 align-middle">
                        <div>
                          <p className={cn(
                            "font-medium",
                            isUser ? "text-primary" : ""
                          )}>
                            {item.name}
                            {isUser && " (Your Team)"}
                          </p>
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-3 text-right align-middle font-medium">
                      {item.points.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right align-middle hidden md:table-cell">
                      {type === 'individuals' ? (
                        // Display streak for individuals
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          <span className="text-xs font-medium">{(item as LeaderboardUser).streak} days</span>
                        </div>
                      ) : (
                        // Display member count for teams
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary">
                          <Users className="w-3 h-3 text-foreground" />
                          <span className="text-xs font-medium">{(item as TeamLeaderboardEntry).members}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-muted-foreground">
                  No results found for "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
