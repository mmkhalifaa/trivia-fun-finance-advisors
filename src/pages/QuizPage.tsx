import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizResults } from '../components/quiz/QuizResults';
import { MorningMeetingChallenge } from '../components/quiz/MorningMeetingChallenge';
import { SpecializedChallenges } from '../components/quiz/SpecializedChallenges';
import { ChallengeLanding } from '../components/quiz/ChallengeLanding';
import { Timer, Clock } from 'lucide-react';
import { 
  mockQuestions, 
  mockMorningMeetingQuestions, 
  mockStructuredProductsQuestions,
  mockEstatePlanningQuestions,
  mockCurrentAffairsQuestions,
  mockPrivateEquityQuestions,
  mockRetirementPlanningQuestions,
  mockEconomicTheoryQuestions,
  mockFinancialHistoryQuestions
} from '../data/mockData';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

// Global quiz session storage
interface QuizSession {
  startTime: number;
  answers: string[];
  correctAnswers: boolean[];
  remainingTimes: number[];
  currentIndex: number;
  timeLimit: number; // total seconds for the quiz
}

// Store active quiz sessions in localStorage with a prefix for easy identification
const QUIZ_SESSION_PREFIX = 'quiz_session_';
const DEFAULT_QUIZ_TIME_LIMIT = 3 * 60; // 3 minutes in seconds

const QuizPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quizType = searchParams.get('type') || 'daily';
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const [remainingTimes, setRemainingTimes] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [earnedBadge, setEarnedBadge] = useState<{name: string, description: string} | null>(null);
  const [showMorningMeetingPrompt, setShowMorningMeetingPrompt] = useState(false);
  const [showSpecializedChallenges, setShowSpecializedChallenges] = useState(false);
  const [sessionId] = useState(() => `${quizType}-${Date.now()}`);
  
  // Global timer state
  const [quizTimeLimit, setQuizTimeLimit] = useState(DEFAULT_QUIZ_TIME_LIMIT);
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_QUIZ_TIME_LIMIT);
  const [timerActive, setTimerActive] = useState(false);
  
  // Get the appropriate questions based on quiz type
  const getQuestions = () => {
    switch(quizType) {
      case 'morning-meeting':
        return mockMorningMeetingQuestions;
      case 'structured-products':
        return mockStructuredProductsQuestions;
      case 'estate-planning':
        return mockEstatePlanningQuestions;
      case 'current-affairs-1':
      case 'current-affairs-2':
        return mockCurrentAffairsQuestions;
      case 'finance-1':
        return mockPrivateEquityQuestions;
      case 'finance-2':
        return mockStructuredProductsQuestions;
      case 'planning-1':
        return mockRetirementPlanningQuestions;
      case 'planning-2':
        return mockEstatePlanningQuestions;
      case 'general-1':
        return mockFinancialHistoryQuestions;
      case 'general-2':
        return mockEconomicTheoryQuestions;
      default:
        return mockQuestions;
    }
  };
  
  const questions = getQuestions();
  const totalQuestions = questions.length;

  // Format time remaining as MM:SS
  const formatTimeRemaining = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Get or create a quiz session
  const getQuizSession = (): QuizSession | null => {
    const sessionKey = `${QUIZ_SESSION_PREFIX}${quizType}`;
    const savedSession = localStorage.getItem(sessionKey);
    if (savedSession) {
      return JSON.parse(savedSession);
    }
    return null;
  };
  
  // Save current quiz session state
  const saveQuizSession = () => {
    const sessionKey = `${QUIZ_SESSION_PREFIX}${quizType}`;
    const session: QuizSession = {
      startTime: Date.now() - ((quizTimeLimit - timeRemaining) * 1000),
      answers: answers,
      correctAnswers: correctAnswers,
      remainingTimes: remainingTimes,
      currentIndex: currentQuestionIndex,
      timeLimit: quizTimeLimit
    };
    localStorage.setItem(sessionKey, JSON.stringify(session));
  };
  
  // Clear the quiz session
  const clearQuizSession = () => {
    const sessionKey = `${QUIZ_SESSION_PREFIX}${quizType}`;
    localStorage.removeItem(sessionKey);
  };
  
  // Handle quiz completion
  const handleQuizComplete = () => {
    // Clear the quiz session when the quiz is complete
    clearQuizSession();
  };
  
  // Check for existing session on mount
  useEffect(() => {
    const session = getQuizSession();
    
    if (session) {
      // Calculate how much time has elapsed since the quiz started
      const elapsedSeconds = Math.floor((Date.now() - session.startTime) / 1000);
      const remainingTime = Math.max(0, session.timeLimit - elapsedSeconds);
      
      // If there's still time left and quiz was in progress, skip landing and resume
      if (remainingTime > 0) {
        setAnswers(session.answers);
        setCorrectAnswers(session.correctAnswers);
        setRemainingTimes(session.remainingTimes);
        setCurrentQuestionIndex(session.currentIndex);
        setQuizTimeLimit(session.timeLimit);
        setTimeRemaining(remainingTime);
        setTimerActive(true);
        setQuizStarted(true);
        setShowLanding(false);
        toast.info("Quiz resumed. Your timer is still running!");
      } else {
        // If time has expired, auto-submit the quiz
        setAnswers(session.answers);
        setCorrectAnswers(session.correctAnswers);
        setRemainingTimes(session.remainingTimes);
        setTimeRemaining(0);
        setShowLanding(false);
        finishQuiz(session.answers, session.correctAnswers, session.remainingTimes);
        toast.warning("Time's up! Your quiz has been automatically submitted.");
      }
    }
    
    // Cleanup when component unmounts
    return () => {
      // Save the current state when navigating away
      if (timerActive) {
        saveQuizSession();
      }
    };
  }, [quizType]);
  
  // Handle starting the quiz from landing page
  const handleStartQuiz = () => {
    setShowLanding(false);
    setQuizStarted(true);
    setTimerActive(true);
    
    // Reset all states for a fresh start
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCorrectAnswers([]);
    setRemainingTimes([]);
    setTimeRemaining(DEFAULT_QUIZ_TIME_LIMIT);
    
    // Save initial quiz state
    setTimeout(() => {
      saveQuizSession();
    }, 500);
  };
  
  // Global timer effect
  useEffect(() => {
    let timerId: number;
    
    if (timerActive && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            // Time's up, auto-submit the quiz
            clearInterval(timerId);
            finishQuiz(answers, correctAnswers, remainingTimes);
            clearQuizSession();
            return 0;
          }
          
          // Save session every 15 seconds
          if (newTime % 15 === 0) {
            saveQuizSession();
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerActive, answers, correctAnswers, remainingTimes]);
  
  // Function to finish the quiz (whether by time expiration or completion)
  const finishQuiz = (finalAnswers: string[], finalCorrectAnswers: boolean[], finalRemainingTimes: number[]) => {
    setTimerActive(false);
    setShowResults(true);
    
    // If all questions haven't been answered, mark the rest as incorrect
    const missedQuestions = totalQuestions - finalAnswers.length;
    if (missedQuestions > 0) {
      const updatedAnswers = [...finalAnswers];
      const updatedCorrectAnswers = [...finalCorrectAnswers];
      const updatedRemainingTimes = [...finalRemainingTimes];
      
      for (let i = 0; i < missedQuestions; i++) {
        updatedAnswers.push('unanswered');
        updatedCorrectAnswers.push(false);
        updatedRemainingTimes.push(0);
      }
      
      setAnswers(updatedAnswers);
      setCorrectAnswers(updatedCorrectAnswers);
      setRemainingTimes(updatedRemainingTimes);
    }
    
    // Check for badge earned
    const totalCorrect = finalCorrectAnswers.filter(Boolean).length;
    
    if (quizType === 'structured-products' && totalCorrect === totalQuestions) {
      setEarnedBadge({
        name: "Structured Products Pro",
        description: "Score 100% on the Structured Products challenge"
      });
    } else if (quizType === 'estate-planning' && totalCorrect === totalQuestions) {
      setEarnedBadge({
        name: "Estate Planning Expert",
        description: "Answer all Estate Planning questions correctly"
      });
    } else if (quizType === 'daily' && totalCorrect >= Math.floor(totalQuestions * 0.8)) {
      setEarnedBadge({
        name: "Quiz Master",
        description: "Score 80% or higher on a daily quiz"
      });
    }
    
    // Calculate points
    const points = calculatePoints(finalCorrectAnswers, finalRemainingTimes);
    
    // For daily quiz, after completion prompt the morning meeting challenge
    if (quizType === 'daily') {
      toast.success(`Quiz completed! You earned ${points} points.`);
      
      // Show Morning Meeting Challenge prompt after a delay
      if (!showMorningMeetingPrompt) {
        setTimeout(() => {
          setShowMorningMeetingPrompt(true);
        }, 1500);
      }
    } else {
      toast.success(`${getQuizTypeName()} completed! You earned ${points} points.`);
      
      // If completed morning meeting, show specialized challenges after a delay
      if (quizType === 'morning-meeting' && !showSpecializedChallenges) {
        setTimeout(() => {
          setShowSpecializedChallenges(true);
        }, 1500);
      }
    }
  };

  const handleAnswer = (optionId: string, questionTimeRemaining: number) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);
    
    const newRemainingTimes = [...remainingTimes, questionTimeRemaining];
    setRemainingTimes(newRemainingTimes);
    
    const selectedOption = questions[currentQuestionIndex].options.find(
      (option) => option.id === optionId
    );
    
    const isCorrect = selectedOption?.isCorrect || false;
    const newCorrectAnswers = [...correctAnswers, isCorrect];
    setCorrectAnswers(newCorrectAnswers);
    
    // Save the updated session state
    setTimeout(() => {
      saveQuizSession();
    }, 100);
    
    // If showing explanation or timer, wait before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // All questions answered, finish the quiz
        finishQuiz(newAnswers, newCorrectAnswers, newRemainingTimes);
        clearQuizSession();
      }
    }, 3000); // Wait for explanation screen
  };
  
  const getQuizTypeName = () => {
    switch(quizType) {
      case 'morning-meeting':
        return 'Morning Meeting Challenge';
      case 'structured-products':
        return 'Structured Products Challenge';
      case 'estate-planning':
        return 'Estate Planning Challenge';
      case 'current-affairs-1':
        return 'Market Trends 2023';
      case 'current-affairs-2':
        return 'Global Economic Summit';
      case 'finance-1':
        return 'Private Equity Fundamentals';
      case 'finance-2':
        return 'Structured Products Deep Dive';
      case 'planning-1':
        return 'Retirement Planning Essentials';
      case 'planning-2':
        return 'Estate Planning Strategies';
      case 'general-1':
        return 'Financial History';
      case 'general-2':
        return 'Economic Theory';
      default:
        return 'Quiz';
    }
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
    
    // Bonus points for special quizzes
    if (quizType === 'morning-meeting') {
      points += 30; // Morning meeting bonus
    } else if (quizType === 'structured-products' || quizType === 'estate-planning') {
      points += 50; // Specialized quiz bonus
    }
    
    return points;
  };
  
  const handleAcceptMorningMeeting = () => {
    setShowMorningMeetingPrompt(false);
    setShowResults(false);
    
    // Reset all states for a new quiz
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCorrectAnswers([]);
    setRemainingTimes([]);
    setEarnedBadge(null);
    
    // Clear the current quiz session
    clearQuizSession();
    
    // Change the quiz type
    navigate('/quiz?type=morning-meeting');
  };
  
  const handleSelectChallenge = (challengeId: string) => {
    setShowSpecializedChallenges(false);
    setShowResults(false);
    
    // Reset all states for a new quiz
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCorrectAnswers([]);
    setRemainingTimes([]);
    setEarnedBadge(null);
    
    // Clear the current quiz session
    clearQuizSession();
    
    // Change the quiz type based on selected challenge
    navigate(`/quiz?type=${challengeId}`);
  };
  
  // Show landing page first
  if (showLanding) {
    return <ChallengeLanding onStartQuiz={handleStartQuiz} />;
  }
  
  // JSX and rendering
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
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to leave? Your quiz timer will continue to run.")) {
                  navigate('/');
                }
              }}
              className="text-muted-foreground hover:text-foreground transition-colors self-start"
            >
              ← Back to Home
            </button>
            
            {/* Global Timer Display */}
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full",
              timeRemaining <= 60 ? "bg-destructive/10 text-destructive" : 
              timeRemaining <= 180 ? "bg-amber-100 text-amber-700" : 
              "bg-primary/10 text-primary"
            )}>
              <Clock className="w-4 h-4" />
              <span className="font-medium">{formatTimeRemaining(timeRemaining)}</span>
            </div>
          </div>
          
          {quizType !== 'daily' && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{getQuizTypeName()}</h1>
              <p className="text-muted-foreground">
                {quizType === 'morning-meeting' 
                  ? "Test your knowledge from today's morning meeting discussion"
                  : "Demonstrate your specialized knowledge and earn bonus points"}
              </p>
            </div>
          )}
          
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
                question={questions[currentQuestionIndex]}
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
            quizType={quizType}
            sourceURL={window.location.pathname + window.location.search}
            onQuizComplete={handleQuizComplete}
          />
          
          {showSpecializedChallenges && (
            <SpecializedChallenges onSelectChallenge={handleSelectChallenge} />
          )}
        </div>
      )}
      
      {/* Morning Meeting Challenge Modal */}
      <MorningMeetingChallenge 
        isOpen={showMorningMeetingPrompt}
        onClose={() => setShowMorningMeetingPrompt(false)}
        onAccept={handleAcceptMorningMeeting}
        questionCount={mockMorningMeetingQuestions.length}
      />
    </div>
  );
};

export default QuizPage;
