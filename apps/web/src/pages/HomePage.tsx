import React from 'react';
import { Hero } from '../sections/Hero';
import { ScrollExpand } from '../components/react-bits/ScrollExpand';
import { CardNav } from '../components/react-bits/CardNav';
import { CatalogSection } from '../sections/CatalogSection';
import { SavingsComparator } from '../sections/SavingsComparator';
import { AtelierSection } from '../sections/AtelierSection';
import { AccordionGallery } from '../components/react-bits/AccordionGallery';
import { DEFAULT_PRODUCTS } from '../data/productDefaults';

export const HomePage: React.FC = () => {
  return (
    <main className="relative z-10">
      {/* 1. Hero Editorial Cover */}
      <Hero />

      {/* 2. ScrollExpand Transition into Workshop Story */}
      <ScrollExpand
        tagline="BODEGA CENTRAL EN BOGOTÁ • CONFECCIÓN 200 GSM"
        headline="ALTA PRESENCIA • CERO SOBRECOSTOS DE MALL"
      >
        <p className="mb-3">
          Cada pieza de PRESTIGE MBM está confeccionada en Bogotá con algodón de alto gramaje y felpa
          pesada. Diseñamos con hombro caído y corte boxy estructurado para resistir el ritmo urbano
          capitalino sin perder firmeza.
        </p>
        <p>
          Al eliminar vitrinas de centros comerciales y costos de franquicias, trasladamos ese 45% de
          ahorro directo al precio de taller para nuestros clientes.
        </p>
      </ScrollExpand>

      {/* 3. CardNav: Quick Jump Strip */}
      <CardNav />

      {/* 4. Drops Catalog Grid */}
      <CatalogSection />

      {/* 5. Savings Comparator Slider */}
      <SavingsComparator />

      {/* 6. Accordion Gallery: Editorial Craftsmanship Showcase */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto my-16 md:my-24">
        <div className="mb-8">
          <span className="font-brand font-bold text-[11px] tracking-widest text-[#777] uppercase block">
            Detalle Textil & Construcción
          </span>
          <h2 className="font-brand font-black text-3xl sm:text-4xl text-[#121212] uppercase mt-1">
            Galería de Estructura 200 GSM
          </h2>
        </div>
        <AccordionGallery products={DEFAULT_PRODUCTS} />
      </section>

      {/* 7. Atelier Privé MBM */}
      <AtelierSection />
    </main>
  );
};
