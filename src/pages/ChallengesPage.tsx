
import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { PageTransition } from '../components/shared/Transitions';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../components/ui/tabs';
import { Search, Filter } from 'lucide-react';

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

const ChallengesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
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

  return (
    <MainLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Knowledge Challenges</h1>
          <p className="text-muted-foreground">Expand your expertise with specialized quizzes on various topics</p>
        </div>
        
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
      </PageTransition>
    </MainLayout>
  );
};

export default ChallengesPage;
