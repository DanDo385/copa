'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function SiteMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <main
      id="main-content"
      className={['site-main', isHome ? 'site-main--flush' : ''].filter(Boolean).join(' ')}
    >
      {children}
    </main>
  );
}
