'use client';

import { useState } from 'react';
import { CartDrawer } from './CartDrawer';
import { Header } from './Header';

export function SiteChrome() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
