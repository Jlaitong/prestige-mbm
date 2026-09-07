import React from 'react';
import { Hero } from '../sections/Hero';
import { ScrollExpand } from '../components/react-bits/ScrollExpand';
import { CardNav } from '../components/react-bits/CardNav';
import { CatalogSection } from '../sections/CatalogSection';
import { SavingsComparator } from '../sections/SavingsComparator';
import { AtelierSection } from '../sections/AtelierSection';
import { DepthCarousel } from '../components/react-bits/DepthCarousel';
import { DEFAULT_PRODUCTS } from '../data/productDefaults';
import { SplitText } from '../components/react-bits/SplitText';

export const HomePage: React.FC = () => {
  return (
    <main className="relative z-10">
      {/* 1. Hero Editorial Cover */}
      <Hero />

      {/* 2. Interactive Dark Luxury Manifesto (ScrollExpand 3-Pillar Deck) */}
      <ScrollExpand />

      {/* 3. CardNav: Quick Jump Strip */}
      <CardNav />

      {/* 4. Drops Catalog Grid with GlareHover */}
      <CatalogSection />

      {/* 5. Savings Comparator Slider */}
      <SavingsComparator />

      {/* 6. Depth Carousel: 3D Layered Showcase */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto my-16 md:my-24">
        <div className="mb-6 text-center md:text-left">
          <span className="font-brand font-bold text-[11px] tracking-widest text-[#777] uppercase block">
            PERSPECTIVA 3D • CONSTRUCCIÓN 200 GSM
          </span>
          <SplitText
            text="GALERÍA DE ESTRUCTURA TEXTIL"
            as="h2"
            className="font-brand font-black text-3xl sm:text-4xl md:text-5xl text-[#121212] uppercase mt-1 tracking-tight"
          />
        </div>
        <DepthCarousel products={DEFAULT_PRODUCTS} autoPlay={false} />
      </section>

      {/* 7. Atelier Privé MBM - AI Outfit Stylist */}
      <AtelierSection />
    </main>
  );
};
