import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Container.module.css';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'full';

const sizeClassMap: Record<ContainerSize, string> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  wide: 'wide',
  full: 'full',
};

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  children: ReactNode;
}

export function Container({
  size = 'xl',
  children,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={[styles.container, styles[sizeClassMap[size]], className ?? '']
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
