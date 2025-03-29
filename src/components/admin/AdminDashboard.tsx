
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Calendar, CheckCircle, Clock, FileEdit, Info, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const [view, setView] = useState('all');
  
  // Mock quiz data - in a real app this would come from an API or database
  const quizzes = [
    { 
      id: '1', 
      title: 'Monday Morning Quiz', 
      status: 'scheduled',
      date: '2023-08-21T09:00:00Z',
      questions: 10
    },
    { 
      id: '2', 
      title: 'Structured Products Challenge', 
      status: 'live',
      date: '2023-08-15T14:00:00Z',
      questions: 15
    },
    { 
      id: '3', 
      title: 'Estate Planning Quiz', 
      status: 'completed',
      date: '2023-08-10T09:00:00Z',
      questions: 8,
      participants: 47,
      avgScore: 7.2
    },
    { 
      id: '4', 
      title: 'Q3 Market Knowledge', 
      status: 'draft',
      questions: 12
    }
  ];
  
  // Filter quizzes based on current tab
  const filteredQuizzes = view === 'all' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.status === view);
  
  // Get counts for summary cards
  const draftCount = quizzes.filter(q => q.status === 'draft').length;
  const scheduledCount = quizzes.filter(q => q.status === 'scheduled').length;
  const liveCount = quizzes.filter(q => q.status === 'live').length;
  const completedCount = quizzes.filter(q => q.status === 'completed').length;
  
  // Status indicators with appropriate colors and icons
  const statusConfig = {
    draft: { color: 'bg-muted', textColor: 'text-muted-foreground', icon: FileEdit },
    scheduled: { color: 'bg-amber-100', textColor: 'text-amber-700', icon: Calendar },
    live: { color: 'bg-green-100', textColor: 'text-green-700', icon: Clock },
    completed: { color: 'bg-blue-100', textColor: 'text-blue-700', icon: CheckCircle },
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage quizzes and challenges</p>
        </div>
        <Link to="/admin/quizzes/create">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-1" />
            Create New Quiz
          </Button>
        </Link>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Draft Quizzes</p>
                <p className="text-3xl font-bold">{draftCount}</p>
              </div>
              <div className="rounded-full p-2 bg-muted">
                <FileEdit className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Scheduled</p>
                <p className="text-3xl font-bold">{scheduledCount}</p>
              </div>
              <div className="rounded-full p-2 bg-amber-100">
                <Calendar className="h-5 w-5 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Live Quizzes</p>
                <p className="text-3xl font-bold">{liveCount}</p>
              </div>
              <div className="rounded-full p-2 bg-green-100">
                <Clock className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Completed</p>
                <p className="text-3xl font-bold">{completedCount}</p>
              </div>
              <div className="rounded-full p-2 bg-blue-100">
                <BarChart className="h-5 w-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quiz list with tabs for filtering */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Management</CardTitle>
          <CardDescription>Create, edit, and manage all quizzes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={view} onValueChange={setView} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Quizzes</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={view} className="mt-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted p-4 text-sm font-medium">
                  <div className="col-span-5">Quiz Title</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-2">Actions</div>
                </div>
                
                {filteredQuizzes.length > 0 ? (
                  filteredQuizzes.map((quiz) => {
                    const StatusIcon = statusConfig[quiz.status as keyof typeof statusConfig].icon;
                    
                    return (
                      <div 
                        key={quiz.id} 
                        className="grid grid-cols-12 items-center p-4 border-t text-sm"
                      >
                        <div className="col-span-5 font-medium">{quiz.title}</div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-1.5">
                            <div className={`h-2 w-2 rounded-full ${statusConfig[quiz.status as keyof typeof statusConfig].color}`} />
                            <span className="capitalize">{quiz.status}</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          {quiz.date ? new Date(quiz.date).toLocaleDateString() : '—'}
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/admin/quizzes/${quiz.id}`}>Edit</Link>
                          </Button>
                          {quiz.status === 'completed' && (
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/admin/reports/${quiz.id}`}>
                                <BarChart className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-3">
                      <Info className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">No quizzes found</h3>
                    <p className="text-muted-foreground text-sm">
                      {view === 'all' 
                        ? 'Get started by creating your first quiz!'
                        : `No ${view} quizzes available at this time.`}
                    </p>
                    {view === 'all' && (
                      <Button className="mt-4" asChild>
                        <Link to="/admin/quizzes/create">
                          <Plus className="h-4 w-4 mr-1" />
                          Create New Quiz
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
