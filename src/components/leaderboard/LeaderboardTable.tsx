
import { useMemo, useState } from 'react';
import { Medal, Search, Trophy } from 'lucide-react';
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

interface LeaderboardTableProps {
  data: LeaderboardUser[];
  timeframe: 'daily' | 'weekly' | 'allTime';
}

export const LeaderboardTable = ({ data, timeframe }: LeaderboardTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    return data.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search advisors..."
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
              <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Advisor</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-muted-foreground">Points</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-muted-foreground hidden md:table-cell">Streak</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(user => (
                <tr 
                  key={user.id}
                  className={cn(
                    "transition-all duration-200",
                    user.isCurrentUser ? "bg-primary/5 rounded-lg" : ""
                  )}
                >
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center">
                      <div className="relative">
                        {user.position === 1 && (
                          <Trophy className="absolute -top-1 -left-1 w-4 h-4 text-amber-500" />
                        )}
                        {user.position === 2 && (
                          <Medal className="absolute -top-1 -left-1 w-4 h-4 text-slate-400" />
                        )}
                        {user.position === 3 && (
                          <Medal className="absolute -top-1 -left-1 w-4 h-4 text-amber-700" />
                        )}
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                          user.position === 1 ? "bg-amber-100 text-amber-800" :
                          user.position === 2 ? "bg-slate-100 text-slate-800" :
                          user.position === 3 ? "bg-amber-900/20 text-amber-800" :
                          "bg-secondary text-foreground"
                        )}>
                          {user.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className={cn(
                          "font-medium",
                          user.isCurrentUser ? "text-primary" : ""
                        )}>
                          {user.name}
                          {user.isCurrentUser && " (You)"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right align-middle font-medium">{user.points}</td>
                  <td className="px-4 py-3 text-right align-middle hidden md:table-cell">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-xs font-medium">{user.streak} days</span>
                    </div>
                  </td>
                </tr>
              ))
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
