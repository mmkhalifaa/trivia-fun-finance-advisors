
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  barClassName?: string;
}

export const ProgressBar = ({ 
  progress, 
  className,
  barClassName
}: ProgressBarProps) => {
  return (
    <div 
      className={cn(
        "w-full h-1.5 bg-secondary rounded-full overflow-hidden", 
        className
      )}
    >
      <div 
        className={cn(
          "h-full bg-primary transition-all duration-300 ease-out", 
          barClassName
        )}
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
};
