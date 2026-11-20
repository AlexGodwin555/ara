import { WHATSAPP_CONCIERGE_NUMBER } from '../utils/currency';
import type { CategoryFilter } from '../types/catalog';

interface FooterProps {
  onSelectCategory: (category: CategoryFilter) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
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
