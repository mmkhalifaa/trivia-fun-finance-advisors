
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { QuizQuestion } from '../components/quiz/QuizQuestion';
import { QuizResults } from '../components/quiz/QuizResults';
import { MorningMeetingChallenge } from '../components/quiz/MorningMeetingChallenge';
import { SpecializedChallenges } from '../components/quiz/SpecializedChallenges';
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

// Store active quiz sessions to track if user has navigated away
const activeQuizSessions = new Map();

const QuizPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const quizType = searchParams.get('type') || 'daily';
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const [remainingTimes, setRemainingTimes] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<{name: string, description: string} | null>(null);
  const [showMorningMeetingPrompt, setShowMorningMeetingPrompt] = useState(false);
  const [showSpecializedChallenges, setShowSpecializedChallenges] = useState(false);
  const [sessionId] = useState(() => `${quizType}-${Date.now()}`); // Generate a unique session ID
  
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
  
  useEffect(() => {
    // When component mounts, check if there was a previous session for this quiz type
    const previousSession = activeQuizSessions.get(quizType);
    
    // If there was a previous session but it's not this one, the user navigated away and came back
    if (previousSession && previousSession !== sessionId) {
      // Reset the quiz to initial state
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setCorrectAnswers([]);
      setRemainingTimes([]);
      setShowResults(false);
      setEarnedBadge(null);
      setShowMorningMeetingPrompt(false);
      setShowSpecializedChallenges(false);
      
      // Show a toast to inform the user
      toast.info("Challenge restarted");
    }
    
    // Register this session as the active one for this quiz type
    activeQuizSessions.set(quizType, sessionId);
    
    // Simulate loading questions from API
    setQuizStarted(true);
    
    // Cleanup when component unmounts
    return () => {
      // Cleanup if needed
    };
  }, [quizType, sessionId]);
  
  // Also reset everything if the quiz type changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCorrectAnswers([]);
    setRemainingTimes([]);
    setShowResults(false);
    setEarnedBadge(null);
    setShowMorningMeetingPrompt(false);
    setShowSpecializedChallenges(false);
  }, [quizType]);
  
  const handleAnswer = (optionId: string, timeRemaining: number) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);
    
    const newRemainingTimes = [...remainingTimes, timeRemaining];
    setRemainingTimes(newRemainingTimes);
    
    const selectedOption = questions[currentQuestionIndex].options.find(
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
        const points = calculatePoints(newCorrectAnswers, newRemainingTimes);
        
        // For daily quiz, after completion prompt the morning meeting challenge
        if (quizType === 'daily') {
          toast.success(`Quiz completed! You earned ${points} points.`);
          setShowResults(true);
          
          // Show Morning Meeting Challenge prompt after a delay
          setTimeout(() => {
            setShowMorningMeetingPrompt(true);
          }, 1500);
        } else {
          toast.success(`${getQuizTypeName()} completed! You earned ${points} points.`);
          setShowResults(true);
          
          // If completed morning meeting, show specialized challenges after a delay
          if (quizType === 'morning-meeting') {
            setTimeout(() => {
              setShowSpecializedChallenges(true);
            }, 1500);
          }
        }
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
    
    // Change the quiz type
    setSearchParams({ type: 'morning-meeting' });
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
    
    // Change the quiz type based on selected challenge
    setSearchParams({ type: challengeId });
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
            onClick={() => {
              navigate('/');
              // Clear this quiz session when navigating away
              activeQuizSessions.delete(quizType);
            }}
            className="text-muted-foreground hover:text-foreground transition-colors self-start mb-8"
          >
            ← Back to Home
          </button>
          
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
