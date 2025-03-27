
import { useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { ProfileStats } from '../components/profile/ProfileStats';
import { BadgeShowcase } from '../components/profile/BadgeShowcase';
import { PageTransition } from '../components/shared/Transitions';
import { mockUserData } from '../data/mockData';

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <MainLayout>
      <PageTransition>
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src={mockUserData.avatar}
              alt={mockUserData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold">{mockUserData.name}</h1>
          <p className="text-muted-foreground">Financial Advisor</p>
        </div>
        
        <ProfileStats stats={mockUserData.stats} />
        <BadgeShowcase />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="dashboard-card p-6">
            <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Market Insights</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Fixed Income</span>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Alternatives</span>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Economics</span>
                  <span className="text-sm text-muted-foreground">90%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card p-6">
            <h2 className="text-xl font-semibold mb-4">Activity History</h2>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={i < 4 ? "pb-4 border-b border-border" : ""}>
                  <h3 className="font-medium">
                    {[
                      "Completed today's quiz",
                      "Earned 'Market Sage' badge progress",
                      "Moved up to 3rd on weekly leaderboard",
                      "Completed yesterday's quiz",
                      "Earned 'Speed Demon' badge"
                    ][i]}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {["Just now", "2 hours ago", "Yesterday", "Yesterday", "2 days ago"][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default ProfilePage;
