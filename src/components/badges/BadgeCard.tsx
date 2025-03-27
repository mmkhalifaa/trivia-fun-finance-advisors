
import { cn } from '../../lib/utils';

export interface BadgeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  progress?: number;
  unlockedAt?: string;
}

interface BadgeCardProps {
  badge: BadgeInfo;
  onClick?: (badge: BadgeInfo) => void;
}

export const BadgeCard = ({ badge, onClick }: BadgeCardProps) => {
  return (
    <button
      onClick={() => onClick && onClick(badge)}
      className={cn(
        "dashboard-card p-6 flex flex-col items-center text-center",
        "transition-all duration-300 button-effect cursor-pointer",
        badge.unlocked 
          ? "hover:border-primary/50" 
          : "opacity-60 grayscale hover:opacity-80 hover:grayscale-[50%]"
      )}
    >
      <div className={cn(
        "w-16 h-16 rounded-full mb-4 flex items-center justify-center",
        badge.unlocked 
          ? "bg-primary/10" 
          : "bg-muted"
      )}>
        <img 
          src={badge.icon} 
          alt={badge.name}
          className="w-8 h-8"
        />
      </div>
      
      <h3 className="font-semibold mb-1">{badge.name}</h3>
      <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
      
      {badge.unlocked ? (
        <span className="text-xs text-muted-foreground">
          Unlocked: {badge.unlockedAt}
        </span>
      ) : badge.progress !== undefined ? (
        <div className="w-full bg-muted rounded-full h-1.5 mb-1">
          <div 
            className="bg-muted-foreground h-1.5 rounded-full" 
            style={{ width: `${badge.progress}%` }}
          />
          <span className="text-xs text-muted-foreground">
            {badge.progress}% complete
          </span>
        </div>
      ) : (
        <span className="text-xs text-muted-foreground">Locked</span>
      )}
    </button>
  );
};
