
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizResults } from '../components/quiz/QuizResults';
import { mockQuestions } from '../data/mockData';
import { toast } from 'sonner';

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const [remainingTimes, setRemainingTimes] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<{name: string, description: string} | null>(null);
  
  const totalQuestions = mockQuestions.length;
  
  useEffect(() => {
    // Simulate loading questions from API
    setQuizStarted(true);
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  const handleAnswer = (optionId: string, timeRemaining: number) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);
    
    const newRemainingTimes = [...remainingTimes, timeRemaining];
    setRemainingTimes(newRemainingTimes);
    
    const selectedOption = mockQuestions[currentQuestionIndex].options.find(
      (option) => option.id === optionId
    );
    
    const isCorrect = selectedOption?.isCorrect || false;
    const newCorrectAnswers = [...correctAnswers, isCorrect];
    setCorrectAnswers(newCorrectAnswers);
    
    // If showing explanation or timer, wait before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Check if user earned a badge (simulation)
        const totalCorrect = [...newCorrectAnswers].filter(Boolean).length;
        if (totalCorrect >= 4) {
          setEarnedBadge({
            name: "Quiz Master",
            description: "Score 80% or higher on a daily quiz"
          });
        }
        
        // Calculate points
        const points = calculatePoints(newCorrectAnswers, newRemainingTimes);
        toast.success(`Quiz completed! You earned ${points} points.`);
        
        // Show results screen
        setShowResults(true);
      }
    }, 3000); // Wait for explanation screen
  };
  
  const calculatePoints = (correctAnswers: boolean[], remainingTimes: number[]) => {
    // Base points
    let points = correctAnswers.filter(Boolean).length * 20;
    
    // Speed bonus
    points += remainingTimes.reduce((total, time) => total + time, 0);
    
    // Streak bonus
    if (correctAnswers.filter(Boolean).length === totalQuestions) {
      points += 25; // Perfect score bonus
    }
    
    return points;
  };
  
  if (!quizStarted) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
          <p className="text-muted-foreground">Loading quiz questions...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!showResults ? (
        <div className="flex-1 container max-w-5xl mx-auto px-4 py-8 flex flex-col">
          <button
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground transition-colors self-start mb-8"
          >
            ← Back to Home
          </button>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <QuizQuestion
                question={mockQuestions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
                onAnswer={handleAnswer}
                timeLimit={15}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 container max-w-5xl mx-auto px-4 py-8">
          <QuizResults
            score={correctAnswers.filter(Boolean).length}
            totalQuestions={totalQuestions}
            points={calculatePoints(correctAnswers, remainingTimes)}
            streakDays={5} // This would come from user data in a real app
            badgeEarned={earnedBadge}
          />
        </div>
      )}
    </div>
  );
};

export default QuizPage;
