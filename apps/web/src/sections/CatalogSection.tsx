import React, { useState } from 'react';
import { Product, CategorySlug } from '@prestige/types';
import { DEFAULT_PRODUCTS } from '../data/productDefaults';
import { useCart } from '../components/cart/CartContext';
import { SpotlightCard } from '../components/common/SpotlightCard';
import { Badge } from '../components/common/Badge';
import { Price } from '../components/common/Price';
import { Button } from '../components/common/Button';
import { ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CatalogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategorySlug>('all');
  const { addItem } = useCart();

  const categories: { slug: CategorySlug; label: string }[] = [
    { slug: 'all', label: 'Todos los Drops' },
    { slug: 'hoodies', label: 'Hoodies & Jackets' },
    { slug: 'tees', label: 'Tees Boxy' },
    { slug: 'pantalones', label: 'Pantalones' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? DEFAULT_PRODUCTS
      : DEFAULT_PRODUCTS.filter((p) => p.categorySlug === activeCategory);

  return (
    <section className="px-5 md:px-10 max-w-7xl mx-auto my-16 md:my-24" id="catalogo">
      {/* Header & Filter Chips */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <span className="font-brand font-bold text-[11px] tracking-widest text-[#777] uppercase block">
            Bodega Central Bogotá • Stock Limitado
          </span>
          <h2 className="font-brand font-black text-3xl sm:text-4xl md:text-5xl text-[#121212] mt-1 uppercase">
            Drops Disponibles
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2" role="tablist">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-full font-brand font-bold text-xs uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#121212] text-[#e8e8e6] shadow-md scale-105'
                    : 'bg-white text-[#121212] border border-[rgba(18,18,18,0.12)] hover:bg-[#f3f3f1]'
                }`}
                role="tab"
                aria-selected={isActive}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <SpotlightCard
            key={product.id}
            className="p-5 flex flex-col justify-between group bg-white border border-[rgba(18,18,18,0.06)]"
          >
            <div>
              {/* Product Preview Box */}
              <div className="w-full h-64 bg-[#dededb] rounded-2xl flex items-center justify-center mb-5 relative overflow-hidden">
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="dark">{product.badge || `${product.densityGsm} GSM`}</Badge>
                </div>
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-48 h-48 object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <Link
                  to={`/products/${product.slug}`}
                  className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/15 backdrop-blur-[2px]"
                  aria-label={`Ver detalles de ${product.name}`}
                >
                  <span className="bg-white/90 text-black px-4 py-2 rounded-xl font-brand font-bold text-xs flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-4 h-4" />
                    <span>Ver Detalles</span>
                  </span>
                </Link>
              </div>

              {/* Product Details */}
              <h3 className="font-brand font-black text-lg text-[#121212] leading-tight mb-1">
                {product.name}
              </h3>
              <span className="text-xs text-[#777] block line-clamp-2 mb-3">
                {product.description}
              </span>

              <Price
                amount={product.price}
                compareAtAmount={product.compareAtPrice}
                size="md"
                className="mb-4"
              />
            </div>

            {/* Quick Add CTA */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => addItem(product)}
                className="gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir a la Bolsa</span>
              </Button>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};
