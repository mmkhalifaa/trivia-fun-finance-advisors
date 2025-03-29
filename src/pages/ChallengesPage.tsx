
import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { PageTransition } from '../components/shared/Transitions';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { PastChallengeCard } from '../components/challenges/PastChallengeCard';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../components/ui/tabs';
import { Search, Filter, History } from 'lucide-react';

// Mock data for challenges
const mockChallenges = [
  {
    id: 'current-affairs-1',
    title: 'Market Trends 2023',
    description: 'Test your knowledge of recent market developments and economic indicators',
    category: 'current-affairs',
    difficulty: 'Medium',
    estimatedTime: '5 min',
    pointsReward: 75,
    questionCount: 5,
    icon: '📰'
  },
  {
    id: 'current-affairs-2',
    title: 'Global Economic Summit',
    description: 'Questions about the recent G20 economic summit decisions',
    category: 'current-affairs',
    difficulty: 'Hard',
    estimatedTime: '8 min',
    pointsReward: 100,
    questionCount: 8,
    icon: '🌐'
  },
  {
    id: 'finance-1',
    title: 'Private Equity Fundamentals',
    description: 'Understand the basics of private equity investments and strategies',
    category: 'finance',
    difficulty: 'Medium',
    estimatedTime: '7 min',
    pointsReward: 85,
    questionCount: 6,
    icon: '💼'
  },
  {
    id: 'finance-2',
    title: 'Structured Products Deep Dive',
    description: 'Advanced concepts in structured financial products',
    category: 'finance',
    difficulty: 'Hard',
    estimatedTime: '10 min',
    pointsReward: 120,
    questionCount: 8,
    icon: '📊'
  },
  {
    id: 'planning-1',
    title: 'Retirement Planning Essentials',
    description: 'Key strategies for effective retirement planning',
    category: 'planning',
    difficulty: 'Easy',
    estimatedTime: '6 min',
    pointsReward: 70,
    questionCount: 5,
    icon: '🏖️'
  },
  {
    id: 'planning-2',
    title: 'Estate Planning Strategies',
    description: 'Complex scenarios in estate planning and wealth transfer',
    category: 'planning',
    difficulty: 'Hard',
    estimatedTime: '12 min',
    pointsReward: 110,
    questionCount: 10,
    icon: '📝'
  },
  {
    id: 'general-1',
    title: 'Financial History',
    description: 'Test your knowledge of major financial events throughout history',
    category: 'general',
    difficulty: 'Medium',
    estimatedTime: '8 min',
    pointsReward: 80,
    questionCount: 7,
    icon: '🏛️'
  },
  {
    id: 'general-2',
    title: 'Economic Theory',
    description: 'Principles and concepts of macroeconomic and microeconomic theory',
    category: 'general',
    difficulty: 'Hard',
    estimatedTime: '9 min',
    pointsReward: 95,
    questionCount: 8,
    icon: '📚'
  }
];

