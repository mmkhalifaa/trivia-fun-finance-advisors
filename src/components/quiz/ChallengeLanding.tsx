
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Trophy, Zap, ArrowRight, ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../shared/Badge';
import { ScaleIn, FadeIn } from '../shared/Transitions';

interface ChallengeLandingProps {
  onStartQuiz: () => void;
}

export const ChallengeLanding = ({ onStartQuiz }: ChallengeLandingProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quizType = searchParams.get('type') || 'daily';
  
  const getChallengeInfo = () => {
    switch(quizType) {
      case 'morning-meeting':
        return {
          title: 'Morning Meeting Challenge',
          description: 'Test your knowledge from today\'s morning meeting discussion',
          difficulty: 'Medium',
          questionCount: 5,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 105,
          icon: '☕',
          category: 'Team Knowledge'
        };
      case 'structured-products':
        return {
          title: 'Structured Products Challenge',
          description: 'Advanced concepts in structured financial products',
          difficulty: 'Hard',
          questionCount: 8,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 170,
          icon: '📊',
          category: 'Financial Expertise'
        };
      case 'estate-planning':
        return {
          title: 'Estate Planning Challenge',
          description: 'Complex scenarios in estate planning and wealth transfer',
          difficulty: 'Hard',
          questionCount: 10,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 160,
          icon: '📝',
          category: 'Planning'
        };
      case 'current-affairs-1':
        return {
          title: 'Market Trends 2023',
          description: 'Test your knowledge of recent market developments and economic indicators',
          difficulty: 'Medium',
          questionCount: 5,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 125,
          icon: '📰',
          category: 'Current Affairs'
        };
      case 'current-affairs-2':
        return {
          title: 'Global Economic Summit',
          description: 'Questions about the recent G20 economic summit decisions',
          difficulty: 'Hard',
          questionCount: 8,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 150,
          icon: '🌐',
          category: 'Current Affairs'
        };
      case 'finance-1':
        return {
          title: 'Private Equity Fundamentals',
          description: 'Understand the basics of private equity investments and strategies',
          difficulty: 'Medium',
          questionCount: 6,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 135,
          icon: '💼',
          category: 'Financial Expertise'
        };
      case 'finance-2':
        return {
          title: 'Structured Products Deep Dive',
          description: 'Advanced concepts in structured financial products',
          difficulty: 'Hard',
          questionCount: 8,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 170,
          icon: '📊',
          category: 'Financial Expertise'
        };
      case 'planning-1':
        return {
          title: 'Retirement Planning Essentials',
          description: 'Key strategies for effective retirement planning',
          difficulty: 'Easy',
          questionCount: 5,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 120,
          icon: '🏖️',
          category: 'Planning'
        };
      case 'planning-2':
        return {
          title: 'Estate Planning Strategies',
          description: 'Complex scenarios in estate planning and wealth transfer',
          difficulty: 'Hard',
          questionCount: 10,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 160,
          icon: '📝',
          category: 'Planning'
        };
      case 'general-1':
        return {
          title: 'Financial History',
          description: 'Test your knowledge of major financial events throughout history',
          difficulty: 'Medium',
          questionCount: 7,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 130,
          icon: '🏛️',
          category: 'General Knowledge'
        };
      case 'general-2':
        return {
          title: 'Economic Theory',
          description: 'Principles and concepts of macroeconomic and microeconomic theory',
          difficulty: 'Hard',
          questionCount: 8,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 145,
          icon: '📚',
          category: 'General Knowledge'
        };
      default:
        return {
          title: 'Daily Quiz',
          description: 'Test your financial knowledge with today\'s quiz',
          difficulty: 'Mixed',
          questionCount: 5,
          timePerQuestion: 15,
          totalTime: '3 minutes',
          pointsReward: 100,
          icon: '🎯',
          category: 'Daily Challenge'
        };
    }
  };

  const challengeInfo = getChallengeInfo();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'border-green-200 bg-green-50 text-green-700';
      case 'medium':
      case 'mixed':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'hard':
        return 'border-red-200 bg-red-50 text-red-700';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 container max-w-3xl mx-auto px-4 py-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Button>
        </div>

        {/* Challenge Info Card */}
        <FadeIn>
          <div className="dashboard-card p-8 mb-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl">
                {challengeInfo.icon}
              </div>
              <h1 className="text-3xl font-bold mb-2">{challengeInfo.title}</h1>
              <p className="text-muted-foreground text-lg">{challengeInfo.description}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge 
                label={challengeInfo.difficulty} 
                variant="outline" 
                className={getDifficultyColor(challengeInfo.difficulty)}
              />
              <Badge label={challengeInfo.category} variant="secondary" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">{challengeInfo.questionCount}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-amber-100">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-2xl font-bold">{challengeInfo.timePerQuestion}s</div>
                <div className="text-sm text-muted-foreground">Per Question</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold">{challengeInfo.totalTime}</div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-green-100">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold">{challengeInfo.pointsReward}</div>
                <div className="text-sm text-muted-foreground">Max Points</div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-3">How it works:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  You have {challengeInfo.timePerQuestion} seconds to answer each question
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Points are awarded for correct answers plus speed bonus
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Perfect score earns additional bonus points
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Your quiz will auto-save and can be resumed if interrupted
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Start Button */}
        <ScaleIn delay={0.2}>
          <div className="text-center">
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="px-8 py-4 text-lg font-semibold button-effect"
            >
              Start Challenge
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Good luck! Remember, you can always come back to this later.
            </p>
          </div>
        </ScaleIn>
      </div>
    </div>
  );
};
