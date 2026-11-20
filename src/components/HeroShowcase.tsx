import { ArrowRight } from 'lucide-react';
import { BRAND_MEDIA } from '../data/products';
import type { CategoryFilter } from '../types/catalog';
import { ResilientImage } from './ResilientImage';

interface HeroShowcaseProps {
  onExploreCatalog: (category?: CategoryFilter) => void;
}

export function HeroShowcase({ onExploreCatalog }: HeroShowcaseProps) {
  const scrollToCatalog = (category?: CategoryFilter) => {
    onExploreCatalog(category);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#7D5422]">
                Harmattan Capsule · Victoria Island, Lagos
              </p>

              <h1 className="font-display text-[clamp(2.5rem,4.5vw,4.15rem)] leading-[1.03] font-medium tracking-[-0.02em] text-[#111110] text-balance max-w-xl">
                Sculptural Nigerian tailoring for the modern skyline.
              </h1>

              <p className="text-[15px] sm:text-base leading-relaxed text-[#4A4843] max-w-md">
                Hand-loomed Iseyin Aso-Oke, cassava-resist Abeokuta Adire, and heavyweight Nigerian
                cottons cut into sharp ceremonial and everyday silhouettes.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToCatalog('All')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 min-h-[44px] bg-[#111110] text-[#F9F8F6] text-sm font-medium tracking-wide rounded-sm hover:bg-[#2A2927] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToCatalog('Trad-Modern')}
                  className="inline-flex items-center px-3 py-3 min-h-[44px] text-sm font-medium text-[#111110] underline underline-offset-4 decoration-[#9A6B32] hover:text-[#7D5422] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
                >
                  Trad-Modern Edit
                </button>
              </div>
            </div>

            {/* Quiet unboxed provenance pillars */}
            <div className="pt-6 border-t border-[#E5E2DC] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 text-xs text-[#4A4843]">
              <div>
                <p className="font-semibold text-[#111110]">Hand-Loomed Craft</p>
                <p className="mt-0.5">Iseyin Aso-Oke & Abeokuta Adire</p>
              </div>
              <div>
                <p className="font-semibold text-[#111110]">Direct Concierge</p>
                <p className="mt-0.5">Tailored sizing via WhatsApp</p>
              </div>
              <div>
                <p className="font-semibold text-[#111110]">Lagos Dispatch</p>
                <p className="mt-0.5">Complimentary from ₦250,000</p>
              </div>
            </div>
          </div>

          {/* Right Campaign Visual */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[440px] lg:min-h-[540px] bg-[#EFECE6] border border-[#E5E2DC] overflow-hidden rounded-sm">
              <ResilientImage
                src={BRAND_MEDIA.heroEditorial}
                alt="ÀRÀ LAGOS model wearing sculptural obsidian agbada coat in minimalist Lagos gallery"
                className="w-full h-full object-cover object-center"
                fallbackTitle="ÀRÀ LAGOS · Harmattan Edit"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
