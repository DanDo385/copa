'use client';

import { useEffect, useState } from 'react';
import { demoMedia } from '@/data/demo-media';
import { Button } from './Button';
import { Container } from './Container';
import { WhatnotRadar } from './WhatnotRadar';
import styles from './HomeHero.module.css';

export function HomeHero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      {reduceMotion ? (
        <img src={demoMedia.hero.sourceUrl} alt={demoMedia.hero.alt} className={styles.image} />
      ) : (
        <video
          className={styles.image}
          src="/video/copa-hero.mp4"
          poster={demoMedia.hero.sourceUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      <div className={styles.overlay} />
      <Container className={styles.content}>
        <div className={styles.copyColumn}>
          <p className={styles.eyebrow}>Live styling, sourced worldwide</p>
          <h1 id="home-hero-title" className={`heading-display ${styles.title}`}>
            Jewelry curated worldwide, styled live by the people who source it
          </h1>
          <p className={styles.copy}>
            CopaJewelry brings Brazilian-founded taste and worldwide curation to your everyday stack, with live styling help from the founders who choose every piece.
          </p>
          <div className={styles.actions}>
            <Button href="/shop" variant="primary" size="lg">Shop jewelry</Button>
            <a
              className={styles.whatnotLink}
              href="https://www.whatnot.com/user/copajewelry/shop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/whatnot-mark.png" alt="" aria-hidden="true" className={styles.whatnotIcon} />
              Watch CopaJewelry live on Whatnot ↗
            </a>
          </div>
          <div className={styles.channels} aria-label="Follow CopaJewelry">
            <a href="https://www.instagram.com/copajewelry/" target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
            <a href="https://www.facebook.com/copacabana.jewelry/" target="_blank" rel="noopener noreferrer">
              Facebook ↗
            </a>
          </div>
        </div>

        <div className={styles.showPanel}>
          <WhatnotRadar bare />
        </div>
      </Container>
    </section>
  );
}
