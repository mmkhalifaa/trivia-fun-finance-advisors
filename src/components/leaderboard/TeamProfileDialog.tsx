
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Trophy, 
  Users, 
  Star, 
  Building, 
  TrendingUp,
  Search
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  points: number;
  position?: number;
}

interface TeamProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: {
    id: string;
    name: string;
    position: number;
    members: number;
    points: number;
    streak?: number;
    isUserTeam: boolean;
    membersList?: TeamMember[];
  } | null;
}

export const TeamProfileDialog = ({ open, onOpenChange, team }: TeamProfileDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  if (!team) return null;
  
  // Mock member data if not provided
  const membersList = team.membersList || [
    { id: "1", name: "Paula Dolan", avatar: "https://ui-avatars.com/api/?name=Paula+Dolan&background=3b82f6&color=fff", points: 750 },
    { id: "2", name: "Karen Donnelly", avatar: "https://ui-avatars.com/api/?name=Karen+Donnelly&background=818cf8&color=fff", points: 720 },
    { id: "3", name: "Dave Frame", avatar: "https://ui-avatars.com/api/?name=Dave+Frame&background=a78bfa&color=fff", points: 695 },
    { id: "4", name: "John Smith", avatar: "https://ui-avatars.com/api/?name=John+Smith&background=8b5cf6&color=fff", points: 680 },
    { id: "5", name: "Emily Johnson", avatar: "https://ui-avatars.com/api/?name=Emily+Johnson&background=c084fc&color=fff", points: 655 },
    { id: "6", name: "Michael Brown", avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=d946ef&color=fff", points: 630 },
    { id: "7", name: "Sarah Davis", avatar: "https://ui-avatars.com/api/?name=Sarah+Davis&background=ec4899&color=fff", points: 610 },
    { id: "8", name: "Kevin Wilson", avatar: "https://ui-avatars.com/api/?name=Kevin+Wilson&background=f43f5e&color=fff", points: 590 }
  ].slice(0, team.members);

  const filteredMembers = membersList.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'px-3 py-4' : 'sm:max-w-xl'} overflow-hidden`}>
        <DialogHeader className="space-y-1">
          <DialogTitle>Market/Team Profile</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh]">
          <div className="px-1">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6 pt-2">
              {/* Team icon and basic info */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="w-12 h-12 text-primary" />
                </div>
                
                <h2 className="text-xl font-bold mt-3">{team.name}</h2>
                {team.isUserTeam && (
                  <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1">
                    Your Team
                  </span>
                )}
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Trophy className="w-4 h-4" />
                      <span className="font-semibold">#{team.position}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Rank</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-4 h-4" />
                      <span className="font-semibold">{team.points.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Points</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-indigo-500">
                      <Users className="w-4 h-4" />
                      <span className="font-semibold">{team.members}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Members</span>
                  </div>
                </div>
              </div>
              
              {/* Performance insights */}
              <div className="flex-1 w-full">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4" /> Performance Insights
                </h3>
                <Card className="border border-border">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col items-center bg-muted/50 rounded-lg p-3">
                        <span className="text-sm text-muted-foreground">Avg. Points</span>
                        <span className="text-lg font-medium">
                          {Math.round(team.points / team.members).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-muted/50 rounded-lg p-3">
                        <span className="text-sm text-muted-foreground">Weekly Growth</span>
                        <span className="text-lg font-medium">+{Math.round(Math.random() * 15)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Team Members section */}
            <div className="mt-6 mb-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" /> Team Members
                </h3>
                <span className="text-xs text-muted-foreground">{team.members} members</span>
              </div>
              
              {/* Search input */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              {/* Members list */}
              <Card className="border border-border">
                <CardContent className="p-1">
                  <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member, index) => (
                        <div key={member.id} 
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{member.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {member.points.toLocaleString()} pts
                            </span>
                            {index < 3 && (
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                index === 0 ? "bg-amber-100 text-amber-800" :
                                index === 1 ? "bg-slate-100 text-slate-800" :
                                "bg-amber-900/20 text-amber-800"
                              }`}>
                                #{index + 1}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-sm text-muted-foreground">
                        No members found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
