import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CustomInquiryForm } from '@/components/CustomInquiryForm';
import { PageHero } from '@/components/PageHero';
import { PlaceholderBadge } from '@/components/PlaceholderBadge';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Custom & bespoke — CopaJewelry',
  description:
    'Start a custom jewelry request with CopaJewelry — share inspiration and sizing notes and a founder responds directly.',
};

export default function CustomPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom & bespoke"
        title="Made for you, led by a founder"
        subtitle="From finish preferences to one-of-one requests, custom work stays human-led. Share inspiration and sizing notes below."
      />
      <Section>
        <Container>
          <CustomInquiryForm />
          <PlaceholderBadge label="Response time and pricing require owner approval" />
        </Container>
      </Section>
    </>
  );
}
