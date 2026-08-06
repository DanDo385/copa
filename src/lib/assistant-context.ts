/**
 * Grounding data for Bia, the on-site chat assistant.
 *
 * Everything here reads from the prototype's local data files (products.ts,
 * faqs.ts). When this storefront is wired up to the real Shopify store,
 * swap the bodies of getInventoryContext() and getSupportContext() for
 * live Shopify Admin/Storefront API calls (products, variants, inventory
 * levels, and a real help-center/FAQ source) — the shape returned (a plain
 * text block for the model's system prompt) can stay the same, so nothing
 * else in route.ts needs to change.
 */

import { faqs } from '@/data/faqs';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/catalog';
import { ASSUMED_TIMEZONE, SHOW_TIMES_BY_WEEKDAY } from '@/lib/whatnot-schedule';

// Claim statuses that must never reach a customer, in the UI or via Bia. Kept in sync
// with scripts/content-audit.ts's own "blocked" list.
const BLOCKED_STATUSES = new Set(['DO_NOT_PUBLISH', 'LEGAL_REVIEW_REQUIRED']);

const STOCK_LABEL: Record<string, string> = {
  in_stock: 'in stock',
  limited: 'limited stock',
  sold_out: 'sold out',
  unavailable: 'unavailable',
};

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * TODO(shopify): replace this with a live Shopify Admin/Storefront API read
 * (products + variants + inventory levels) once the store is connected.
 * Keep returning one line per sellable item: name, category, finish, price,
 * real-time stock state, and a real product URL.
 */
export function getInventoryContext(): string {
  return products
    .filter((product) => product.images.length > 0)
    .map((product) => {
      const stock = STOCK_LABEL[product.stockState] ?? product.stockState;
      return `- ${product.title} (${product.category}, ${product.finishes.join('/') || 'standard finish'}) — ${formatPrice(product.priceCents)} — ${stock} — /products/${product.handle}`;
    })
    .join('\n');
}

/**
 * TODO(shopify): once real order data is available (Shopify order/tracking
 * API), extend this with a live order-lookup tool instead of the static
 * "contact support" FAQ answers below.
 */
export function getSupportContext(): string {
  return faqs
    .filter((faq) => !BLOCKED_STATUSES.has(faq.approvalStatus))
    .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
    .join('\n\n');
}

/** Real business hours the assistant should know: the Whatnot live-show schedule. */
export function getHoursContext(): string {
  const lines = Object.entries(SHOW_TIMES_BY_WEEKDAY).map(([weekday, time]) => {
    const dayName = WEEKDAY_NAMES[Number(weekday)];
    const hour12 = ((time.hour + 11) % 12) + 1;
    const period = time.hour < 12 ? 'AM' : 'PM';
    const minute = time.minute === 0 ? '' : `:${String(time.minute).padStart(2, '0')}`;
    return `${dayName} at ${hour12}${minute} ${period} ET`;
  });
  return `Live shows on Whatnot: ${lines.join(' and ')} (time zone: ${ASSUMED_TIMEZONE}). The website automatically converts these to each visitor's own local time zone.`;
}
