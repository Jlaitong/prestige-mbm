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

const LIFESTYLE_GALLERY = [
  {
    id: 'life-1',
    slug: 'lifestyle-1',
    name: 'Estilo Urbano Zona T',
    description: 'Fotografía lifestyle real con nuestro modelo luciendo el pedido recién entregado. Nuestras piezas de 200 GSM en plena acción en las calles de Bogotá.',
    price: 240000,
    compareAtPrice: 380000,
    badge: 'STREETWEAR',
    categorySlug: 'lifestyle',
    densityGsm: 200,
    images: [
      { id: 'img-life-1', url: '/assets/products/model1.jpeg', altText: 'Modelo luciendo outfit en Zona T', isPrimary: true, order: 0 }
    ],
    variants: [],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'life-2',
    slug: 'lifestyle-2',
    name: 'Actitud Capitalina',
    description: 'Captura en set tras la entrega del pedido al modelo. Estructura pesada de 200 GSM que mantiene su forma impecable frente a la cámara.',
    price: 140000,
    compareAtPrice: 240000,
    badge: 'EDITORIAL',
    categorySlug: 'lifestyle',
    densityGsm: 200,
    images: [
      { id: 'img-life-2', url: '/assets/products/model2.jpeg', altText: 'Modelo luciendo actitud capitalina', isPrimary: true, order: 0 }
    ],
    variants: [],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'life-3',
    slug: 'lifestyle-3',
    name: 'Outfit Noche Bogotá',
    description: 'Shooting nocturno luciendo las prendas del último drop entregado. Presencia impecable y combinación de lujo para la vida nocturna.',
    price: 280000,
    compareAtPrice: 420000,
    badge: 'NIGHTLIFE',
    categorySlug: 'lifestyle',
    densityGsm: 200,
    images: [
      { id: 'img-life-3', url: '/assets/products/model3.jpeg', altText: 'Outfit de noche modelo', isPrimary: true, order: 0 }
    ],
    variants: [],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'life-4',
    slug: 'lifestyle-4',
    name: 'Esencia MBM',
    description: 'La esencia de PRESTIGE MBM capturada en nuestro talento tras recibir su pedido. El balance perfecto entre comodidad y exclusividad pura.',
    price: 210000,
    compareAtPrice: 320000,
    badge: 'EXCLUSIVE',
    categorySlug: 'lifestyle',
    densityGsm: 200,
    images: [
      { id: 'img-life-4', url: '/assets/products/model4.jpeg', altText: 'Esencia MBM modelo', isPrimary: true, order: 0 }
    ],
    variants: [],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

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
      <section className="px-5 md:px-10 max-w-7xl mx-auto my-16 md:my-24" id="galeria">
        <div className="mb-6 text-center md:text-left">
          <span className="font-brand font-bold text-[11px] tracking-widest text-[#777] uppercase block">
            PERSPECTIVA 3D • CONSTRUCCIÓN 200 GSM
          </span>
          <h2 className="font-brand font-black text-3xl sm:text-4xl md:text-5xl text-[#121212] uppercase mt-1 tracking-tight">
            GALERÍA LIFESTYLE
          </h2>
        </div>
        <DepthCarousel products={LIFESTYLE_GALLERY} autoPlay={false} />
      </section>

      {/* 7. Atelier Privé MBM - AI Outfit Stylist */}
      <AtelierSection />
    </main>
  );
};
