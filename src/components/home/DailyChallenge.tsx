
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { FadeIn, ScaleIn } from '../shared/Transitions';
import { Badge } from '../shared/Badge';
import { ProgressBar } from '../shared/ProgressBar';

export const DailyChallenge = () => {
  const [isQuizAvailable, setIsQuizAvailable] = useState(true);
  const [isMorningMeetingCompleted, setIsMorningMeetingCompleted] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [mmCardHovered, setMmCardHovered] = useState(false);
  const [streak, setStreak] = useState(5);
  
  // Simulating API call to check quiz availability
  useEffect(() => {
    const checkQuizAvailability = () => {
      // Simulate quiz availability check
      setIsQuizAvailable(true);
    };
    
    checkQuizAvailability();
  }, []);
  
  return (
    <ScaleIn delay={0.1}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Daily Challenges</h2>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Refreshes in 14:30:45</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Main Daily Quiz */}
          {isQuizAvailable ? (
            <Link 
              to="/quiz" 
              className="block"
              onMouseEnter={() => setCardHovered(true)}
              onMouseLeave={() => setCardHovered(false)}
            >
              <div className={cn(
                "dashboard-card group overflow-hidden relative p-6 transition-all duration-300",
                "hover:border-primary/50",
                cardHovered ? "shadow-elevation-3" : ""
              )}>
                {/* Background decoration */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full" />
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10 gap-4">
                  <div className="space-y-2">
                    <Badge label="Today's Quiz" />
                    <h3 className="text-2xl font-bold">5 New Questions</h3>
                    <p className="text-muted-foreground">Keep your streak going and climb the leaderboard!</p>
                    
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{streak}-day streak</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                      <span className="text-sm text-muted-foreground">~2 min to complete</span>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "button-effect rounded-full px-6 py-3.5 bg-primary text-white font-medium",
                    "flex items-center justify-center min-w-[140px]",
                    "shadow-sm transition-all duration-300",
                    "group-hover:shadow-primary/20 group-hover:shadow-lg"
                  )}>
                    Play Now
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="dashboard-card p-6 border-success/20 bg-success/5">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Today's Quiz Completed</h3>
                  <p className="text-muted-foreground">You scored 4/5 and earned 75 points</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge label="4 correct" variant="primary" />
                    <Badge label="+75 points" variant="secondary" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Morning Meeting Challenge */}
          {!isMorningMeetingCompleted && (
            <Link 
              to="/quiz?type=morning-meeting" 
              className="block"
              onMouseEnter={() => setMmCardHovered(true)}
              onMouseLeave={() => setMmCardHovered(false)}
            >
              <div className={cn(
                "dashboard-card group overflow-hidden relative p-6 transition-all duration-300",
                "hover:border-primary/50",
                mmCardHovered ? "shadow-elevation-3" : ""
              )}>
                {/* Background decoration */}
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-500/5 rounded-full" />
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge label="Morning Meeting" variant="outline" className="border-amber-200 bg-amber-50 text-amber-700" />
                      <Badge label="Bonus" variant="outline" className="border-amber-200 bg-amber-50 text-amber-700" />
                    </div>
                    <h3 className="text-2xl font-bold">Dave Frame's Tax Strategies</h3>
                    <p className="text-muted-foreground">Test your knowledge from today's morning meeting</p>
                    
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium">Today's meeting</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                      <span className="text-sm text-muted-foreground">2 bonus questions</span>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "button-effect rounded-full px-6 py-3.5 bg-amber-500 text-white font-medium",
                    "flex items-center justify-center min-w-[140px]",
                    "shadow-sm transition-all duration-300",
                    "group-hover:shadow-amber-500/20 group-hover:shadow-lg"
                  )}>
                    Take Challenge
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </ScaleIn>
  );
};
