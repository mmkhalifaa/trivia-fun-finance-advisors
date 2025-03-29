
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CalendarIcon, Plus, Save, Timer } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const QuizBuilder = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizCategory, setQuizCategory] = useState('');
  const [releaseMode, setReleaseMode] = useState('immediate');
  const [timeLimit, setTimeLimit] = useState('180'); // Default 3 minutes
  
  // Mock questions array
  const [questions, setQuestions] = useState([
    {
      id: '1',
      text: 'What is the primary function of a central bank?',
      options: [
        { id: 'a', text: 'Maximize profits for banks', isCorrect: false },
        { id: 'b', text: 'Implement monetary policy and maintain financial stability', isCorrect: true },
        { id: 'c', text: 'Provide loans to individuals', isCorrect: false },
        { id: 'd', text: 'Regulate the stock market exclusively', isCorrect: false }
      ],
      explanation: 'Central banks are responsible for implementing monetary policy and ensuring financial stability in the economy.'
    }
  ]);
  
  const addNewQuestion = () => {
    const newQuestion = {
      id: `q${questions.length + 1}`,
      text: '',
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false }
      ],
      explanation: ''
    };
    
    setQuestions([...questions, newQuestion]);
  };
  
  const saveQuiz = (status: 'draft' | 'publish') => {
    // Logic to save the quiz would go here
    toast.success(
      status === 'draft' 
        ? 'Quiz saved as draft' 
        : 'Quiz published successfully'
    );
    
    // Navigate back to quiz list
    navigate('/admin/quizzes');
  };
  
  const isFormValid = () => {
    if (!quizTitle) return false;
    if (questions.length === 0) return false;
    
    // Check if all questions have text and at least one correct answer
    return questions.every(q => 
      q.text.trim() !== '' && 
      q.options.some(o => o.isCorrect && o.text.trim() !== '')
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate('/admin/quizzes')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create New Quiz</h1>
            <p className="text-muted-foreground">Add questions and configure your quiz</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => saveQuiz('draft')}
          >
            <Save className="h-4 w-4 mr-1" />
            Save as Draft
          </Button>
          <Button 
            onClick={() => saveQuiz('publish')}
            disabled={!isFormValid()}
          >
            Publish Quiz
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Quiz Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Quiz Details Tab */}
        <TabsContent value="details" className="space-y-4 mt-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input 
                id="quiz-title" 
                placeholder="Enter quiz title..." 
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quiz-description">Description (optional)</Label>
              <Textarea 
                id="quiz-description" 
                placeholder="Enter quiz description..."
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quiz-category">Category (optional)</Label>
              <Select value={quizCategory} onValueChange={setQuizCategory}>
                <SelectTrigger id="quiz-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning-meeting">Morning Meeting</SelectItem>
                  <SelectItem value="structured-products">Structured Products</SelectItem>
                  <SelectItem value="estate-planning">Estate Planning</SelectItem>
                  <SelectItem value="current-affairs">Current Affairs</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4">
              <Button onClick={() => setActiveTab('questions')}>
                Continue to Questions
              </Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Questions Tab */}
        <TabsContent value="questions" className="space-y-4 mt-6">
          <div className="space-y-6">
            {questions.map((question, index) => (
              <Card key={question.id} className="border-primary/20">
                <CardContent className="pt-6 pb-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Question {index + 1}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`q-${question.id}`}>Question Text</Label>
                      <Input 
                        id={`q-${question.id}`} 
                        placeholder="Enter question..." 
                        value={question.text}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Answer Options</Label>
                      {question.options.map((option) => (
                        <div 
                          key={option.id} 
                          className="flex items-center gap-3"
                        >
                          <div>
                            <Input 
                              type="radio"
                              checked={option.isCorrect}
                              className="h-4 w-4 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1">
                            <Input 
                              placeholder={`Option ${option.id.toUpperCase()}...`} 
                              value={option.text}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`explanation-${question.id}`}>Explanation (optional)</Label>
                      <Textarea 
                        id={`explanation-${question.id}`} 
                        placeholder="Explain the correct answer..."
                        value={question.explanation} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={addNewQuestion}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Question
            </Button>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setActiveTab('settings')}>
                Continue to Settings
              </Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Time Limit</Label>
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <Select value={timeLimit} onValueChange={setTimeLimit}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">1 minute</SelectItem>
                        <SelectItem value="120">2 minutes</SelectItem>
                        <SelectItem value="180">3 minutes</SelectItem>
                        <SelectItem value="300">5 minutes</SelectItem>
                        <SelectItem value="600">10 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-muted-foreground text-sm">for the entire quiz</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Quiz Release</Label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="immediate"
                        className="h-4 w-4"
                        checked={releaseMode === 'immediate'}
                        onChange={() => setReleaseMode('immediate')}
                      />
                      <Label htmlFor="immediate" className="cursor-pointer">
                        Publish immediately
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="scheduled"
                        className="h-4 w-4"
                        checked={releaseMode === 'scheduled'}
                        onChange={() => setReleaseMode('scheduled')}
                      />
                      <Label htmlFor="scheduled" className="cursor-pointer">
                        Schedule for later
                      </Label>
                    </div>
                    
                    {releaseMode === 'scheduled' && (
                      <div className="flex items-center gap-2 pl-6">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[240px] pl-3 text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              Select date and time
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            {/* Date picker would go here */}
                            <div className="p-4">
                              <p>Date & Time Picker would go here</p>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setActiveTab('questions')}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => saveQuiz('draft')}
              >
                <Save className="h-4 w-4 mr-1" />
                Save as Draft
              </Button>
              <Button 
                onClick={() => saveQuiz('publish')}
                disabled={!isFormValid()}
              >
                Publish Quiz
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
