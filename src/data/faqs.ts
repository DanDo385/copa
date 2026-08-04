/**
 * COPA Jewelry FAQ registry — structural placeholders where policy is unapproved.
 */

import type { ClaimStatus } from './products';

export type FaqCategory =
  | 'shipping'
  | 'returns'
  | 'sizing'
  | 'materials'
  | 'care'
  | 'warranty'
  | 'gifts'
  | 'live-shows'
  | 'custom'
  | 'order-support';

export interface FaqEntry {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  approvalStatus: ClaimStatus;
  placeholder: boolean;
  gateId?: string;
}

export const faqs: FaqEntry[] = [
  {
    id: 'faq-shipping-01',
    category: 'shipping',
    question: 'How much is shipping?',
    answer:
      'Shipping rates and delivery times are being finalized with operations. The prototype displays a demo free-shipping threshold of $80 — this is configurable and requires owner approval before production checkout.',
    approvalStatus: 'OWNER_APPROVED',
    placeholder: true,
    gateId: 'gate-01-free-shipping-threshold',
  },
  {
    id: 'faq-shipping-02',
    category: 'shipping',
    question: 'Do you ship internationally?',
    answer:
      'International shipping availability, carriers, and customs policies are pending owner confirmation. Contact order support for current options.',
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    placeholder: true,
    gateId: 'gate-01-free-shipping-threshold',
  },
  {
    id: 'faq-shipping-03',
    category: 'shipping',
    question: 'How fast does Whatnot order shipping arrive?',
    answer:
      'The COPA Jewelry Whatnot shop showed a one-day average shipping time as of August 3, 2026. This applies to Whatnot orders only and may differ from website fulfillment.',
    approvalStatus: 'VERIFIED',
    placeholder: false,
  },
  {
    id: 'faq-returns-01',
    category: 'returns',
    question: 'What is your return policy?',
    answer:
      'Return and refund terms are not yet approved for publication. Final policy will specify return window, item condition, and refund method — pending owner and legal review.',
    approvalStatus: 'LEGAL_REVIEW_REQUIRED',
    placeholder: true,
    gateId: 'gate-02-return-refund-policy',
  },
  {
    id: 'faq-returns-02',
    category: 'returns',
    question: 'Can I exchange a ring for a different size?',
    answer:
      'Exchange availability depends on stock and final return policy. Size exchange procedures will be published once approved by the owner.',
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    placeholder: true,
    gateId: 'gate-02-return-refund-policy',
  },
  {
    id: 'faq-sizing-01',
    category: 'sizing',
    question: 'How do I find my ring size?',
    answer:
      'We recommend having your finger sized at a local jeweler for the most accurate fit. Adjustable rings in our catalog are noted on the product page. Specific size charts will be added when supplier measurements are confirmed.',
    approvalStatus: 'OWNER_APPROVED',
    placeholder: true,
  },
  {
    id: 'faq-sizing-02',
    category: 'sizing',
    question: 'What if my moissanite eternity band size is sold out?',
    answer:
      'Availability varies by size. Sold-out sizes may restock — check the product page or join a live show for restock announcements. Backorder policy pending owner confirmation.',
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    placeholder: true,
  },
  {
    id: 'faq-materials-01',
    category: 'materials',
    question: 'What materials does COPA use?',
    answer:
      'Materials vary by piece and are listed on each product page. Verified examples from our August 2026 audit include brass, stainless steel, 925 sterling silver, moissanite, 5A CZ, and natural quartz. Unverified specs are marked "To be confirmed." We do not publish blanket material performance claims.',
    approvalStatus: 'VERIFIED',
    placeholder: false,
  },
  {
    id: 'faq-materials-02',
    category: 'materials',
    question: 'Is COPA jewelry hypoallergenic or nickel-free?',
    answer:
      'We do not make blanket hypoallergenic or nickel-free claims. Material composition is listed per product where verified. Contact us with specific sensitivity questions — supplier allergen documentation is being collected.',
    approvalStatus: 'DO_NOT_PUBLISH',
    placeholder: false,
    gateId: 'gate-04-hypoallergenic-claims',
  },
  {
    id: 'faq-care-01',
    category: 'care',
    question: 'How should I care for my jewelry?',
    answer:
      'Care instructions are being confirmed with suppliers per SKU. Until published, we recommend storing pieces dry, avoiding harsh chemicals, and removing jewelry before swimming or exercising. Specific care guides will replace this placeholder.',
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    placeholder: true,
    gateId: 'gate-05-performance-claims',
  },
  {
    id: 'faq-care-02',
    category: 'care',
    question: 'Can I wear COPA jewelry in the shower or pool?',
    answer:
      'We do not publish water-resistant or tarnish-free claims. Care guidance per material will be provided once supplier evidence is reviewed.',
    approvalStatus: 'DO_NOT_PUBLISH',
    placeholder: false,
    gateId: 'gate-05-performance-claims',
  },
  {
    id: 'faq-warranty-01',
    category: 'warranty',
    question: 'Does COPA offer a warranty?',
    answer:
      'Warranty terms are under owner review. We do not publish lifetime or limited warranty language until written terms are approved. Contact order support for assistance with a specific purchase.',
    approvalStatus: 'DO_NOT_PUBLISH',
    placeholder: true,
    gateId: 'gate-03-warranty-terms',
  },
  {
    id: 'faq-gifts-01',
    category: 'gifts',
    question: 'Do you offer gift wrapping?',
    answer:
      'Gift wrap is shown as a demo add-on in the prototype but is currently unavailable. The legacy gift-wrap experience is not being reproduced. Final gift presentation options pending owner decision.',
    approvalStatus: 'OWNER_APPROVED',
    placeholder: true,
    gateId: 'gate-11-gift-wrap-service',
  },
  {
    id: 'faq-gifts-02',
    category: 'gifts',
    question: 'Can I send a gift directly to someone else?',
    answer:
      'Gift shipping and messaging options will be configured at checkout once fulfillment policy is approved. This prototype supports gift-eligible product tagging only.',
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    placeholder: true,
  },
  {
    id: 'faq-live-shows-01',
    category: 'live-shows',
    question: 'Where can I watch COPA live shows?',
    answer:
      'COPA Jewelry hosts live selling events on Whatnot. Visit our Whatnot shop for show schedules and notifications. Website live-show embed is a prototype placeholder.',
    approvalStatus: 'VERIFIED',
    placeholder: false,
  },
  {
    id: 'faq-live-shows-02',
    category: 'live-shows',
    question: 'Are Whatnot reviews the same as website reviews?',
    answer:
      'No. Whatnot shop reviews (4,707 reviews, 5.0 rating as of Aug 3, 2026) are separate from website reviews collected via Judge.me (4.71/78). We always label the review source.',
    approvalStatus: 'VERIFIED',
    placeholder: false,
    gateId: 'gate-08-review-attribution',
  },
  {
    id: 'faq-custom-01',
    category: 'custom',
    question: 'Does COPA offer custom or made-to-order pieces?',
    answer:
      'Custom work inquiries are routed to our team (prototype assumption: Isabella Magro). Scope, pricing, and turnaround are not yet published — submit an inquiry via the Custom page placeholder.',
    approvalStatus: 'OWNER_APPROVED',
    placeholder: true,
  },
  {
    id: 'faq-custom-02',
    category: 'custom',
    question: 'Can I request a specific plating or finish?',
    answer:
      'Custom finish requests depend on supplier capability. Final custom order workflow pending owner approval.',
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    placeholder: true,
  },
  {
    id: 'faq-order-support-01',
    category: 'order-support',
    question: 'How do I contact COPA about my order?',
    answer:
      'Order support contact details (email, hours, response SLA) are being configured for the new storefront. Use existing copajewelry.com contact channels until migration is complete.',
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    placeholder: true,
  },
  {
    id: 'faq-order-support-02',
    category: 'order-support',
    question: 'Where can I track my shipment?',
    answer:
      'Tracking links are sent via email when orders ship. Tracking integration for the prototype checkout is pending Shopify fulfillment setup.',
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    placeholder: true,
  },
];

export const faqsByCategory = (category: FaqCategory): FaqEntry[] =>
  faqs.filter((f) => f.category === category);
