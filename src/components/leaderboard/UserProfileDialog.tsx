
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Trophy,
  Medal,
  Calendar,
  Star,
  Flame,
  Award,
  TrendingUp,
  BarChart
} from "lucide-react";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
    avatar: string;
    position: number;
    points: number;
    streak: number;
    subjects?: Array<{ name: string; score: number }>;
    badges?: Array<{ id: string; name: string; icon: string }>;
    recentActivity?: Array<{ id: string; action: string; date: string }>;
  } | null;
}

export const UserProfileDialog = ({ open, onOpenChange, user }: UserProfileDialogProps) => {
  const isMobile = useIsMobile();
  
  if (!user) return null;

  const subjects = user.subjects || [
    { name: "Market Insights", score: 85 },
    { name: "Fixed Income", score: 72 },
    { name: "Alternatives", score: 68 },
    { name: "Economics", score: 90 }
  ];

  const badges = user.badges || [
    { id: "1", name: "Early Bird", icon: "🌅" },
    { id: "2", name: "Streak Master", icon: "🔥" },
    { id: "3", name: "Top Performer", icon: "🏆" }
  ];

  const recentActivity = user.recentActivity || [
    { id: "1", action: "Completed daily quiz", date: "Today" },
    { id: "2", action: "Earned 120 points", date: "Yesterday" },
    { id: "3", action: "Achieved 5-day streak", date: "2 days ago" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'px-3 py-4' : 'sm:max-w-xl'} overflow-hidden`}>
        <DialogHeader className="space-y-1">
          <DialogTitle>Advisor Profile</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh]">
          <div className="px-1">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6 pt-2">
              {/* Avatar and basic info */}
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold mt-3">{user.name}</h2>
                <span className="text-muted-foreground">Financial Advisor</span>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Trophy className="w-4 h-4" />
                      <span className="font-semibold">#{user.position}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Rank</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-4 h-4" />
                      <span className="font-semibold">{user.points}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Points</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-red-500">
                      <Flame className="w-4 h-4" />
                      <span className="font-semibold">{user.streak}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Day Streak</span>
                  </div>
                </div>
              </div>
              
              {/* Subject performance */}
              <div className="flex-1 w-full">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <BarChart className="w-4 h-4" /> Subject Performance
                </h3>
                <div className="space-y-3">
                  {subjects.map((subject, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{subject.name}</span>
                        <span className="text-xs text-muted-foreground">{subject.score}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-500" 
                          style={{ width: `${subject.score}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mt-6">
              {/* Badges */}
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4" /> Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  {badges.map(badge => (
                    <Badge key={badge.id} variant="secondary" className="px-3 py-1 text-sm">
                      <span className="mr-1">{badge.icon}</span> {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="mb-2">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4" /> Recent Activity
                </h3>
                <div className="space-y-2 rounded-md border border-border p-3 bg-muted/30">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex justify-between items-center py-1 border-b last:border-0 border-border">
                      <span className="text-sm">{activity.action}</span>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
