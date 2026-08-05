'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatPrice, formatStyleNumber, getRelated } from '@/lib/catalog';
import { AddToCartButton } from '@/components/AddToCartButton';
import { CompleteTheLook } from '@/components/CompleteTheLook';
import { Container } from '@/components/Container';
import { useOwnerReview } from '@/lib/owner-review-context';
import { PlaceholderBadge } from '@/components/PlaceholderBadge';
import { PolicySummary } from '@/components/PolicySummary';
import { ProductGallery } from '@/components/ProductGallery';
import { Section } from '@/components/Section';
import { SpecBlock } from '@/components/SpecBlock';
import { VariantSelector } from '@/components/VariantSelector';
import type { Product } from '@/data/products';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const { reviewMode } = useOwnerReview();
  const related = getRelated(product.handle, 4);
  const showSizeHelp = product.category === 'rings' || product.category === 'bracelets';

  return (
    <>
      <Section spacing="lg">
        <Container>
          <div className="pdp-layout">
            <ProductGallery images={product.images} productTitle={product.title} />

            <div className="pdp-buybox">
              <h1 className="heading-display pdp-buybox__title">{product.title}</h1>
              <p className="pdp-buybox__price">
                {formatPrice(product.priceCents)}
                {product.priceIsPlaceholder && (
                  <PlaceholderBadge label="Price to be confirmed" />
                )}
              </p>

              {reviewMode && (
                <div className="pdp-buybox__reviews" aria-label="Judge.me review preview slot">
                  <PlaceholderBadge label="Judge.me preview badge" />
                </div>
              )}

              <p className="pdp-buybox__description">{product.description}</p>

              <VariantSelector
                product={product}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />

              <label className="pdp-qty" htmlFor="pdp-quantity">
                Quantity
                <input
                  id="pdp-quantity"
                  type="number"
                  min={1}
                  max={99}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                />
              </label>

              {selectedVariant && (
                <p className="text-muted pdp-sku">
                  Style <span>{formatStyleNumber(selectedVariant.sku)}</span>
                </p>
              )}

              <AddToCartButton
                product={product}
                variant={selectedVariant}
                quantity={quantity}
                stickyMobile
              />

              <PolicySummary />

              {product.stylingNote && (
                <aside className="pdp-founder-note" aria-label="Why CopaJewelry chose it">
                  <h2 className="pdp-founder-note__title">Why CopaJewelry chose it</h2>
                  <p className="pdp-founder-note__meta">
                    Editorial styling note — {product.stylingNote.author}
                  </p>
                  <p>{product.stylingNote.text}</p>
                  <PlaceholderBadge label="Editorial judgment" />
                </aside>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="elevated">
        <Container>
          <SpecBlock specs={product.specs} careNotes={product.careNotes} sku={selectedVariant?.sku} />

          {showSizeHelp && (
            <div className="pdp-size-help">
              <h2 className="heading-display pdp-size-help__title">Sizing help</h2>
              <p>
                Ring and bracelet fit varies by style. Use our{' '}
                <Link href="/size-guide">size guide</Link> for measurement instructions, or{' '}
                <Link href="/contact">contact CopaJewelry</Link> for human help.
              </p>
              <PlaceholderBadge />
            </div>
          )}

          <div className="pdp-care">
            <h2 className="heading-display pdp-care__title">Care</h2>
            <p>{product.careNotes.displayValue}</p>
            <p className="text-muted">
              See <Link href="/materials-and-care">materials and care</Link> for general guidance by
              metal and stone type.
            </p>
          </div>
        </Container>
      </Section>

      {reviewMode && (
        <Section>
          <Container>
            <h2 className="heading-display">Reviews</h2>
            <div className="judgeme-slot" aria-label="Judge.me review widget slot">
              <PlaceholderBadge label="Judge.me review widget" />
              <p>Review widget placement for authorized Shopify implementation.</p>
            </div>
          </Container>
        </Section>
      )}

      <CompleteTheLook
        products={related}
        title="Complete the look"
        subtitle="Selected to pair with this piece — styled by CopaJewelry, not behavioral order data."
      />

      {/*
        Structured data plan (emit only when backed by live platform data):
        - Product: name, description, image URLs (verified assets only)
        - Offer: price, currency, availability per variant (Shopify-synced)
        - AggregateRating: ONLY when Judge.me returns verified on-site review counts
        - Do NOT emit warranty, shipping, or return schema until canonical policies approved
        - Do NOT emit material performance claims without variant-level evidence
      */}
    </>
  );
}
