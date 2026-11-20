import { useEffect, useRef, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import type { CategoryFilter } from '../types/catalog';

const TICKLE_QUIPS = ['Hehe, stop!', 'Hey, watch the threads!'];

interface HeaderProps {
  bagCount: number;
  bagPulseId: number;
  lastAddedQty: number;
  onOpenBag: () => void;
  onNavigateCategory: (category: CategoryFilter) => void;
}

export function Header({
  bagCount,
  bagPulseId,
  lastAddedQty,
  onOpenBag,
  onNavigateCategory,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ticklish logo state
  const [tickleCount, setTickleCount] = useState(0);
  const [isTickled, setIsTickled] = useState(false);
  const [showTickleBubble, setShowTickleBubble] = useState(false);
  const [tickleQuip, setTickleQuip] = useState(TICKLE_QUIPS[0]);
  const tickleHideTimerRef = useRef<number | null>(null);
  const tickleShakeTimerRef = useRef<number | null>(null);

  // Playful cart badge reaction state
  const [bagAnimating, setBagAnimating] = useState(false);
  const [showTreatPill, setShowTreatPill] = useState(false);
  const bagJumpTimerRef = useRef<number | null>(null);
  const treatPillTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (tickleHideTimerRef.current !== null) window.clearTimeout(tickleHideTimerRef.current);
      if (tickleShakeTimerRef.current !== null) window.clearTimeout(tickleShakeTimerRef.current);
      if (bagJumpTimerRef.current !== null) window.clearTimeout(bagJumpTimerRef.current);
      if (treatPillTimerRef.current !== null) window.clearTimeout(treatPillTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (bagPulseId === 0) return;

    setBagAnimating(true);
    setShowTreatPill(true);

    if (bagJumpTimerRef.current !== null) window.clearTimeout(bagJumpTimerRef.current);
    if (treatPillTimerRef.current !== null) window.clearTimeout(treatPillTimerRef.current);

    bagJumpTimerRef.current = window.setTimeout(() => {
      setBagAnimating(false);
      bagJumpTimerRef.current = null;
    }, 600);

    treatPillTimerRef.current = window.setTimeout(() => {
      setShowTreatPill(false);
      treatPillTimerRef.current = null;
    }, 1500);
  }, [bagPulseId]);

  const handleLogoMouseEnter = () => {
    setTickleQuip(TICKLE_QUIPS[tickleCount % TICKLE_QUIPS.length]);
    setTickleCount((prev) => prev + 1);
    setIsTickled(true);
    setShowTickleBubble(true);

    if (tickleShakeTimerRef.current !== null) window.clearTimeout(tickleShakeTimerRef.current);
    if (tickleHideTimerRef.current !== null) window.clearTimeout(tickleHideTimerRef.current);

    tickleShakeTimerRef.current = window.setTimeout(() => {
      setIsTickled(false);
      tickleShakeTimerRef.current = null;
    }, 500);

    tickleHideTimerRef.current = window.setTimeout(() => {
      setShowTickleBubble(false);
      tickleHideTimerRef.current = null;
    }, 1500);
  };

  const handleLogoMouseLeave = () => {
    if (tickleShakeTimerRef.current !== null) {
      window.clearTimeout(tickleShakeTimerRef.current);
      tickleShakeTimerRef.current = null;
    }
    setIsTickled(false);
  };

  const handleCategoryClick = (category: CategoryFilter) => {
    setMobileMenuOpen(false);
    onNavigateCategory(category);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAtelierClick = () => {
    setMobileMenuOpen(false);
    const atelierEl = document.getElementById('atelier');
    if (atelierEl) {
      atelierEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-sm border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Ticklish Brand Wordmark */}
        <div className="relative flex items-center shrink-0">
          <a
            href="#top"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            className={`inline-block font-display text-2xl font-semibold tracking-[0.08em] text-[#111110] whitespace-nowrap shrink-0 origin-center transition-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D5422] ${
              isTickled ? 'animate-tickle-shake' : ''
            }`}
          >
            ÀRÀ LAGOS
          </a>

          {showTickleBubble && (
            <span
              key={tickleCount}
              aria-live="polite"
              className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 px-2.5 py-1 bg-[#111110] text-[#F9F8F6] text-[11px] font-medium whitespace-nowrap rounded-sm shadow-md animate-tickle-bubble"
            >
              {tickleQuip}
              <span
                aria-hidden="true"
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#111110] rotate-45"
              />
            </span>
          )}
        </div>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4843]"
        >
          <button
            type="button"
            onClick={() => handleCategoryClick('All')}
            className="hover:text-[#111110] hover:underline underline-offset-4 decoration-[#7D5422] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D5422]"
          >
            Collection
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('Trad-Modern')}
            className="hover:text-[#111110] hover:underline underline-offset-4 decoration-[#7D5422] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D5422]"
          >
            Trad-Modern
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('Streetwear')}
            className="hover:text-[#111110] hover:underline underline-offset-4 decoration-[#7D5422] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D5422]"
          >
            Streetwear
          </button>
          <button
            type="button"
            onClick={handleAtelierClick}
            className="hover:text-[#111110] hover:underline underline-offset-4 decoration-[#7D5422] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D5422]"
          >
            Atelier
          </button>
        </nav>

        {/* Zone 3: Primary Bag Action with Playful Jump & Floating Notification */}
        <div className="relative flex items-center gap-2 shrink-0">
          {showTreatPill && (
            <span
              key={bagPulseId}
              aria-live="polite"
              className="pointer-events-none absolute right-0 top-11 z-50 px-3 py-1 bg-[#7D5422] text-[#F9F8F6] text-[11px] font-semibold tracking-wide whitespace-nowrap rounded-full shadow-md animate-float-up-fade"
            >
              +{lastAddedQty} (Treat Yourself!)
            </span>
          )}

          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open shopping bag with ${bagCount} items`}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] bg-[#111110] text-[#F9F8F6] text-xs font-medium tracking-wide rounded-sm hover:bg-[#2A2927] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
          >
            <ShoppingBag
              key={`icon-${bagPulseId}`}
              className={`w-3.5 h-3.5 ${bagAnimating ? 'animate-bag-jump' : ''}`}
              aria-hidden="true"
            />
            <span>Bag</span>
            <span className="tabular-nums">({bagCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#111110] hover:bg-[#EFECE6] rounded-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#E5E2DC] bg-[#F9F8F6] px-4 py-4 flex flex-col gap-1"
        >
          <button
            type="button"
            onClick={() => handleCategoryClick('All')}
            className="w-full text-left px-3 py-3 text-sm font-medium text-[#111110] hover:bg-[#EFECE6] rounded-sm cursor-pointer"
          >
            Collection
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('Trad-Modern')}
            className="w-full text-left px-3 py-3 text-sm font-medium text-[#111110] hover:bg-[#EFECE6] rounded-sm cursor-pointer"
          >
            Trad-Modern
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('Streetwear')}
            className="w-full text-left px-3 py-3 text-sm font-medium text-[#111110] hover:bg-[#EFECE6] rounded-sm cursor-pointer"
          >
            Streetwear
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('Accessories')}
            className="w-full text-left px-3 py-3 text-sm font-medium text-[#111110] hover:bg-[#EFECE6] rounded-sm cursor-pointer"
          >
            Accessories
          </button>
          <button
            type="button"
            onClick={handleAtelierClick}
            className="w-full text-left px-3 py-3 text-sm font-medium text-[#111110] hover:bg-[#EFECE6] rounded-sm cursor-pointer"
          >
            Atelier
          </button>
        </nav>
      )}
    </header>
  );
}
