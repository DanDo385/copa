import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/Container';
import { PlaceholderBadge } from '@/components/PlaceholderBadge';
import { CollectionCatalog } from '@/app/shop/CollectionCatalog';
import { collections } from '@/data/collections';
import { getCollection, getCollectionProducts } from '@/lib/catalog';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return collections.map((collection) => ({ handle: collection.handle }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) {
    return { title: 'Collection not found' };
  }
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();

  const products = getCollectionProducts(handle);

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: collection.title },
          ]}
        />
      </Container>
      <section className="page-intro" aria-labelledby="collection-title">
        <Container>
          <h1 id="collection-title" className="heading-display page-intro__title">
            {collection.title}
          </h1>
          <p className="page-intro__subtitle">{collection.description}</p>
          {(collection.ownerApprovalRequired || collection.placeholderNote) && (
            <div className="page-intro__badge">
              <PlaceholderBadge prominent={Boolean(collection.ownerApprovalRequired)} />
              {collection.placeholderNote && (
                <p className="text-muted">{collection.placeholderNote}</p>
              )}
            </div>
          )}
        </Container>
      </section>
      <CollectionCatalog
        initialProducts={products}
        collectionHandle={handle}
        title={collection.title}
      />
    </>
  );
}
