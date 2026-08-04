import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tone?: 'default' | 'elevated' | 'sunken';
  spacing?: 'sm' | 'md' | 'lg';
}

export function Section({
  children,
  tone = 'default',
  spacing = 'md',
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      className={[styles.section, styles[tone], styles[spacing], className ?? '']
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </section>
  );
}
