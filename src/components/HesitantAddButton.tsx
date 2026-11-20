import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const HESITANT_QUIPS = [
  'Wait, are you sure?',
  'My bank account is watching...',
];

interface HesitantAddButtonProps {
  onClick: () => void;
  defaultContent: ReactNode;
  className?: string;
  ariaLabel?: string;
  dodgeDirection?: 'right' | 'left';
}

export function HesitantAddButton({
  onClick,
  defaultContent,
  className = '',
  ariaLabel,
  dodgeDirection = 'right',
}: HesitantAddButtonProps) {
  const [phase, setPhase] = useState<'idle' | 'hesitating' | 'ready'>('idle');
  const [quipIndex, setQuipIndex] = useState(0);
  const snapBackTimerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (snapBackTimerRef.current !== null) {
      window.clearTimeout(snapBackTimerRef.current);
      snapBackTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const handleMouseEnter = () => {
    if (phase !== 'idle') return;

    setQuipIndex((prev) => (prev + 1) % HESITANT_QUIPS.length);
    setPhase('hesitating');

    clearTimer();
    snapBackTimerRef.current = window.setTimeout(() => {
      setPhase('ready');
      snapBackTimerRef.current = null;
    }, 680);
  };

  const handleMouseLeave = () => {
    clearTimer();
    setPhase('idle');
  };

  const handleClick = () => {
    clearTimer();
    setPhase('ready');
    onClick();
  };

  const animationClass =
    phase === 'hesitating'
      ? dodgeDirection === 'left'
        ? 'animate-nervous-left'
        : 'animate-nervous-right'
      : 'translate-x-0';

  return (
    <button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`transition-transform duration-200 will-change-transform ${animationClass} ${className}`}
    >
      {phase === 'hesitating' ? (
        <span className="truncate">{HESITANT_QUIPS[quipIndex]}</span>
      ) : (
        defaultContent
      )}
    </button>
  );
}
