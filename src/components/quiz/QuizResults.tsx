
import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, ChevronRight, Sparkles, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';
import { FadeIn } from '../shared/Transitions';
import { ConfettiEffect } from '../shared/ConfettiEffect';

interface ResultStat {
  label: string;
  value: string | number;
  icon: ReactNode;
}

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  points: number;
  streakDays: number;
  showConfetti?: boolean;
  badgeEarned?: {
    name: string;
    description: string;
  } | null;
  quizType?: string;
  sourceURL?: string;
}

export const QuizResults = ({
  score,
  totalQuestions,
  points,
  streakDays,
  showConfetti = true,
  badgeEarned = null,
  quizType = 'daily',
  sourceURL = '/',
}: QuizResultsProps) => {
  const navigate = useNavigate();
  
  const stats: ResultStat[] = [
    {
      label: "Score",
      value: `${score}/${totalQuestions}`,
      icon: <Trophy className="w-4 h-4 text-amber-500" />,
    },
    {
      label: "Points Earned",
      value: points,
      icon: <Sparkles className="w-4 h-4 text-primary" />,
    },
    {
      label: "Streak Days",
      value: streakDays,
      icon: <Award className="w-4 h-4 text-cyan-500" />,
    },
  ];
  
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getQuizTypeTitle = () => {
    switch(quizType) {
      case 'morning-meeting':
        return "Morning Meeting Challenge";
      case 'structured-products':
        return "Structured Products Challenge";
      case 'estate-planning':
        return "Estate Planning Challenge";
      default:
        return "Daily Quiz";
    }
  };

  // Determine if we're coming from the challenges page
  const isFromChallenge = quizType !== 'daily' || sourceURL.includes('challenges');
  const backLinkText = isFromChallenge ? "Back to Challenges" : "Back to Home";
  const backLinkURL = isFromChallenge ? "/challenges" : "/";
  
  const handleNavigation = (path: string) => {
    // Instead of using Link component directly, we use navigate to ensure 
    // cleanup can happen before navigation
    return (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(path);
    };
  };
  
  return (
    <div className="max-w-md mx-auto text-center">
      <ConfettiEffect active={showConfetti} />
      
      <FadeIn delay={0.3}>
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{percentage}%</span>
                </div>
              </div>
            </div>
            {/* Add decorative elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-3">
            {percentage >= 80 ? "Great job!" : 
             percentage >= 60 ? "Good effort!" : 
             "Keep practicing!"}
          </h1>
          <p className="text-muted-foreground">
            You've completed the {getQuizTypeTitle().toLowerCase()}. 
            {score === totalQuestions ? " Perfect score!" : ""}
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="dashboard-card p-4">
              <div className="flex flex-col items-center">
                <div className="mb-2">{stat.icon}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        {badgeEarned && (
          <div className="dashboard-card p-6 mb-10 border-amber-200 bg-amber-50">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-amber-700">New Badge Earned!</h3>
              <p className="text-sm text-muted-foreground mb-2">{badgeEarned.name}</p>
              <p className="text-xs text-muted-foreground">{badgeEarned.description}</p>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <a 
            href="/leaderboard" 
            onClick={handleNavigation("/leaderboard")}
            className={cn(
              "dashboard-card p-4 flex items-center justify-between w-full",
              "button-effect hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">View Leaderboard</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </a>
          
          <a 
            href={backLinkURL}
            onClick={handleNavigation(backLinkURL)}
            className={cn(
              "dashboard-card p-4 flex items-center justify-between w-full",
              "button-effect hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">{backLinkText}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </a>
        </div>
      </FadeIn>
    </div>
  );
};
