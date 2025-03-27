
import { cn } from '../../lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const Badge = ({ 
  label, 
  variant = 'primary',
  className 
}: BadgeProps) => {
  return (
    <span 
      className={cn(
        "badge", 
        {
          "badge-primary": variant === 'primary',
          "badge-secondary": variant === 'secondary',
          "badge-outline": variant === 'outline',
        },
        className
      )}
    >
      {label}
    </span>
  );
};
