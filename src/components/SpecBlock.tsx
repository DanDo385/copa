import type { CareNotes, ProductSpecs } from '@/data/products';
import { PlaceholderBadge } from './PlaceholderBadge';
import styles from './SpecBlock.module.css';

interface SpecBlockProps {
  specs: ProductSpecs;
  careNotes?: CareNotes;
  sku?: string;
}

const SPEC_FIELDS: { key: keyof ProductSpecs; label: string }[] = [
  { key: 'baseMaterial', label: 'Base metal' },
  { key: 'plating', label: 'Plating method & thickness' },
  { key: 'stones', label: 'Stone type & treatment' },
  { key: 'dimensions', label: 'Dimensions' },
  { key: 'weight', label: 'Weight' },
  { key: 'closure', label: 'Closure' },
  { key: 'finishOptions', label: 'Finish options' },
  { key: 'origin', label: 'Country of origin' },
];

function displayValue(value: ProductSpecs[keyof ProductSpecs]): string {
  const text = value.displayValue?.trim();
  if (!text) return 'To be confirmed';
  if (value.status !== 'VERIFIED' && value.status !== 'OWNER_APPROVED') {
    return 'To be confirmed';
  }
  return text;
}

function displayCare(care?: CareNotes): string {
  if (!care?.displayValue?.trim()) return 'To be confirmed';
  if (care.status !== 'VERIFIED' && care.status !== 'OWNER_APPROVED') {
    return 'To be confirmed';
  }
  return care.displayValue;
}

export function SpecBlock({ specs, careNotes, sku }: SpecBlockProps) {
  const hasPending = SPEC_FIELDS.some(({ key }) => {
    const field = specs[key];
    return !field.displayValue?.trim() || field.status === 'SUPPLIER_EVIDENCE_REQUIRED';
  });

  const careValue = displayCare(careNotes);
  const carePending = careValue === 'To be confirmed';

  return (
    <section className={styles.block} aria-labelledby="product-specs-title">
      <div className={styles.header}>
        <h2 id="product-specs-title" className={styles.title}>
          Specifications
        </h2>
        {(hasPending || carePending) && <PlaceholderBadge />}
      </div>

      {sku && (
        <p className={styles.sku}>
          SKU: <span>{sku}</span>
        </p>
      )}

      <dl className={styles.list}>
        {SPEC_FIELDS.map(({ key, label }) => {
          const field = specs[key];
          const value = displayValue(field);
          const pending = value === 'To be confirmed';
          return (
            <div key={key} className={styles.row}>
              <dt>{label}</dt>
              <dd data-pending={pending ? 'true' : 'false'}>{value}</dd>
            </div>
          );
        })}
        <div className={styles.row}>
          <dt>Care instructions</dt>
          <dd data-pending={carePending ? 'true' : 'false'}>{careValue}</dd>
        </div>
      </dl>
    </section>
  );
}
