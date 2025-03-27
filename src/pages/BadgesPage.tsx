
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from '../components/layout/MainLayout';
import { BadgeInfo, BadgeCard } from '../components/badges/BadgeCard';
import { BadgeDetail } from '../components/badges/BadgeDetail';
import { PageTransition } from '../components/shared/Transitions';
import { cn } from '../lib/utils';
import { mockBadges } from '../data/mockData';

type BadgeFilter = 'all' | 'unlocked' | 'locked';
type CategoryFilter = 'all' | 'subject' | 'participation' | 'achievement';

const BadgesPage = () => {
  const [badges, setBadges] = useState<BadgeInfo[]>([]);
  const [filteredBadges, setFilteredBadges] = useState<BadgeInfo[]>([]);
  const [badgeFilter, setBadgeFilter] = useState<BadgeFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate fetching badges from API
    setBadges(mockBadges);
  }, []);
  
  useEffect(() => {
    let filtered = [...badges];
    
    // Apply badge filter
    if (badgeFilter === 'unlocked') {
      filtered = filtered.filter(badge => badge.unlocked);
    } else if (badgeFilter === 'locked') {
      filtered = filtered.filter(badge => !badge.unlocked);
    }
    
    // Apply category filter
    if (categoryFilter === 'subject') {
      filtered = filtered.filter(badge => badge.category.includes('Subject'));
    } else if (categoryFilter === 'participation') {
      filtered = filtered.filter(badge => badge.category.includes('Participation'));
    } else if (categoryFilter === 'achievement') {
      filtered = filtered.filter(badge => badge.category.includes('Achievement'));
    }
    
    setFilteredBadges(filtered);
  }, [badges, badgeFilter, categoryFilter]);
  
  const unlockedCount = badges.filter(badge => badge.unlocked).length;
  
  return (
    <MainLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Badges</h1>
          <p className="text-muted-foreground">
            You've unlocked {unlockedCount} out of {badges.length} badges
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => setBadgeFilter('all')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                badgeFilter === 'all'
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              All Badges
            </button>
            <button
              onClick={() => setBadgeFilter('unlocked')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                badgeFilter === 'unlocked'
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              Unlocked
            </button>
            <button
              onClick={() => setBadgeFilter('locked')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                badgeFilter === 'locked'
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              Locked
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                categoryFilter === 'all'
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              All Categories
            </button>
            <button
              onClick={() => setCategoryFilter('subject')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                categoryFilter === 'subject'
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              Subject Mastery
            </button>
            <button
              onClick={() => setCategoryFilter('participation')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                categoryFilter === 'participation'
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              Participation
            </button>
            <button
              onClick={() => setCategoryFilter('achievement')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                categoryFilter === 'achievement'
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              Achievement
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBadges.map(badge => (
            <BadgeCard 
              key={badge.id} 
              badge={badge} 
              onClick={setSelectedBadge}
            />
          ))}
        </div>
        
        <AnimatePresence>
          {selectedBadge && (
            <BadgeDetail 
              badge={selectedBadge} 
              onClose={() => setSelectedBadge(null)} 
            />
          )}
        </AnimatePresence>
      </PageTransition>
    </MainLayout>
  );
};

export default BadgesPage;
