import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/PageHero';
import { SearchResults } from '@/app/search/SearchResults';

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Search the COPA Jewelry catalogue by name, category, or finish. Helpful recovery when nothing matches.',
};

export default function SearchPage() {
  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Search' },
          ]}
        />
      </Container>
      <PageHero
        title="Search"
        subtitle="Find pieces by name, category, finish, or keyword."
      />
      <Suspense fallback={<p className="container">Loading search…</p>}>
        <SearchResults />
      </Suspense>
    </>
  );
}
