
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
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '../ui/table';

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

  const toggleExpanded = () => {
    setExpanded(!expanded);
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Question & Answer</TableHead>
                      <TableHead className="w-[80px] text-center">Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {challenge.questions.map((q, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{i + 1}</TableCell>
                        <TableCell>
                          <div className="space-y-3">
                            <div>
                              <p className="font-medium mb-1">{q.question}</p>
                              <div className="flex flex-col space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold">Correct:</span>
                                  <span className="text-sm text-green-600">{q.correctAnswer}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold">Your answer:</span>
                                  <span className={cn(
                                    "text-sm",
                                    q.isCorrect ? "text-green-600" : "text-red-600"
                                  )}>
                                    {q.userAnswer}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {q.isCorrect ? (
                            <div className="mx-auto w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="mx-auto w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                              <X className="w-4 h-4 text-red-600" />
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
