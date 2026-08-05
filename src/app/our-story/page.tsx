import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { FounderSection } from '@/components/FounderSection';
import { PageHero } from '@/components/PageHero';
import { PlaceholderBadge } from '@/components/PlaceholderBadge';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Our Story — CopaJewelry',
  description:
    'Brazilian-founded taste, worldwide curation — meet the founders who source and style every CopaJewelry piece.',
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our roots"
        title="Brazilian-founded, worldwide curated"
        subtitle="CopaJewelry began with a Brazilian eye for color, movement, and bold stacking — then built a catalogue of pieces sourced and styled for real life, not a generic luxury template."
      />
      <FounderSection />
      <Section tone="sunken">
        <Container>
          <div className="story-split">
            <p className="text-accent story-split__eyebrow">Custom &amp; bespoke</p>
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
        </Container>
      </Section>
    </>
  );
}
