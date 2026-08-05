import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/Container';
import { PlaceholderBadge } from '@/components/PlaceholderBadge';
import { CollectionCatalog } from '@/app/shop/CollectionCatalog';
import { getCollection, getCollectionProducts } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Shop all jewelry',
  description:
    'Browse the full CopaJewelry catalogue — earrings, necklaces, rings, bracelets, and ear cuffs with filters and sorting.',
};

export default function ShopPage() {
  const collection = getCollection('all');
  const products = getCollectionProducts('all');

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop all' },
          ]}
        />
      </Container>
      <section className="page-intro" aria-labelledby="shop-title">
        <Container>
          <h1 id="shop-title" className="heading-display page-intro__title">
            Shop all jewelry
          </h1>
          <p className="page-intro__subtitle">
            {collection?.description ??
              'Browse the full CopaJewelry catalog prototype with category, finish, and price filters.'}
          </p>
          {collection?.ownerApprovalRequired && <PlaceholderBadge />}
        </Container>
      </section>
      <CollectionCatalog
        initialProducts={products}
        collectionHandle="all"
        title="All jewelry"
      />
    </>
  );
}
