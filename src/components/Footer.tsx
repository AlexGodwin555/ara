import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { WHATSAPP_CONCIERGE_NUMBER } from '../utils/currency';
import type { CategoryFilter } from '../types/catalog';

interface FooterProps {
  onSelectCategory: (category: CategoryFilter) => void;
}

const DEFAULT_PLACEHOLDER = 'Enter your email for capsule drops';
const FOCUSED_PLACEHOLDER = "Type slow, I'm easily overwhelmed...";

export function Footer({ onSelectCategory }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(
    null
  );
  const shakeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shakeTimerRef.current !== null) {
        window.clearTimeout(shakeTimerRef.current);
      }
    };
  }, []);

  const triggerShake = () => {
    setIsShaking(false);
    if (shakeTimerRef.current !== null) {
      window.clearTimeout(shakeTimerRef.current);
    }
    window.requestAnimationFrame(() => {
      setIsShaking(true);
      shakeTimerRef.current = window.setTimeout(() => {
        setIsShaking(false);
        shakeTimerRef.current = null;
      }, 580);
    });
  };

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      triggerShake();
      setFeedback({
        type: 'error',
        text: 'Ghosting me already? Drop an email first!',
      });
      return;
    }

    if (!trimmed.includes('@') || !trimmed.includes('.')) {
      triggerShake();
      setFeedback({
        type: 'error',
        text: "That doesn't look like a real email — nice try!",
      });
      return;
    }

    setEmail('');
    setFeedback({
      type: 'success',
      text: "You're on the list. Try to act cool when the next drop lands.",
    });
  };

  const handleCategoryLink = (category: CategoryFilter) => {
    onSelectCategory(category);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F2F0EC] py-12 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Moody Atelier Dispatch Newsletter Strip */}
        <div className="pb-10 mb-10 border-b border-[#D8D3C9] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-1.5">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#7D5422]">
              Atelier Dispatch
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#111110]">
              Private previews before Lagos finds out.
            </h3>
          </div>

          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubscribe}
              noValidate
              className={`flex flex-col sm:flex-row gap-3 ${isShaking ? 'animate-head-shake' : ''}`}
            >
              <label htmlFor="atelier-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="atelier-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (feedback) setFeedback(null);
                }}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                placeholder={isEmailFocused ? FOCUSED_PLACEHOLDER : DEFAULT_PLACEHOLDER}
                className="flex-1 min-h-[44px] px-4 py-2.5 bg-[#F9F8F6] border border-[#D8D3C9] rounded-sm text-sm text-[#111110] placeholder:text-[#6E6B64] focus:outline-none focus:border-[#111110] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2.5 min-h-[44px] bg-[#111110] text-[#F9F8F6] text-xs font-medium tracking-wide uppercase rounded-sm hover:bg-[#2A2927] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
              >
                Subscribe
              </button>
            </form>

            {feedback && (
              <p
                role={feedback.type === 'error' ? 'alert' : 'status'}
                className={`mt-2.5 text-xs font-medium ${
                  feedback.type === 'error' ? 'text-[#9A3412]' : 'text-[#4A4843]'
                }`}
              >
                {feedback.text}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#D8D3C9]">
          <div className="space-y-3">
            <span className="font-display text-2xl font-semibold tracking-[0.08em] text-[#111110] block">
              ÀRÀ LAGOS
            </span>
            <p className="text-xs leading-relaxed text-[#4A4843] max-w-xs">
              Contemporary Nigerian fashion house crafting Trad-Modern tailoring, Lagos
              streetwear, and heirloom accessories.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111110]">
              Collections
            </h3>
            <ul className="space-y-2 text-xs text-[#4A4843]">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('Trad-Modern')}
                  className="hover:text-[#111110] hover:underline underline-offset-4 cursor-pointer"
                >
                  Trad-Modern Tailoring
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('Streetwear')}
                  className="hover:text-[#111110] hover:underline underline-offset-4 cursor-pointer"
                >
                  Lagos Streetwear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryLink('Accessories')}
                  className="hover:text-[#111110] hover:underline underline-offset-4 cursor-pointer"
                >
                  Leather & Brass Objects
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111110]">
              Lagos Showroom
            </h3>
            <p className="text-xs leading-relaxed text-[#4A4843]">
              14 Akin Adesola Street
              <br />
              Victoria Island, Lagos
              <br />
              Tuesday – Saturday · 10:00 – 19:00 WAT
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111110]">
              Client Concierge
            </h3>
            <p className="text-xs text-[#4A4843] leading-relaxed">
              Private fittings, bespoke Agbada commissions, and nationwide Nigerian delivery.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_CONCIERGE_NUMBER}?text=${encodeURIComponent(
                'Hello ÀRÀ LAGOS Atelier, I would like to book a fitting or enquire about a piece.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-medium text-[#111110] underline underline-offset-4 decoration-[#7D5422] hover:text-[#7D5422]"
            >
              Message Atelier on WhatsApp
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#6E6B64]">
          <p>© {new Date().getFullYear()} ÀRÀ LAGOS. All rights reserved.</p>
          <p>Prices shown in Nigerian Naira (₦).</p>
        </div>
      </div>
    </footer>
  );
}
