import type { CartItem } from '../types/catalog';

export const FREE_LAGOS_DELIVERY_THRESHOLD = 250000;
export const LAGOS_DELIVERY_FEE = 7500;
export const WHATSAPP_CONCIERGE_NUMBER = '2348091142800';

export function formatNaira(amount: number): string {
  return `₦${new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export function calculateDeliveryFee(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_LAGOS_DELIVERY_THRESHOLD ? 0 : LAGOS_DELIVERY_FEE;
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  subtotal: number,
  deliveryFee: number,
  customerNote?: string
): string {
  const total = subtotal + deliveryFee;
  const lines: string[] = [
    'Hello ÀRÀ LAGOS Atelier,',
    'I would like to place an order from the online catalog:',
    '',
  ];

  items.forEach((item, index) => {
    const lineTotal = item.product.priceNaira * item.quantity;
    lines.push(
      `${index + 1}. ${item.product.name} (${item.product.sku})`,
      `   • Color: ${item.selectedColor.name}`,
      `   • Size: ${item.selectedSize}`,
      `   • Qty: ${item.quantity} × ${formatNaira(item.product.priceNaira)} = ${formatNaira(lineTotal)}`
    );
  });

  lines.push(
    '',
    `Subtotal: ${formatNaira(subtotal)}`,
    `Lagos Dispatch: ${deliveryFee === 0 ? 'Complimentary' : formatNaira(deliveryFee)}`,
    `Order Total: ${formatNaira(total)}`
  );

  const trimmedNote = customerNote?.trim();
  if (trimmedNote) {
    lines.push('', `Client / Delivery Note: ${trimmedNote}`);
  }

  lines.push('', 'Please confirm availability and payment details. Thank you.');
  return lines.join('\n');
}

export function buildWhatsAppCheckoutUrl(
  items: CartItem[],
  subtotal: number,
  deliveryFee: number,
  customerNote?: string
): string {
  const message = buildWhatsAppOrderMessage(items, subtotal, deliveryFee, customerNote);
  return `https://wa.me/${WHATSAPP_CONCIERGE_NUMBER}?text=${encodeURIComponent(message)}`;
}
