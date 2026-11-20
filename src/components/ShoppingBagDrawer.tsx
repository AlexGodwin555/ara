import { useEffect, useState } from 'react';
import { Check, Copy, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import type { CartItem } from '../types/catalog';
import {
  buildWhatsAppCheckoutUrl,
  buildWhatsAppOrderMessage,
  calculateDeliveryFee,
  formatNaira,
  FREE_LAGOS_DELIVERY_THRESHOLD,
} from '../utils/currency';
import { ResilientImage } from './ResilientImage';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (key: string, nextQuantity: number) => void;
  onRemoveItem: (key: string) => void;
  onClearBag: () => void;
}

export function ShoppingBagDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
}: ShoppingBagDrawerProps) {
  const [customerNote, setCustomerNote] = useState('');
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.priceNaira * item.quantity,
    0
  );
  const deliveryFee = calculateDeliveryFee(subtotal);
  const grandTotal = subtotal + deliveryFee;
  const remainingForFreeDelivery = Math.max(0, FREE_LAGOS_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_LAGOS_DELIVERY_THRESHOLD) * 100);

  const whatsappUrl = buildWhatsAppCheckoutUrl(items, subtotal, deliveryFee, customerNote);
  const whatsappMessage = buildWhatsAppOrderMessage(items, subtotal, deliveryFee, customerNote);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopiedMessage(true);
      window.setTimeout(() => setCopiedMessage(false), 2000);
    } catch {
      setShowMessagePreview(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#111110]/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-md h-full bg-[#F9F8F6] border-l border-[#D8D3C9] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E5E2DC] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <h2
              id="bag-drawer-title"
              className="font-display text-2xl font-medium text-[#111110]"
            >
              Shopping Bag
            </h2>
            <span className="text-xs font-medium text-[#6E6B64] tabular-nums">
              ({totalCount} {totalCount === 1 ? 'item' : 'items'})
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="inline-flex items-center justify-center w-11 h-11 text-[#111110] hover:bg-[#EFECE6] rounded-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Complimentary Lagos Dispatch Progress */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-[#F2F0EC] border-b border-[#E5E2DC] space-y-2">
            <p className="text-xs text-[#4A4843]">
              {remainingForFreeDelivery === 0 ? (
                <span className="font-medium text-[#111110]">
                  Complimentary Victoria Island & Lagos courier dispatch unlocked.
                </span>
              ) : (
                <span>
                  Add{' '}
                  <strong className="font-semibold text-[#111110] tabular-nums">
                    {formatNaira(remainingForFreeDelivery)}
                  </strong>{' '}
                  more for complimentary Lagos dispatch.
                </span>
              )}
            </p>
            <div className="w-full h-1 bg-[#DED9CF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7D5422] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-sm bg-[#EFECE6] text-[#6E6B64]">
                <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <p className="font-display text-2xl text-[#111110]">Your bag is empty</p>
                <p className="text-sm text-[#4A4843]">
                  Explore our Trad-Modern, Streetwear, and Accessories collections to begin an
                  order.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 min-h-[44px] bg-[#111110] text-[#F9F8F6] text-xs font-medium tracking-wide rounded-sm hover:bg-[#2A2927] transition-colors cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <ul className="divide-y divide-[#E5E2DC]">
                {items.map((item) => {
                  const lineTotal = item.product.priceNaira * item.quantity;
                  return (
                    <li key={item.key} className="py-4 first:pt-0 flex gap-4">
                      <div className="w-20 h-24 bg-[#EFECE6] border border-[#E5E2DC] rounded-sm overflow-hidden shrink-0">
                        <ResilientImage
                          src={item.product.image}
                          alt={item.product.imageAlt}
                          fallbackTitle={item.product.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-[#111110] leading-snug">
                              {item.product.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.key)}
                              aria-label={`Remove ${item.product.name} from bag`}
                              className="p-1 text-[#6E6B64] hover:text-[#111110] transition-colors shrink-0 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xs text-[#6E6B64] mt-1">
                            {item.selectedSize}
                            <span aria-hidden="true" className="mx-1.5">
                              ·
                            </span>
                            {item.selectedColor.name}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-3">
                          <div className="inline-flex items-center border border-[#D8D3C9] rounded-sm bg-[#F9F8F6]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.product.name}`}
                              className="w-8 h-8 inline-flex items-center justify-center text-[#111110] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-medium text-[#111110] tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.product.name}`}
                              className="w-8 h-8 inline-flex items-center justify-center text-[#111110] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-[#111110] tabular-nums">
                            {formatNaira(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Optional Delivery Note */}
              <div className="pt-4 border-t border-[#E5E2DC] space-y-2">
                <label
                  htmlFor="bag-delivery-note"
                  className="block text-xs font-medium text-[#4A4843]"
                >
                  Client Name or Lagos Delivery Area (optional)
                </label>
                <input
                  id="bag-delivery-note"
                  type="text"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="e.g. Tunde A. — Ikoyi / Lekki Phase 1"
                  className="w-full min-h-[40px] px-3 py-2 bg-[#F9F8F6] border border-[#D8D3C9] rounded-sm text-xs text-[#111110] placeholder:text-[#6E6B64] focus:outline-none focus:border-[#111110]"
                />
              </div>

              {/* Optional Collapsible WhatsApp Message Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowMessagePreview((prev) => !prev)}
                    className="text-xs font-medium text-[#7D5422] underline underline-offset-4 cursor-pointer"
                  >
                    {showMessagePreview ? 'Hide order message' : 'Preview WhatsApp order message'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#4A4843] hover:text-[#111110] cursor-pointer"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#7D5422]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                </div>

                {showMessagePreview && (
                  <pre className="p-3 bg-[#EFECE6] border border-[#D8D3C9] rounded-sm text-[11px] leading-relaxed text-[#2A2927] whitespace-pre-wrap font-mono">
                    {whatsappMessage}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Totals & WhatsApp Checkout */}
        {items.length > 0 && (
          <div className="px-6 py-5 bg-[#F2F0EC] border-t border-[#D8D3C9] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between text-[#4A4843]">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[#4A4843]">
                <span>Lagos Courier Dispatch</span>
                <span className="tabular-nums">
                  {deliveryFee === 0 ? 'Complimentary' : formatNaira(deliveryFee)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#D8D3C9] text-base font-semibold text-[#111110]">
                <span>Total</span>
                <span className="tabular-nums">{formatNaira(grandTotal)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] bg-[#111110] text-[#F9F8F6] text-sm font-medium tracking-wide rounded-sm hover:bg-[#2A2927] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D5422]"
              >
                <MessageCircle className="w-4 h-4 text-[#D9B67D]" aria-hidden="true" />
                <span>Checkout via WhatsApp</span>
              </a>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#6E6B64]">
                  Opens pre-filled concierge chat
                </span>
                <button
                  type="button"
                  onClick={onClearBag}
                  className="text-[11px] font-medium text-[#6E6B64] hover:text-[#111110] underline underline-offset-2 cursor-pointer"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
