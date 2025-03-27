
import { useState } from 'react';
import { BarChart2, Calendar, ChevronRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Dialog, DialogContent } from '../ui/dialog';
import { Badge } from '../shared/Badge';

interface MorningMeetingChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  questionCount: number;
}

export const MorningMeetingChallenge = ({
  isOpen,
  onClose,
  onAccept,
  questionCount
}: MorningMeetingChallengeProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 overflow-hidden max-w-md rounded-2xl">
        <div className="relative">
          {/* Header with decorative background */}
          <div className="bg-primary p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-10 -mr-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -mb-10 -ml-10" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <Badge label="Morning Meeting" variant="outline" className="bg-white/20 border-white/10" />
              </div>
              <h2 className="text-2xl font-bold mb-1">Bonus Challenge!</h2>
              <p className="text-white/80">
                Test your knowledge from today's morning meeting
              </p>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Challenge Details:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BarChart2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{questionCount} questions</p>
                    <p className="text-sm text-muted-foreground">Based on today's morning meeting</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Bonus Points</p>
                    <p className="text-sm text-muted-foreground">Earn extra points for today's leaderboard</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-border rounded-xl hover:bg-secondary transition-colors"
              >
                Skip for now
              </button>
              <button 
                onClick={onAccept}
                className={cn(
                  "flex-1 px-4 py-2.5 rounded-xl transition-colors",
                  "bg-primary text-white hover:bg-primary/90",
                  "flex items-center justify-center gap-2"
                )}
              >
                Take Challenge
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
