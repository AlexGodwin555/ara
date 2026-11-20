import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { CategoryFilter, Product, SortOption } from '../types/catalog';
import { formatNaira } from '../utils/currency';
import { ResilientImage } from './ResilientImage';

interface ProductCatalogProps {
  products: Product[];
  allProductsCount: number;
  categoryCounts: Record<CategoryFilter, number>;
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenQuickView: (product: Product) => void;
}

const CATEGORIES: CategoryFilter[] = ['All', 'Trad-Modern', 'Streetwear', 'Accessories'];

export function ProductCatalog({
  products,
  allProductsCount,
  categoryCounts,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onOpenQuickView,
}: ProductCatalogProps) {
  const hasActiveFilters = activeCategory !== 'All' || searchQuery.trim().length > 0;

  return (
    <section id="catalog" className="py-14 sm:py-18 lg:py-20 border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E2DC]">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#7D5422]">
              Seasonal Release · {allProductsCount} Pieces
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#111110]">
              The Contemporary Catalog
            </h2>
          </div>

          <p className="text-sm text-[#4A4843] max-w-sm">
            Select any garment or object to inspect fabric provenance, choose sizes and colourways,
            and add to your bag.
          </p>
        </div>

        {/* Filter & Sort Toolbar */}
        <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Segmented Category Buttons */}
          <div
            role="tablist"
            aria-label="Filter catalog by category"
            className="flex items-center gap-1.5 p-1 bg-[#EFECE6] rounded-sm overflow-x-auto"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectCategory(category)}
                  className={`px-4 py-2 min-h-[40px] text-xs font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422] ${
                    isActive
                      ? 'bg-[#111110] text-[#F9F8F6]'
                      : 'text-[#4A4843] hover:text-[#111110] hover:bg-[#E5E2DC]/60'
                  }`}
                >
                  {category}{' '}
                  <span className={`tabular-nums ${isActive ? 'text-[#D6CFC2]' : 'text-[#6E6B64]'}`}>
                    ({categoryCounts[category]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-[#6E6B64] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search pieces or textiles..."
                aria-label="Search pieces or textiles"
                className="w-full min-h-[42px] pl-9 pr-8 py-2 bg-[#F9F8F6] border border-[#D8D3C9] rounded-sm text-sm text-[#111110] placeholder:text-[#6E6B64] focus:outline-none focus:border-[#111110]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#6E6B64] hover:text-[#111110] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="relative flex items-center">
              <SlidersHorizontal
                className="w-3.5 h-3.5 text-[#6E6B64] absolute left-3 pointer-events-none"
                aria-hidden="true"
              />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                aria-label="Sort products"
                className="w-full sm:w-auto min-h-[42px] pl-8 pr-8 py-2 bg-[#F9F8F6] border border-[#D8D3C9] rounded-sm text-xs font-medium text-[#111110] focus:outline-none focus:border-[#111110] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-16 px-6 bg-[#F2F0EC] border border-[#E5E2DC] rounded-sm text-center space-y-4">
            <p className="font-display text-2xl text-[#111110]">
              No pieces match your current filter.
            </p>
            <p className="text-sm text-[#4A4843]">
              Try clearing your search term or viewing all categories in the collection.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  onSearchChange('');
                }}
                className="inline-flex items-center px-5 py-2.5 min-h-[44px] bg-[#111110] text-[#F9F8F6] text-xs font-medium tracking-wide rounded-sm hover:bg-[#2A2927] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pt-2">
            {products.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  {/* 3:4 Neutral Studio Image Surface */}
                  <div className="relative aspect-[3/4] w-full bg-[#EFECE6] border border-[#E5E2DC] rounded-sm overflow-hidden">
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
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
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

                {/* Price + Swatches + Quick-View Action Row */}
                <div className="pt-3 mt-3 border-t border-[#E5E2DC] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold text-[#111110] tabular-nums">
                      {formatNaira(product.priceNaira)}
                    </span>

                    <div
                      className="flex items-center gap-1"
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

                  <button
                    type="button"
                    onClick={() => onOpenQuickView(product)}
                    className="px-3 py-1.5 min-h-[36px] text-xs font-medium text-[#111110] border border-[#D8D3C9] rounded-sm hover:border-[#111110] hover:bg-[#EFECE6] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
                  >
                    Quick View
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
