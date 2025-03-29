
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Trophy, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../shared/Badge';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  pointsReward: number;
  questionCount: number;
  icon: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

export const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'border-green-200 bg-green-50 text-green-700';
      case 'medium':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'hard':
        return 'border-red-200 bg-red-50 text-red-700';
      default:
        return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'current-affairs':
        return 'bg-blue-500';
      case 'finance':
        return 'bg-purple-500';
      case 'planning':
        return 'bg-green-500';
      case 'general':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Link
      to={`/quiz?type=${challenge.id}`}
      className={cn(
        "dashboard-card p-6 text-left group hover:border-primary/50 flex gap-4",
        "transition-all duration-300 button-effect"
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
        getCategoryColor(challenge.category),
        "text-white text-2xl"
      )}>
        {challenge.icon}
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
        
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge 
            label={challenge.difficulty} 
            variant="outline" 
            className={getDifficultyColor(challenge.difficulty)}
          />
          
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
            <div className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs text-muted-foreground">+{challenge.pointsReward} pts</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs text-muted-foreground">{challenge.questionCount} questions</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{challenge.estimatedTime}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="self-center">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
        </div>
      </div>
    </Link>
  );
};
