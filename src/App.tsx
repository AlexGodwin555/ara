/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { AtelierSection } from './components/AtelierSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroShowcase } from './components/HeroShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { QuickViewModal } from './components/QuickViewModal';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { PRODUCTS } from './data/products';
import type {
  CartItem,
  CategoryFilter,
  Product,
  ProductColor,
  SortOption,
} from './types/catalog';

const BAG_STORAGE_KEY = 'ara_lagos_bag_v1';

function loadInitialBag(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(BAG_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(loadInitialBag);
  const [bagPulseId, setBagPulseId] = useState(0);
  const [lastAddedQty, setLastAddedQty] = useState(1);

  useEffect(() => {
    try {
      window.localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [cartItems]);

  const categoryCounts = useMemo<Record<CategoryFilter, number>>(() => {
    return {
      All: PRODUCTS.length,
      'Trad-Modern': PRODUCTS.filter((p) => p.category === 'Trad-Modern').length,
      Streetwear: PRODUCTS.filter((p) => p.category === 'Streetwear').length,
      Accessories: PRODUCTS.filter((p) => p.category === 'Accessories').length,
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const matching = PRODUCTS.filter((product) => {
      const categoryMatch =
        activeCategory === 'All' || product.category === activeCategory;
      if (!categoryMatch) return false;
      if (!normalizedQuery) return true;

      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.fabricOrigin.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      );
    });

    if (sortBy === 'price-asc') {
      return [...matching].sort((a, b) => a.priceNaira - b.priceNaira);
    }
    if (sortBy === 'price-desc') {
      return [...matching].sort((a, b) => b.priceNaira - a.priceNaira);
    }
    return matching;
  }, [activeCategory, searchQuery, sortBy]);

  const bagCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleAddToBag = (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number
  ) => {
    const variantKey = `${product.id}__${color.name}__${size}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === variantKey);
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          key: variantKey,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
        },
      ];
    });

    setLastAddedQty(quantity);
    setBagPulseId((prev) => prev + 1);
    setQuickViewProduct(null);
  };

  const handleUpdateQuantity = (key: string, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.key !== key));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearBag = () => {
    setCartItems([]);
  };

  const handleExploreCatalog = (category?: CategoryFilter) => {
    if (category) {
      setActiveCategory(category);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#111110]">
      <Header
        bagCount={bagCount}
        bagPulseId={bagPulseId}
        lastAddedQty={lastAddedQty}
        onOpenBag={() => setBagOpen(true)}
        onNavigateCategory={setActiveCategory}
      />

      <main className="flex-1">
        <HeroShowcase onExploreCatalog={handleExploreCatalog} />

        <ProductCatalog
          products={filteredProducts}
          allProductsCount={PRODUCTS.length}
          categoryCounts={categoryCounts}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenQuickView={setQuickViewProduct}
          onQuickAddToBag={handleAddToBag}
        />

        <AtelierSection />
      </main>

      <Footer onSelectCategory={setActiveCategory} />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToBag={handleAddToBag}
      />

      <ShoppingBagDrawer
        isOpen={bagOpen}
        items={cartItems}
        onClose={() => setBagOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />
    </div>
  );
}
