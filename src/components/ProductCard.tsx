import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Check } from 'lucide-react';
import type { Product, ProductColor } from '../types/catalog';
import { formatNaira } from '../utils/currency';
import { HesitantAddButton } from './HesitantAddButton';
import { ResilientImage } from './ResilientImage';

const WITTY_REMARKS = [
  'Dry clean only... who are we kidding?',
  'Looks better on you than the hanger',
  '100% certified main character energy',
  'Tailored for dramatic gallery entrances',
  'Warning: attracts unsolicited compliments',
  'Your ex will definitely notice this',
  'Too iconic to sit in the closet',
];

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onQuickAdd: (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number
  ) => void;
}

export function ProductCard({
  product,
  onOpenQuickView,
  onQuickAdd,
}: ProductCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [tiltTransform, setTiltTransform] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [remarkIndex, setRemarkIndex] = useState(() =>
    Math.floor(Math.random() * WITTY_REMARKS.length)
  );
  const [justAdded, setJustAdded] = useState(false);
  const addedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimerRef.current !== null) {
        window.clearTimeout(addedTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setRemarkIndex((prev) => {
      let next = Math.floor(Math.random() * WITTY_REMARKS.length);
      if (next === prev) {
        next = (prev + 1) % WITTY_REMARKS.length;
      }
      return next;
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = ((x - 0.5) * 10).toFixed(2);
    const rotateX = ((0.5 - y) * 10).toFixed(2);

    setTiltTransform(
      `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltTransform('');
  };

  const handleDirectAdd = () => {
    onQuickAdd(product, product.colors[0], product.sizes[0], 1);
    setJustAdded(true);
    if (addedTimerRef.current !== null) {
      window.clearTimeout(addedTimerRef.current);
    }
    addedTimerRef.current = window.setTimeout(() => {
      setJustAdded(false);
      addedTimerRef.current = null;
    }, 1200);
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tiltTransform || undefined,
      }}
      className="group relative flex flex-col justify-between transition-transform duration-200 ease-out will-change-transform"
    >
      {/* Witty Floating Speech Bubble on Hover */}
      {isHovered && (
        <div
          role="tooltip"
          className="pointer-events-none absolute -top-11 left-1/2 z-20 w-max max-w-[min(260px,calc(100vw-2rem))] px-3.5 py-1.5 bg-[#111110] text-[#F9F8F6] text-xs font-medium rounded-sm shadow-lg animate-speech-pop"
        >
          <span>{WITTY_REMARKS[remarkIndex]}</span>
          <span
            aria-hidden="true"
            className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-[#111110] rotate-45"
          />
        </div>
      )}

      <div>
        {/* 3:4 Neutral Studio Image Surface */}
        <div className="relative aspect-[3/4] w-full bg-[#EFECE6] border border-[#E5E2DC] rounded-sm overflow-hidden transition-shadow duration-200 group-hover:shadow-xl">
          <button
            type="button"
            onClick={() => onOpenQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="block w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#7D5422]"
          >
            <ResilientImage
              src={product.image}
              alt={product.imageAlt}
              fallbackTitle={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>

          {/* Hover Quick-View Affordance */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            <span className="px-4 py-2 bg-[#111110]/90 text-[#F9F8F6] text-xs font-medium tracking-wide rounded-sm backdrop-blur-xs">
              Quick View · Select Size
            </span>
          </div>
        </div>

        {/* Clean Unboxed Metadata */}
        <div className="pt-4 space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[#6E6B64]">
            <span>
              {product.category}
              <span aria-hidden="true" className="mx-1.5">
                ·
              </span>
              {product.fabricOrigin}
            </span>
          </div>

          <h3 className="text-base font-semibold text-[#111110] leading-snug">
            <button
              type="button"
              onClick={() => onOpenQuickView(product)}
              className="text-left hover:underline underline-offset-4 decoration-[#9A6B32] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
            >
              {product.name}
            </button>
          </h3>
        </div>
      </div>

      {/* Price + Swatches + Quick Actions Row */}
      <div className="pt-3 mt-3 border-t border-[#E5E2DC] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-[15px] font-semibold text-[#111110] tabular-nums whitespace-nowrap">
            {formatNaira(product.priceNaira)}
          </span>

          <div
            className="flex items-center gap-1 shrink-0"
            aria-label={`Available colours: ${product.colors.map((c) => c.name).join(', ')}`}
          >
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="w-3 h-3 rounded-full border border-[#111110]/20"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenQuickView(product)}
            className="px-2.5 py-1.5 min-h-[36px] text-xs font-medium text-[#4A4843] border border-[#D8D3C9] rounded-sm hover:border-[#111110] hover:text-[#111110] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
          >
            Quick View
          </button>

          <HesitantAddButton
            onClick={handleDirectAdd}
            dodgeDirection="left"
            ariaLabel={`Add ${product.name} to bag`}
            defaultContent={
              justAdded ? (
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Added</span>
                </span>
              ) : (
                <span>Add to Bag</span>
              )
            }
            className="px-3 py-1.5 min-h-[36px] max-w-[168px] text-xs font-medium bg-[#111110] text-[#F9F8F6] rounded-sm hover:bg-[#2A2927] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
          />
        </div>
      </div>
    </article>
  );
}
