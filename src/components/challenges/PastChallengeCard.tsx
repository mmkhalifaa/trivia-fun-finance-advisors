import { useState } from 'react';
import { 
  Calendar, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Trophy, 
  X 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../shared/Badge';
import { Card } from '../ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '../ui/chart';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

// Chart imports
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

interface PastChallengeQuestion {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

interface PastChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  completedOn: string;
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  icon: string;
  questions: PastChallengeQuestion[];
}

interface PastChallengeCardProps {
  challenge: PastChallenge;
}

export const PastChallengeCard = ({ challenge }: PastChallengeCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setSelectedQuestionIndex(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'border-green-200 bg-green-50 text-green-700';
      case 'medium':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'hard':
      case 'advanced':
      case 'expert':
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

  const scorePercentage = Math.round((challenge.score / challenge.totalQuestions) * 100);
  
  // Chart data
  const chartData = [
    { name: 'Correct', value: challenge.score },
    { name: 'Incorrect', value: challenge.totalQuestions - challenge.score }
  ];
  
  const chartColors = ['#10b981', '#f43f5e']; // Green for correct, red for incorrect

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300",
      expanded ? "shadow-md" : "hover:shadow-sm"
    )}>
      {/* Card Header - Always visible */}
      <div 
        className="p-6 flex gap-4 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
          getCategoryColor(challenge.category),
          "text-white text-xl"
        )}>
          {challenge.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold">{challenge.title}</h3>
            <div>
              {expanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
          
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
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs text-muted-foreground">{formatDate(challenge.completedOn)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
              <div className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs text-muted-foreground">{scorePercentage}% Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Content */}
      {expanded && (
        <div className="px-6 pb-6">
          <hr className="mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Performance Summary */}
            <div className="col-span-1">
              <h4 className="font-semibold text-sm mb-4">Performance Summary</h4>
              
              <div className="aspect-square max-w-40 mx-auto mb-4">
                <ChartContainer
                  config={{
                    correct: { color: chartColors[0] },
                    incorrect: { color: chartColors[1] }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={chartColors[index % chartColors.length]} 
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-xs font-medium">Correct</span>
                    </div>
                    <span className="text-sm font-bold">{challenge.score}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">questions</p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                      <span className="text-xs font-medium">Incorrect</span>
                    </div>
                    <span className="text-sm font-bold">{challenge.totalQuestions - challenge.score}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">questions</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-xs font-medium">Total</span>
                    </div>
                    <span className="text-sm font-bold">{challenge.totalQuestions}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">questions</p>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="h-2 w-2 bg-amber-500 rounded-full mr-2"></span>
                      <span className="text-xs font-medium">Points</span>
                    </div>
                    <span className="text-sm font-bold">{challenge.pointsEarned}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">questions</p>
                </div>
              </div>
            </div>
            
            {/* Right: Questions and Answers */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-semibold text-sm mb-4">Questions & Answers</h4>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {challenge.questions.map((question, index) => (
                  <Collapsible
                    key={index}
                    className={cn(
                      "rounded-lg overflow-hidden border shadow-sm transition-all",
                      question.isCorrect ? "border-green-200" : "border-red-200"
                    )}
                  >
                    <CollapsibleTrigger className="w-full text-left">
                      <div className={cn(
                        "p-4 flex items-center justify-between",
                        question.isCorrect ? "bg-green-50/50" : "bg-red-50/50"
                      )}>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            question.isCorrect ? "bg-green-100" : "bg-red-100"
                          )}>
                            <span className="font-semibold text-sm">{index + 1}</span>
                          </div>
                          <p className="font-medium text-sm line-clamp-1 flex-1 mr-2">{question.question}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {question.isCorrect ? (
                            <div className="flex items-center gap-1 text-green-600 px-2 py-0.5 bg-green-100 rounded-full">
                              <Check className="h-3.5 w-3.5" />
                              <span className="text-xs font-medium">Correct</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-600 px-2 py-0.5 bg-red-100 rounded-full">
                              <X className="h-3.5 w-3.5" />
                              <span className="text-xs font-medium">Incorrect</span>
                            </div>
                          )}
                          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform ui-expanded:rotate-180" />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="p-4 bg-white border-t border-muted">
                        {question.isCorrect ? (
                          <div className="flex items-start gap-3">
                            <div className="bg-green-100 text-green-700 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                              <Check className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Your answer was correct:</p>
                              <p className="text-sm text-green-800 p-3 bg-green-50 rounded-md border border-green-100">
                                {question.correctAnswer}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {/* Correct Answer */}
                            <div className="flex items-start gap-3">
                              <div className="bg-green-100 text-green-700 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                                <Check className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">Correct answer:</p>
                                <p className="text-sm text-green-800 p-3 bg-green-50 rounded-md border border-green-100">
                                  {question.correctAnswer}
                                </p>
                              </div>
                            </div>
                            
                            {/* User Answer */}
                            <div className="flex items-start gap-3">
                              <div className="bg-red-100 text-red-700 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                                <X className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">Your answer:</p>
                                <p className="text-sm text-red-800 p-3 bg-red-50 rounded-md border border-red-100">
                                  {question.userAnswer}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
