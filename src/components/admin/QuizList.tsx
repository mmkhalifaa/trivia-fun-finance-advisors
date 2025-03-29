
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Copy, 
  FileEdit, 
  Filter, 
  Info, 
  Plus, 
  Search, 
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const QuizList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
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
    },
    { 
      id: '5', 
      title: 'Private Equity Fundamentals', 
      status: 'draft',
      questions: 15
    },
    { 
      id: '6', 
      title: 'Retirement Planning Essentials', 
      status: 'scheduled',
      date: '2023-08-25T14:00:00Z',
      questions: 10
    }
  ];
  
  // Filter quizzes based on search and status filter
  const filteredQuizzes = quizzes
    .filter(quiz => 
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || quiz.status === statusFilter)
    );
  
  // Status indicators with appropriate colors and icons
  const statusConfig = {
    draft: { color: 'bg-muted', textColor: 'text-muted-foreground', icon: FileEdit },
    scheduled: { color: 'bg-amber-100', textColor: 'text-amber-700', icon: Calendar },
    live: { color: 'bg-green-100', textColor: 'text-green-700', icon: Clock },
    completed: { color: 'bg-blue-100', textColor: 'text-blue-700', icon: CheckCircle },
  };
  
  const handleDuplicateQuiz = (quizId: string) => {
    // Logic to duplicate quiz would go here
    console.log(`Duplicating quiz ${quizId}`);
  };
  
  const handleDeleteQuiz = (quizId: string) => {
    // Logic to delete quiz would go here
    console.log(`Deleting quiz ${quizId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quiz Manager</h1>
          <p className="text-muted-foreground">Create, edit and manage quizzes</p>
        </div>
        <Link to="/admin/quizzes/create">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-1" />
            Create New Quiz
          </Button>
        </Link>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full sm:max-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search quizzes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Quiz list */}
      <div className="rounded-md border">
        <div className="grid grid-cols-12 bg-muted p-4 text-sm font-medium">
          <div className="col-span-5">Quiz Title</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-center">Questions</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => {
            const StatusIcon = statusConfig[quiz.status as keyof typeof statusConfig].icon;
            
            return (
              <div 
                key={quiz.id} 
                className="grid grid-cols-12 items-center p-4 border-t text-sm"
              >
                <div className="col-span-5 font-medium">
                  <Link
                    to={`/admin/quizzes/${quiz.id}`}
                    className="hover:underline"
                  >
                    {quiz.title}
                  </Link>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2 w-2 rounded-full ${statusConfig[quiz.status as keyof typeof statusConfig].color}`} />
                    <span className="capitalize">{quiz.status}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  {quiz.date ? new Date(quiz.date).toLocaleDateString() : '—'}
                </div>
                <div className="col-span-1 text-center">
                  {quiz.questions}
                </div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                  {/* Edit button */}
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/admin/quizzes/${quiz.id}`}>
                      <FileEdit className="h-4 w-4" />
                    </Link>
                  </Button>
                  
                  {/* Duplicate button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDuplicateQuiz(quiz.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  
                  {/* Reports button (only for completed quizzes) */}
                  {quiz.status === 'completed' && (
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/reports/${quiz.id}`}>
                        <BarChart className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  
                  {/* Delete button */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{quiz.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => handleDeleteQuiz(quiz.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first quiz!'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
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
    </div>
  );
};
