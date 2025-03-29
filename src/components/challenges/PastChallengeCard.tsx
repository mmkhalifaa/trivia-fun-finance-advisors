
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

  const handleQuestionSelect = (index: number) => {
    setSelectedQuestionIndex(selectedQuestionIndex === index ? null : index);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300",
      expanded ? "shadow-md" : "hover:shadow-sm"
    )}>
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
                  <p className="text-xs text-muted-foreground">earned</p>
                </div>
              </div>
            </div>
            
            {/* Right: Questions and Answers */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-semibold text-sm mb-4">Questions & Answers</h4>
              
              <div className="max-h-96 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {challenge.questions.map((q, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "border rounded-lg overflow-hidden transition-all",
                        q.isCorrect ? "border-green-200" : "border-red-200",
                        selectedQuestionIndex === i ? "shadow-sm" : ""
                      )}
                    >
                      <div 
                        className={cn(
                          "p-4 flex justify-between items-center cursor-pointer",
                          q.isCorrect ? "bg-green-50" : "bg-red-50"
                        )}
                        onClick={() => handleQuestionSelect(i)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                            q.isCorrect ? "bg-green-100" : "bg-red-100"
                          )}>
                            <span className="font-semibold text-sm">{i + 1}</span>
                          </div>
                          <div className="flex-1 mr-4">
                            <p className="font-medium text-sm line-clamp-2">{q.question}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "p-1.5 rounded-full",
                            q.isCorrect ? "bg-green-100" : "bg-red-100"
                          )}>
                            {q.isCorrect ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <X className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          {selectedQuestionIndex === i ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      
                      {selectedQuestionIndex === i && (
                        <div className="p-4 bg-background border-t border-gray-100">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="p-1 rounded-full bg-green-100">
                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                  </div>
                                  <span className="text-xs font-semibold text-green-700">Correct Answer</span>
                                </div>
                                <div className="ml-7 p-3 bg-green-50 rounded-md text-sm">
                                  {q.correctAnswer}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className={cn(
                                    "p-1 rounded-full",
                                    q.isCorrect ? "bg-green-100" : "bg-red-100"
                                  )}>
                                    {q.isCorrect ? (
                                      <Check className="w-3.5 h-3.5 text-green-600" />
                                    ) : (
                                      <X className="w-3.5 h-3.5 text-red-600" />
                                    )}
                                  </div>
                                  <span className={cn(
                                    "text-xs font-semibold",
                                    q.isCorrect ? "text-green-700" : "text-red-700"
                                  )}>
                                    Your Answer
                                  </span>
                                </div>
                                <div className={cn(
                                  "ml-7 p-3 rounded-md text-sm",
                                  q.isCorrect ? "bg-green-50" : "bg-red-50"
                                )}>
                                  {q.userAnswer}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
