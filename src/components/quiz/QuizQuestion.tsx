
import { useState, useEffect } from 'react';
import { Check, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ProgressBar } from '../shared/ProgressBar';
import { FadeIn, ScaleIn } from '../shared/Transitions';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: QuizOption[];
  explanation: string;
  category: string;
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string, timeRemaining: number) => void;
  timeLimit?: number;
}

export const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  timeLimit = 15,
}: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [showExplanation, setShowExplanation] = useState(false);
  const [status, setStatus] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  
  // Timer countdown
  useEffect(() => {
    if (status !== 'unanswered' || !timeLimit) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-select first option if time runs out
          handleOptionSelect(question.options[0].id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [status, timeLimit, question.options]);
  
  const handleOptionSelect = (optionId: string) => {
    if (status !== 'unanswered') return;
    
    setSelectedOption(optionId);
    
    const selected = question.options.find(opt => opt.id === optionId);
    if (selected) {
      setStatus(selected.isCorrect ? 'correct' : 'incorrect');
      
      // Show explanation after a small delay
      setTimeout(() => {
        setShowExplanation(true);
      }, 1000);
      
      // Call parent callback with result
      onAnswer(optionId, timeRemaining);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Question {questionNumber} of {totalQuestions}</span>
            <span className="text-sm text-muted-foreground">• {question.category}</span>
          </div>
          
          {timeLimit > 0 && status === 'unanswered' && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className={cn(
                "text-sm font-medium transition-colors",
                timeRemaining < 5 ? "text-destructive" : "text-muted-foreground"
              )}>
                {timeRemaining}s
              </span>
            </div>
          )}
        </div>
        
        <ProgressBar 
          progress={(questionNumber / totalQuestions) * 100} 
          className="h-1"
        />
      </div>
      
      {/* Question */}
      <FadeIn>
        <h2 className="text-2xl font-bold mb-8">{question.text}</h2>
      </FadeIn>
      
      {/* Options */}
      <div className="space-y-4 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const showCorrect = status !== 'unanswered' && option.isCorrect;
          const showIncorrect = status !== 'unanswered' && isSelected && !option.isCorrect;
          
          return (
            <ScaleIn key={option.id} delay={0.1 * index}>
              <button
                onClick={() => handleOptionSelect(option.id)}
                disabled={status !== 'unanswered'}
                className={cn(
                  "quiz-option w-full button-effect",
                  isSelected && status === 'unanswered' ? "selected" : "",
                  showCorrect ? "correct" : "",
                  showIncorrect ? "incorrect" : "",
                )}
              >
                <div className="quiz-option-text">
                  <div className="quiz-option-marker">
                    {['A', 'B', 'C', 'D'][index]}
                  </div>
                  <span>{option.text}</span>
                </div>
                
                <AnimatePresence>
                  {showCorrect && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-success flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                  
                  {showIncorrect && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </ScaleIn>
          );
        })}
      </div>
      
      {/* Explanation (shown after answering) */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "p-4 rounded-xl border",
              status === 'correct' ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "flex-shrink-0 w-6 h-6 mt-0.5 rounded-full flex items-center justify-center",
                status === 'correct' ? "bg-success" : "bg-destructive"
              )}>
                {status === 'correct' ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <X className="w-4 h-4 text-white" />
                )}
              </div>
              
              <div>
                <h3 className={cn(
                  "font-medium",
                  status === 'correct' ? "text-success" : "text-destructive"
                )}>
                  {status === 'correct' ? "Correct!" : "Incorrect"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{question.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