// Mock data for completed challenges
const mockCompletedChallenges = [
  {
    id: 'completed-finance-1',
    title: 'Market Analysis Basics',
    description: 'Understanding fundamental market analysis concepts',
    category: 'finance',
    difficulty: 'Easy',
    completedOn: '2023-06-12',
    score: 4,
    totalQuestions: 5,
    pointsEarned: 65,
    icon: '📈',
    questions: [
      {
        question: 'What is the primary purpose of fundamental analysis?',
        correctAnswer: 'To determine the intrinsic value of a security',
        userAnswer: 'To determine the intrinsic value of a security',
        isCorrect: true
      },
      {
        question: 'Which of the following is not typically used in technical analysis?',
        correctAnswer: 'Company revenue projections',
        userAnswer: 'Company revenue projections',
        isCorrect: true
      },
      {
        question: 'What does P/E ratio stand for?',
        correctAnswer: 'Price to Earnings ratio',
        userAnswer: 'Price to Earnings ratio',
        isCorrect: true
      },
      {
        question: 'Which market indicator measures volatility?',
        correctAnswer: 'VIX',
        userAnswer: 'VIX',
        isCorrect: true
      },
      {
        question: 'What does a decreasing MACD histogram typically indicate?',
        correctAnswer: 'Slowing momentum',
        userAnswer: 'Increasing momentum',
        isCorrect: false
      }
    ]
  },
  {
    id: 'completed-planning-1',
    title: 'Tax Planning Strategies',
    description: 'Essential tax planning strategies for wealth management',
    category: 'planning',
    difficulty: 'Medium',
    completedOn: '2023-05-28',
    score: 3,
    totalQuestions: 5,
    pointsEarned: 45,
    icon: '💰',
    questions: [
      {
        question: 'Which retirement account offers tax-free withdrawals in retirement?',
        correctAnswer: 'Roth IRA',
        userAnswer: 'Roth IRA',
        isCorrect: true
      },
      {
        question: 'What is tax-loss harvesting?',
        correctAnswer: 'Selling investments at a loss to offset capital gains',
        userAnswer: 'Selling investments at a loss to offset capital gains',
        isCorrect: true
      },
      {
        question: 'Which of these is not a tax-advantaged account?',
        correctAnswer: 'Standard brokerage account',
        userAnswer: 'Standard brokerage account',
        isCorrect: true
      },
      {
        question: 'What is the annual gift tax exclusion amount for 2023?',
        correctAnswer: '$17,000',
        userAnswer: '$15,000',
        isCorrect: false
      },
      {
        question: 'Which strategy involves transferring assets to younger generations while minimizing gift and estate taxes?',
        correctAnswer: 'Dynasty trust',
        userAnswer: 'Family limited partnership',
        isCorrect: false
      }
    ]
  },
  {
    id: 'completed-current-affairs-1',
    title: 'Recent Financial Regulations',
    description: 'Updates on recent financial regulatory changes',
    category: 'current-affairs',
    difficulty: 'Hard',
    completedOn: '2023-07-03',
    score: 7,
    totalQuestions: 8,
    pointsEarned: 90,
    icon: '⚖️',
    questions: [
      {
        question: 'Which recent regulation focuses on environmental disclosure requirements?',
        correctAnswer: 'SEC Climate Disclosure Rule',
        userAnswer: 'SEC Climate Disclosure Rule',
        isCorrect: true
      },
      {
        question: 'What does SFDR stand for in EU regulations?',
        correctAnswer: 'Sustainable Finance Disclosure Regulation',
        userAnswer: 'Sustainable Finance Disclosure Regulation',
        isCorrect: true
      },
      {
        question: 'Which organization released the Basel IV framework?',
        correctAnswer: 'Basel Committee on Banking Supervision',
        userAnswer: 'Basel Committee on Banking Supervision',
        isCorrect: true
      }
      // Additional questions omitted for brevity
    ]
  }
];

const ChallengesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'upcoming' | 'past'>('upcoming');
  
  const filteredChallenges = mockChallenges.filter(challenge => {
    // Filter by category
    if (activeCategory !== 'all' && challenge.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !challenge.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const filteredCompletedChallenges = mockCompletedChallenges.filter(challenge => {
    // Filter by category
    if (activeCategory !== 'all' && challenge.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !challenge.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <MainLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Knowledge Challenges</h1>
          <p className="text-muted-foreground">Expand your expertise with specialized quizzes on various topics</p>
        </div>
        
        <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as 'upcoming' | 'past')} className="mb-8">
          <TabsList className="bg-muted h-9 inline-flex">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <span>Upcoming Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>Past Challenges</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search challenges..."
              className="pl-9 pr-4 py-2 w-full rounded-full border bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Filter className="h-4 w-4" />
            <span>Filter:</span>
          </div>
          
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex-grow">
            <TabsList className="bg-muted h-9 overflow-x-auto flex-wrap justify-start">
              <TabsTrigger value="all" className="text-xs">All Topics</TabsTrigger>
              <TabsTrigger value="current-affairs" className="text-xs">Current Affairs</TabsTrigger>
              <TabsTrigger value="finance" className="text-xs">Financial Expertise</TabsTrigger>
              <TabsTrigger value="planning" className="text-xs">Planning</TabsTrigger>
              <TabsTrigger value="general" className="text-xs">General Knowledge</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {viewMode === 'upcoming' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {filteredChallenges.length > 0 ? (
              filteredChallenges.map(challenge => (
                <ChallengeCard 
                  key={challenge.id}
                  challenge={challenge}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 mb-8">
            {filteredCompletedChallenges.length > 0 ? (
              filteredCompletedChallenges.map(challenge => (
                <PastChallengeCard 
                  key={challenge.id}
                  challenge={challenge}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="text-4xl mb-4">📜</div>
                <h3 className="text-xl font-semibold mb-2">No completed challenges</h3>
                <p className="text-muted-foreground">You haven't completed any challenges yet</p>
              </div>
            )}
          </div>
        )}
      </PageTransition>
    </MainLayout>
  );
};

export default ChallengesPage;
