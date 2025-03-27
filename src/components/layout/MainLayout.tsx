
import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      <main className="flex-1 flex flex-col">
        <div className="flex-1 container max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12 overflow-y-auto">
          {children}
        </div>
      </main>
      <Navigation />
    </div>
  );
};
