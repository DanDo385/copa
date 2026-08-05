import type { Metadata } from 'next';
import Link from 'next/link';
import { CategoryGrid } from '@/components/CategoryGrid';
import { HomeHero } from '@/components/HomeHero';
import { CompleteTheLook } from '@/components/CompleteTheLook';
import { ConsentCapture } from '@/components/ConsentCapture';
import { Container } from '@/components/Container';
import { FounderSection } from '@/components/FounderSection';
import { LiveShowModule } from '@/components/LiveShowModule';
import { PackagingSection } from '@/components/PackagingSection';
import { OwnerNote, PlaceholderBadge } from '@/components/PlaceholderBadge';
import { ProductCard } from '@/components/ProductCard';
import { ProofStrip } from '@/components/ProofStrip';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { getCollectionProducts, getRelated } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'CopaJewelry — Brazilian-founded curation, styled live',
  description:
    'Jewelry curated worldwide and styled live by Marcela, Isabella, and Carol. Shop the catalogue, join live shows on Whatnot, and explore custom work.',
};

export default function HomePage() {
  const bestSellers = getCollectionProducts('best-sellers').slice(0, 6);
  const styledLooks = getRelated('imperial-necklace', 4).filter((product) =>
    product.images[0]?.startsWith('https://'),
  );

  return (
    <>
      <HomeHero />
      <ProofStrip />

      <Section>
        <Container>
          <div className="section-header">
            <h2 className="heading-display section-header__title">Best sellers</h2>
            <p className="text-muted">Customer favorites from the CopaJewelry catalogue prototype.</p>
          </div>
          <ul className="grid grid--4 product-grid">
            {bestSellers.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <p className="section-footer-link">
            <Link href="/collections/best-sellers">View all best sellers</Link>
          </p>
        </Container>
      </Section>

      <FounderSection />
      <CategoryGrid />
      <CompleteTheLook products={styledLooks} />

      <PackagingSection
        imageSrc="/images/editorial-look-1.jpg"
        imageAlt="CopaJewelry campaign still — styled look, worn on location"
      />

      <Section tone="elevated">
        <Container>
          <div className="story-split">
            <div>
              <p className="text-accent story-split__eyebrow">Our roots</p>
              <h2 className="heading-display story-split__title">
                Brazilian-founded, worldwide curated
              </h2>
              <p className="story-split__body">
                CopaJewelry began with a Brazilian eye for color, movement, and bold stacking — then built
                a catalogue of pieces sourced and styled for real life, not a generic luxury template.
              </p>
              <OwnerNote>
                <p className="story-split__body">
                  Prototype placeholder: final brand story wording, press credits, and editorial
                  permissions require owner approval before production publication.
                </p>
              </OwnerNote>
              <PlaceholderBadge prominent />
              <p className="section-footer-link">
                <Link href="/our-story">Read our story</Link>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <LiveShowModule />
      <ReviewsSection />

      <Section tone="sunken">
        <Container>
          <div className="story-split">
            <div>
              <p className="text-accent story-split__eyebrow">Custom & bespoke</p>
              <h2 className="heading-display story-split__title">Made for you, led by a founder</h2>
              <p className="story-split__body">
                From finish preferences to one-of-one requests, custom work stays human-led. Share
                inspiration and sizing notes — we&apos;ll respond on CopaJewelry&apos;s owned channels.
              </p>
              <PlaceholderBadge />
              <Button href="/custom" variant="primary">
                Start a custom inquiry
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <ConsentCapture mode="newsletter" />
        </Container>
      </Section>
    </>
  );
}
