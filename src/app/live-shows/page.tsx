import type { Metadata } from 'next';
import { LiveShowModule } from '@/components/LiveShowModule';
import { PageHero } from '@/components/PageHero';
import { ProofStrip } from '@/components/ProofStrip';

export const metadata: Metadata = {
  title: 'Live Shows — CopaJewelry',
  description:
    'Join CopaJewelry live on Whatnot for live styling, finish comparisons, and founder-hosted curation.',
};

export default function LiveShowsPage() {
  return (
    <>
      <PageHero
        eyebrow="Live on Whatnot"
        title="Live Shows"
        subtitle="Whatnot is CopaJewelry's home for live discovery, community, and show exclusives. This page tracks the schedule and links straight to the show."
      />
      <ProofStrip />
      <LiveShowModule />
    </>
  );
}
