import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { CategoryFilter, Product, ProductColor, SortOption } from '../types/catalog';
import { ProductCard } from './ProductCard';

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
  onQuickAddToBag: (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number
  ) => void;
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
  onQuickAddToBag,
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pt-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuickView={onOpenQuickView}
                onQuickAdd={onQuickAddToBag}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
