import React, { useState } from 'react';
import { Product } from '@prestige/types';
import { Price } from '../common/Price';
import { Badge } from '../common/Badge';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccordionGalleryProps {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
}

export const AccordionGallery: React.FC<AccordionGalleryProps> = ({
  products,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="w-full">
      {/* Desktop Horizontal Accordion (>= 768px) */}
      <div className="hidden md:flex gap-3 h-[480px] w-full">
        {products.map((product, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={product.id}
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden squircle-card cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? 'flex-[3.5] bg-[#ffffff]' : 'flex-1 bg-[#f0f0ee]'
              }`}
            >
              {/* Card Image */}
              <div className="absolute inset-0 z-0 p-6 flex items-center justify-center">
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className={`w-full max-h-[75%] object-contain transition-transform duration-700 ${
                    isActive ? 'scale-100 translate-y-0' : 'scale-90 opacity-40 translate-y-4'
                  }`}
                  loading="lazy"
                />
              </div>

              {/* Badge top-left */}
              <div className="absolute top-5 left-5 z-10">
                <Badge variant={isActive ? 'dark' : 'subtle'}>
                  {product.badge || `${product.densityGsm} GSM`}
                </Badge>
              </div>

              {/* Collapsed vertical indicator */}
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <span className="font-brand font-black text-sm uppercase tracking-widest text-[#777] -rotate-90 whitespace-nowrap">
                    {product.name}
                  </span>
                </div>
              )}

              {/* Active full bottom details */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent z-20 flex justify-between items-end">
                  <div className="max-w-md">
                    <span className="text-[11px] font-brand tracking-widest uppercase text-[#777] block mb-1">
                      Confección de Taller • {product.densityGsm} GSM
                    </span>
                    <h3 className="font-brand font-black text-2xl text-[#121212] mb-1 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#555] line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <Price amount={product.price} compareAtAmount={product.compareAtPrice} size="md" />
                  </div>
                  <Link
                    to={`/products/${product.slug}`}
                    className="bg-[#121212] text-[#e8e8e6] p-3.5 rounded-2xl hover:scale-105 transition-transform flex items-center gap-1.5 text-xs font-brand tracking-wider uppercase font-bold"
                  >
                    <span>Ver Prenda</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Accessible Vertical Accordion (< 768px) */}
      <div className="flex md:hidden flex-col gap-3">
        {products.map((product, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={product.id}
              onClick={() => setActiveIndex(index)}
              className="squircle-card p-5 bg-white overflow-hidden transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="dark">{product.densityGsm} GSM</Badge>
                  <h4 className="font-brand font-black text-base text-[#121212]">
                    {product.name}
                  </h4>
                </div>
                <Price amount={product.price} size="sm" />
              </div>

              {isActive && (
                <div className="mt-4 pt-4 border-t border-[rgba(18,18,18,0.08)]">
                  <div className="w-full h-48 bg-[#f5f5f3] rounded-2xl flex items-center justify-center mb-3">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="h-40 w-auto object-contain"
                    />
                  </div>
                  <p className="text-xs text-[#555] mb-4">{product.description}</p>
                  <Link
                    to={`/products/${product.slug}`}
                    className="w-full bg-[#121212] text-[#e8e8e6] py-3 rounded-xl flex items-center justify-center gap-2 font-brand font-bold text-xs uppercase tracking-wider"
                  >
                    <span>Detalles y Pedido</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
