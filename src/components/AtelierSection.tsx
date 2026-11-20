import { BRAND_MEDIA } from '../data/products';
import { ResilientImage } from './ResilientImage';

export function AtelierSection() {
  return (
    <section id="atelier" className="py-16 sm:py-20 border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-6">
            <div className="w-full h-full min-h-[320px] sm:min-h-[400px] bg-[#EFECE6] border border-[#E5E2DC] rounded-sm overflow-hidden">
              <ResilientImage
                src={BRAND_MEDIA.atelierLoom}
                alt="Artisan hands weaving indigo and ecru Aso-Oke textile on a wooden strip loom"
                fallbackTitle="Iseyin & Lagos Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-8 py-2">
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#7D5422]">
                Atelier & Provenance
              </p>

              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#111110] leading-[1.1] text-balance">
                Woven in Iseyin, dyed in Abeokuta, tailored in Victoria Island.
              </h2>

              <p className="text-[15px] leading-relaxed text-[#4A4843]">
                Every ÀRÀ LAGOS release begins with partner weaving guilds in Oyo and Ogun States.
                Narrow-strip Aso-Oke, natural fermented indigo Adire, and vegetable-tanned Kano
                hides are brought to our Victoria Island atelier, where architectural pattern
                cutting meets ceremonial Nigerian drapery.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E5E2DC] grid grid-cols-3 gap-6">
              <div>
                <p className="font-display text-3xl font-medium text-[#111110] tabular-nums">
                  72 hrs
                </p>
                <p className="text-xs text-[#6E6B64] mt-1">Hand-looming per Agbada</p>
              </div>
              <div>
                <p className="font-display text-3xl font-medium text-[#111110] tabular-nums">
                  100%
                </p>
                <p className="text-xs text-[#6E6B64] mt-1">Nigerian artisan textiles</p>
              </div>
              <div>
                <p className="font-display text-3xl font-medium text-[#111110] tabular-nums">
                  48 hr
                </p>
                <p className="text-xs text-[#6E6B64] mt-1">Victoria Island dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
