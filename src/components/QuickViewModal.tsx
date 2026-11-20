import { useEffect, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import type { Product, ProductColor } from '../types/catalog';
import { formatNaira } from '../utils/currency';
import { ResilientImage } from './ResilientImage';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number
  ) => void;
}

export function QuickViewModal({ product, onClose, onAddToBag }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product || !selectedColor) return null;

  const handleConfirmAdd = () => {
    onAddToBag(product, selectedColor, selectedSize, quantity);
    setJustAdded(true);
  };

  const totalLinePrice = product.priceNaira * quantity;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111110]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F9F8F6] border border-[#D8D3C9] rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-11 h-11 bg-[#F9F8F6]/90 text-[#111110] border border-[#E5E2DC] rounded-sm hover:bg-[#EFECE6] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Studio Image */}
          <div className="md:col-span-6 bg-[#EFECE6] aspect-[3/4] md:aspect-auto md:min-h-[520px]">
            <ResilientImage
              src={product.image}
              alt={product.imageAlt}
              fallbackTitle={product.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right Contiguous Purchase Details */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              {/* Unboxed Kicker & Title */}
              <div className="space-y-1.5 pr-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#7D5422]">
                  {product.category}
                  <span aria-hidden="true" className="mx-1.5">
                    ·
                  </span>
                  {product.sku}
                </p>
                <h2
                  id="quick-view-title"
                  className="font-display text-2xl sm:text-3xl font-medium text-[#111110] leading-tight"
                >
                  {product.name}
                </h2>
                <p className="text-xl font-semibold text-[#111110] tabular-nums pt-1">
                  {formatNaira(product.priceNaira)}
                </p>
              </div>

              {/* Description & Craft Provenance */}
              <div className="space-y-2 text-sm text-[#4A4843] leading-relaxed">
                <p>{product.description}</p>
                <p className="text-xs text-[#6E6B64]">{product.craftNote}</p>
              </div>

              {/* Color Selector */}
              <div className="space-y-2.5 pt-2 border-t border-[#E5E2DC]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-[0.1em] text-[#111110]">
                    Colour
                  </span>
                  <span className="text-[#4A4843]">{selectedColor.name}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color);
                          setJustAdded(false);
                        }}
                        aria-pressed={isSelected}
                        aria-label={`Select colour ${color.name}`}
                        className={`inline-flex items-center gap-2 px-3 py-2 min-h-[40px] border rounded-sm text-xs font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422] ${
                          isSelected
                            ? 'border-[#111110] bg-[#EFECE6] text-[#111110]'
                            : 'border-[#D8D3C9] bg-[#F9F8F6] text-[#4A4843] hover:border-[#111110]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#111110]/20 shrink-0"
                          style={{ backgroundColor: color.hex }}
                          aria-hidden="true"
                        />
                        <span className="whitespace-nowrap">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-[0.1em] text-[#111110]">
                    Size
                  </span>
                  <span className="text-[#6E6B64]">{product.fitNote}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setJustAdded(false);
                        }}
                        aria-pressed={isSelected}
                        className={`min-w-[48px] px-3.5 py-2 min-h-[44px] text-xs font-semibold border rounded-sm transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422] ${
                          isSelected
                            ? 'bg-[#111110] text-[#F9F8F6] border-[#111110]'
                            : 'bg-[#F9F8F6] text-[#111110] border-[#D8D3C9] hover:border-[#111110]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quantity & Add to Bag Action */}
            <div className="pt-4 border-t border-[#E5E2DC] space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-[#D8D3C9] rounded-sm bg-[#F9F8F6]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-11 h-11 inline-flex items-center justify-center text-[#111110] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span
                    aria-live="polite"
                    className="w-10 text-center text-sm font-medium text-[#111110] tabular-nums"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                    className="w-11 h-11 inline-flex items-center justify-center text-[#111110] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmAdd}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#111110] text-[#F9F8F6] text-sm font-medium tracking-wide rounded-sm hover:bg-[#2A2927] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>
                      Add to Bag · <span className="tabular-nums">{formatNaira(totalLinePrice)}</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
