import React, { useState } from 'react';
import { CategorySlug } from '@prestige/types';
import { DEFAULT_PRODUCTS } from '../data/productDefaults';
import { useCart } from '../components/cart/CartContext';
import { Badge } from '../components/common/Badge';
import { Price } from '../components/common/Price';
import { Button } from '../components/common/Button';
import { ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlareHover } from '../components/react-bits/GlareHover';
import { SplitText } from '../components/react-bits/SplitText';

export const CatalogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategorySlug>('all');
  const { addItem } = useCart();

  const categories: { slug: CategorySlug; label: string; count: number }[] = [
    { slug: 'all', label: 'Todos los Drops', count: DEFAULT_PRODUCTS.length },
    { slug: 'camisetas', label: 'Camisetas', count: DEFAULT_PRODUCTS.filter(p => p.categorySlug === 'camisetas').length },
    { slug: 'gorras', label: 'Gorras Bélicas & Goorin', count: DEFAULT_PRODUCTS.filter(p => p.categorySlug === 'gorras').length },
    { slug: 'relojeria', label: 'Relojería de Lujo', count: DEFAULT_PRODUCTS.filter(p => p.categorySlug === 'relojeria').length },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? DEFAULT_PRODUCTS
      : DEFAULT_PRODUCTS.filter((p) => p.categorySlug === activeCategory);

  return (
    <section className="px-5 md:px-10 max-w-7xl mx-auto my-16 md:my-28" id="catalogo">
      {/* Header & Filter Chips */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#121212]" />
            <span className="font-brand font-bold text-[11px] tracking-widest text-[#777] uppercase">
              Catálogo Oficial • Stock Inmediato Bogotá
            </span>
          </div>
          <SplitText
            text="COLECCIÓN DISPONIBLE"
            as="h2"
            className="font-brand font-black text-3xl sm:text-4xl md:text-5xl text-[#121212] uppercase tracking-tight block"
          />
        </div>

        {/* Animated Filter Chips */}
        <div className="flex flex-wrap gap-2.5" role="tablist">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`relative px-5 py-2.5 rounded-full font-brand font-bold text-xs uppercase tracking-wider transition-all duration-300 min-h-[44px] flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#121212] text-[#e8e8e6] shadow-xl scale-105 ring-2 ring-black/10'
                    : 'bg-white text-[#121212] border border-[rgba(18,18,18,0.1)] hover:bg-[#f3f3f1] hover:border-black/30'
                }`}
                role="tab"
                aria-selected={isActive}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-[#666]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid with GlareHover 3D Tilt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-3xl p-5 border border-[rgba(18,18,18,0.08)] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Image Showcase with GlareHover 3D Specular Effect */}
            <div>
              <GlareHover maxTilt={7} glareOpacity={0.25} borderRadius="1rem" className="mb-4">
                <div className="relative w-full aspect-square bg-[#f5f5f3] rounded-2xl overflow-hidden flex items-center justify-center">
                  {/* Badge top-left */}
                  <div className="absolute top-3 left-3 z-20">
                    <Badge variant="dark">{product.badge || `${product.densityGsm} GSM`}</Badge>
                  </div>

                  {/* Real Product Image with Zoom on hover */}
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Quick Details Backdrop Hover Overlay */}
                  <Link
                    to={`/products/${product.slug}`}
                    className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]"
                    aria-label={`Ver detalles de ${product.name}`}
                  >
                    <span className="bg-white text-black px-4 py-2.5 rounded-xl font-brand font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4" />
                      <span>Ver Prenda</span>
                    </span>
                  </Link>
                </div>
              </GlareHover>

              {/* Product Info */}
              <div className="mb-4">
                <span className="text-[10px] font-brand font-bold tracking-widest uppercase text-[#888] block mb-1">
                  PRESTIGE MBM • BOGOTÁ
                </span>
                <h3 className="font-brand font-black text-base text-[#121212] leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-[#000] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-[#666] line-clamp-2 mt-1.5 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Bottom: Pricing & Action Button */}
            <div className="pt-3 border-t border-[rgba(18,18,18,0.06)]">
              <Price
                amount={product.price}
                compareAtAmount={product.compareAtPrice}
                size="md"
                className="mb-3.5"
              />

              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => addItem(product)}
                className="gap-2 shadow-md group-hover:bg-[#000]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir a la Bolsa</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
