
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ConfettiEffectProps {
  active: boolean;
  duration?: number;
}

export const ConfettiEffect = ({ 
  active, 
  duration = 3000 
}: ConfettiEffectProps) => {
  const [isActive, setIsActive] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (active) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!isActive) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.2}
      colors={['#3B82F6', '#38BDF8', '#60A5FA', '#BAE6FD', '#7DD3FC']}
    />
  );
};
