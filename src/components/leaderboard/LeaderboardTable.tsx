
import { useMemo, useState } from 'react';
import { Medal, Search, Trophy, Users } from 'lucide-react';
import { cn } from '../../lib/utils';
import { UserProfileDialog } from './UserProfileDialog';
import { TeamProfileDialog } from './TeamProfileDialog';

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
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamLeaderboardEntry | null>(null);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [teamProfileOpen, setTeamProfileOpen] = useState(false);
  
  const { topEntries, currentUserEntry } = useMemo(() => {
    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      if (type === 'individuals') {
        const individualData = data as LeaderboardUser[];
        const filteredData = individualData.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { topEntries: filteredData, currentUserEntry: null };
      } else {
        const teamData = data as TeamLeaderboardEntry[];
        const filteredData = teamData.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { topEntries: filteredData, currentUserEntry: null };
      }
    }
    
    // Find the current user/team entry
    let userEntry: LeaderboardUser | TeamLeaderboardEntry | undefined;
    
    if (type === 'individuals') {
      const individualData = data as LeaderboardUser[];
      userEntry = individualData.find(item => item.isCurrentUser);
    } else {
      const teamData = data as TeamLeaderboardEntry[];
      userEntry = teamData.find(item => item.isUserTeam);
    }
    
    // Get top 20 entries
    const top20 = data.slice(0, 20);
    
    // Check if user is in top 20
    const userInTop20 = userEntry && userEntry.position <= 20;
    
    return {
      topEntries: top20,
      currentUserEntry: userInTop20 ? null : userEntry
    };
  }, [data, searchQuery, type]);
  
  const getTimeframeLabel = () => {
    switch (timeframe) {
      case 'daily': return "Today's";
      case 'weekly': return "This Week's";
      case 'allTime': return "All-Time";
    }
  };

  const handleRowClick = (item: LeaderboardUser | TeamLeaderboardEntry) => {
    if (type === 'individuals') {
      setSelectedUser(item as LeaderboardUser);
      setUserProfileOpen(true);
    } else {
      setSelectedTeam(item as TeamLeaderboardEntry);
      setTeamProfileOpen(true);
    }
  };

  const renderTableRow = (item: LeaderboardUser | TeamLeaderboardEntry, isCurrentUserRow = false) => {
    const isUser = type === 'individuals' 
      ? (item as LeaderboardUser).isCurrentUser 
      : (item as TeamLeaderboardEntry).isUserTeam;
      
    return (
      <tr 
        key={`${item.id}-${isCurrentUserRow ? 'user' : 'regular'}`}
        className={cn(
          "transition-all duration-200 cursor-pointer hover:bg-muted/50",
          isUser ? "bg-primary/5 rounded-lg" : ""
        )}
        onClick={() => handleRowClick(item)}
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
            {topEntries.length > 0 ? (
              <>
                {/* Top entries */}
                {topEntries.map(item => renderTableRow(item))}
                
                {/* Current user entry if not in top 20 */}
                {currentUserEntry && (
                  <>
                    <tr>
                      <td colSpan={4} className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
                          <span className="text-xs text-muted-foreground px-2">Your Position</span>
                          <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
                        </div>
                      </td>
                    </tr>
                    {renderTableRow(currentUserEntry, true)}
                  </>
                )}
              </>
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? `No results found for "${searchQuery}"` : 'No leaderboard data available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* User Profile Dialog */}
      <UserProfileDialog 
        open={userProfileOpen} 
        onOpenChange={setUserProfileOpen} 
        user={selectedUser} 
      />
      
      {/* Team Profile Dialog */}
      <TeamProfileDialog 
        open={teamProfileOpen} 
        onOpenChange={setTeamProfileOpen} 
        team={selectedTeam} 
      />
    </div>
  );
};
