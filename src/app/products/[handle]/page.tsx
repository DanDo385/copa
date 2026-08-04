import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/Container';
import { ProductDetail } from '@/app/products/[handle]/ProductDetail';
import { products } from '@/data/products';
import { getProduct } from '@/lib/catalog';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) {
    return { title: 'Product not found' };
  }
  return {
    title: product.title,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            {
              label: product.category.replace('-', ' '),
              href: `/collections/${product.category}`,
            },
            { label: product.title },
          ]}
        />
      </Container>
      <ProductDetail product={product} />
    </>
  );
}
