
import { Award, BookOpen, Calendar, Clock, Rocket, Trophy } from 'lucide-react';
import { ScaleIn } from '../shared/Transitions';
import { cn } from '../../lib/utils';

interface StatItemProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<any>;
  iconColor: string;
  iconBgColor: string;
}

const StatItem = ({ label, value, icon: Icon, iconColor, iconBgColor }: StatItemProps) => (
  <div className="dashboard-card p-4 flex items-center gap-4">
    <div className={cn(
      "w-12 h-12 rounded-full flex items-center justify-center",
      iconBgColor
    )}>
      <Icon className={cn("w-6 h-6", iconColor)} />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

interface ProfileStatsProps {
  stats: {
    totalQuizzes: number;
    totalPoints: number;
    streakDays: number;
    averageScore: string;
    fastestTime: string;
    quizzesThisMonth: number;
  };
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => {
  const statItems: StatItemProps[] = [
    {
      label: "Total Quizzes",
      value: stats.totalQuizzes,
      icon: BookOpen,
      iconColor: "text-primary",
      iconBgColor: "bg-primary/10",
    },
    {
      label: "Total Points",
      value: stats.totalPoints,
      icon: Trophy,
      iconColor: "text-amber-500",
      iconBgColor: "bg-amber-100",
    },
    {
      label: "Current Streak",
      value: `${stats.streakDays} days`,
      icon: Rocket,
      iconColor: "text-cyan-500",
      iconBgColor: "bg-cyan-100",
    },
    {
      label: "Average Score",
      value: stats.averageScore,
      icon: Award,
      iconColor: "text-indigo-500",
      iconBgColor: "bg-indigo-100",
    },
    {
      label: "Fastest Time",
      value: stats.fastestTime,
      icon: Clock,
      iconColor: "text-green-500",
      iconBgColor: "bg-green-100",
    },
    {
      label: "This Month",
      value: stats.quizzesThisMonth,
      icon: Calendar,
      iconColor: "text-purple-500",
      iconBgColor: "bg-purple-100",
    },
  ];
  
  return (
    <ScaleIn delay={0.1}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Statistics</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statItems.map((item, index) => (
            <StatItem key={index} {...item} />
          ))}
        </div>
      </div>
    </ScaleIn>
  );
};
