
import { X } from 'lucide-react';
import { BadgeInfo } from './BadgeCard';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface BadgeDetailProps {
  badge: BadgeInfo;
  onClose: () => void;
}

export const BadgeDetail = ({ badge, onClose }: BadgeDetailProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-card max-w-md w-full rounded-2xl shadow-elevation-3 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 pb-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-24 h-24 rounded-full mb-6 flex items-center justify-center",
              badge.unlocked ? "bg-primary/10" : "bg-muted"
            )}>
              <img 
                src={badge.icon} 
                alt={badge.name}
                className={cn(
                  "w-12 h-12 transition-all duration-500",
                  badge.unlocked ? "" : "grayscale opacity-60"
                )}
              />
            </div>
            
            <h2 className="text-xl font-bold mb-1">{badge.name}</h2>
            <span className="badge badge-secondary mb-4">{badge.category}</span>
            <p className="text-center text-muted-foreground">{badge.description}</p>
          </div>
        </div>
        
        <div className="p-6">
          {badge.unlocked ? (
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <h3 className="font-medium text-success mb-1">Badge Unlocked!</h3>
              <p className="text-sm text-muted-foreground">
                You earned this badge on {badge.unlockedAt}
              </p>
            </div>
          ) : badge.progress !== undefined ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{badge.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Continue completing quizzes to earn this badge.
              </p>
            </div>
          ) : (
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-medium mb-1">How to unlock</h3>
              <p className="text-sm text-muted-foreground">
                Complete related quizzes to unlock this badge.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
