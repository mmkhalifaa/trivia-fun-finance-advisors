
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Medal, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ScaleIn } from '../shared/Transitions';

interface LeaderboardEntry {
  id: string;
  name: string;
  position: number;
  avatar: string;
  points: number;
  isCurrentUser: boolean;
}

export const LeaderboardPreview = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  
  // Simulate fetching leaderboard data
  useEffect(() => {
    // This would be an API call in a real app
    const fetchLeaderboard = () => {
      const mockLeaders = [
        {
          id: '1',
          name: 'Morgan Warren',
          position: 1,
          avatar: 'https://ui-avatars.com/api/?name=Morgan+Warren&background=3b82f6&color=fff',
          points: 750,
          isCurrentUser: false
        },
        {
          id: '2',
          name: 'Alex Chen',
          position: 2,
          avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=818cf8&color=fff',
          points: 720,
          isCurrentUser: true
        },
        {
          id: '3',
          name: 'Jordan Smith',
          position: 3,
          avatar: 'https://ui-avatars.com/api/?name=Jordan+Smith&background=a78bfa&color=fff',
          points: 695,
          isCurrentUser: false
        }
      ];
      
      setLeaders(mockLeaders);
    };
    
    fetchLeaderboard();
  }, []);
  
  return (
    <ScaleIn delay={0.2}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Leaderboard</h2>
          <Link to="/leaderboard" className="flex items-center gap-1 text-primary text-sm font-medium hover:underline">
            View full leaderboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="dashboard-card overflow-visible">
          <div className="p-5">
            {leaders.map((leader, index) => (
              <div 
                key={leader.id}
                className={cn(
                  "flex items-center justify-between py-3",
                  index < leaders.length - 1 ? "border-b border-border" : "",
                  leader.isCurrentUser ? "bg-primary/5 -mx-5 px-5 rounded-md" : ""
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-9 relative">
                    {leader.position === 1 && (
                      <Trophy className="absolute -top-1 -left-1 w-4 h-4 text-amber-500" />
                    )}
                    {leader.position === 2 && (
                      <Medal className="absolute -top-1 -left-1 w-4 h-4 text-slate-400" />
                    )}
                    {leader.position === 3 && (
                      <Medal className="absolute -top-1 -left-1 w-4 h-4 text-amber-700" />
                    )}
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium",
                      leader.position === 1 ? "bg-amber-100 text-amber-800" :
                      leader.position === 2 ? "bg-slate-100 text-slate-800" :
                      leader.position === 3 ? "bg-amber-900/20 text-amber-800" :
                      "bg-secondary text-foreground"
                    )}>
                      {leader.position}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src={leader.avatar} 
                      alt={leader.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className={cn(
                        "font-medium",
                        leader.isCurrentUser ? "text-primary" : ""
                      )}>
                        {leader.name}
                        {leader.isCurrentUser && " (You)"}
                      </p>
                      <p className="text-sm text-muted-foreground">{leader.points} points</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScaleIn>
  );
};
