
import { useState } from 'react';
import { ArrowRight, Clock, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ScaleIn } from '../shared/Transitions';
import { Badge } from '../shared/Badge';
import { mockSpecializedChallenges } from '../../data/mockData';
import { Link } from 'react-router-dom';

interface SpecializedChallengeProps {
  onSelectChallenge: (challengeId: string) => void;
}

export const SpecializedChallenges = ({ 
  onSelectChallenge 
}: SpecializedChallengeProps) => {
  return (
    <ScaleIn delay={0.3}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Extra Challenges</h2>
          <Badge label="Bonus points" variant="primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockSpecializedChallenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => onSelectChallenge(challenge.id)}
              className={cn(
                "dashboard-card p-6 text-left group hover:border-primary/50",
                "transition-all duration-300 button-effect"
              )}
            >
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <img src={challenge.icon} alt={challenge.title} className="w-7 h-7" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <div className="flex items-center gap-1.5">
                      <Badge label={challenge.difficulty} variant="outline" className="bg-transparent" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs text-muted-foreground">+{challenge.pointsReward} pts</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{challenge.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="self-center">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ScaleIn>
  );
};
