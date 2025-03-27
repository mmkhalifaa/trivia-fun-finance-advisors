
import { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { ScaleIn } from '../shared/Transitions';
import { Badge } from '../shared/Badge';
import { BadgeInfo, BadgeCard } from '../badges/BadgeCard';
import { BadgeDetail } from '../badges/BadgeDetail';

export const BadgeShowcase = () => {
  const [recentBadges, setRecentBadges] = useState<BadgeInfo[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo | null>(null);
  
  useEffect(() => {
    // Simulate fetching badges from API
    const fetchBadges = () => {
      const mockBadges: BadgeInfo[] = [
        {
          id: '1',
          name: 'Inflation Expert',
          description: 'Earned by answering 10 inflation questions correctly',
          icon: 'https://img.icons8.com/fluency/48/inflation.png',
          category: 'Subject Mastery',
          unlocked: true,
          unlockedAt: 'May 15, 2023',
        },
        {
          id: '2',
          name: 'Streak Master',
          description: 'Complete quizzes for 7 days in a row',
          icon: 'https://img.icons8.com/fluency/48/fire-element.png',
          category: 'Participation',
          unlocked: true,
          unlockedAt: 'June 2, 2023',
        },
        {
          id: '3',
          name: 'Speed Demon',
          description: 'Answer all questions correctly in under 30 seconds',
          icon: 'https://img.icons8.com/fluency/48/speed.png',
          category: 'Performance',
          unlocked: true,
          unlockedAt: 'June 10, 2023',
        },
      ];
      
      setRecentBadges(mockBadges);
    };
    
    fetchBadges();
  }, []);
  
  return (
    <ScaleIn delay={0.2}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Badges</h2>
          <Badge label={`${recentBadges.length} earned`} variant="outline" />
        </div>
        
        {recentBadges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recentBadges.map(badge => (
              <BadgeCard 
                key={badge.id} 
                badge={badge} 
                onClick={setSelectedBadge}
              />
            ))}
          </div>
        ) : (
          <div className="dashboard-card p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No badges yet</h3>
              <p className="text-sm text-muted-foreground">
                Complete quizzes to earn badges and show them off here!
              </p>
            </div>
          </div>
        )}
        
        <AnimatePresence>
          {selectedBadge && (
            <BadgeDetail 
              badge={selectedBadge} 
              onClose={() => setSelectedBadge(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </ScaleIn>
  );
};
