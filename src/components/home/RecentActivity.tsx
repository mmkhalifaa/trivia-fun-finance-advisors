
import { Check, Clock, Trophy, XCircle } from 'lucide-react';
import { ScaleIn } from '../shared/Transitions';
import { cn } from '../../lib/utils';

interface ActivityItem {
  id: string;
  type: 'quiz_completed' | 'badge_earned' | 'streak_milestone';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  iconBgColor: string;
  iconColor: string;
}

export const RecentActivity = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'quiz_completed',
      title: "Yesterday's Quiz Completed",
      description: "Score: 3/5 • 60 points earned",
      timestamp: "Yesterday, 9:30 AM",
      icon: Check,
      iconBgColor: "bg-success/10",
      iconColor: "text-success"
    },
    {
      id: '2',
      type: 'badge_earned',
      title: "New Badge: Inflation Expert",
      description: "Earned by answering 10 inflation questions correctly",
      timestamp: "2 days ago",
      icon: Trophy,
      iconBgColor: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      id: '3',
      type: 'streak_milestone',
      title: "5-Day Streak Achieved",
      description: "You've completed quizzes for 5 days in a row",
      timestamp: "4 days ago",
      icon: Clock,
      iconBgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
  ];
  
  return (
    <ScaleIn delay={0.3}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        
        <div className="dashboard-card">
          <div className="p-4">
            {activities.map((activity, index) => (
              <div 
                key={activity.id}
                className={cn(
                  "flex items-start gap-4 py-4",
                  index < activities.length - 1 ? "border-b border-border" : ""
                )}
              >
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                  activity.iconBgColor
                )}>
                  <activity.icon className={cn("w-5 h-5", activity.iconColor)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScaleIn>
  );
};
