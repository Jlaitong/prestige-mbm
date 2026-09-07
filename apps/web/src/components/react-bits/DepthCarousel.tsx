import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '@prestige/types';
import { Badge } from '../common/Badge';
import { Price } from '../common/Price';
import { Button } from '../common/Button';
import { useCart } from '../cart/CartContext';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DepthCarouselProps {
  products: Product[];
  autoPlay?: boolean;
  interval?: number;
}

export const DepthCarousel: React.FC<DepthCarouselProps> = ({
  products,
  autoPlay = false,
  interval = 4500,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { addItem } = useCart();

  const total = products.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 45) {
      prevSlide();
    } else if (diff < -45) {
      nextSlide();
    }
    setTouchStartX(null);
  };

  // Helper to calculate circular distance
  const getCardOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div
      className="relative w-full py-8 md:py-14 select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrusel 3D de Prendas Exclusivas"
    >
      {/* 3D Scene Viewport */}
      <div
        className="relative mx-auto h-[480px] sm:h-[520px] md:h-[560px] flex items-center justify-center"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {products.map((product, index) => {
          const offset = getCardOffset(index);
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // 3D Depth transform calculations
          const translateX = offset * 240; // horizontal separation
          const translateZ = -Math.abs(offset) * 160; // depth pushback
          const rotateY = -offset * 18; // rotation towards center
          const scale = Math.max(0.68, 1 - Math.abs(offset) * 0.16);
          const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.35);
          const zIndex = 30 - Math.abs(offset) * 10;

          return (
            <div
              key={product.id}
              onClick={() => {
                if (!isCenter) setActiveIndex(index);
              }}
              className="absolute w-[290px] sm:w-[330px] md:w-[370px] cursor-pointer will-change-transform"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease',
              }}
              role="group"
              aria-label={`Prenda ${index + 1} de ${total}: ${product.name}`}
            >
              <div
                className={`p-5 rounded-3xl bg-white border transition-shadow duration-500 overflow-hidden flex flex-col justify-between ${
                  isCenter
                    ? 'border-[#121212]/20 shadow-2xl ring-1 ring-black/5'
                    : 'border-black/10 shadow-lg hover:border-black/25'
                }`}
              >
                {/* Image showcase */}
                <div className="relative w-full aspect-[4/3] bg-[#f4f4f2] rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant={isCenter ? 'dark' : 'subtle'}>
                      {product.badge || `${product.densityGsm} GSM`}
                    </Badge>
                  </div>

                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />

                  {/* Quick view button on center card */}
                  {isCenter && (
                    <Link
                      to={`/products/${product.slug}`}
                      className="absolute inset-0 bg-black/25 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
                    >
                      <span className="bg-white text-black px-4 py-2 rounded-xl font-brand font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Prenda</span>
                      </span>
                    </Link>
                  )}
                </div>

                {/* Product Data */}
                <div>
                  <span className="text-[10px] font-brand font-bold tracking-widest text-[#888] uppercase block mb-1">
                    {product.categorySlug} • BOGOTÁ
                  </span>
                  <h3 className="font-brand font-black text-lg text-[#121212] leading-tight mb-1.5 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#666] line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Pricing & Bag Action */}
                <div className="pt-3 border-t border-[rgba(18,18,18,0.08)] flex items-center justify-between gap-3">
                  <Price amount={product.price} compareAtAmount={product.compareAtPrice} size="sm" />

                  {isCenter ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(product);
                      }}
                      className="gap-1.5 shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Bolsa</span>
                    </Button>
                  ) : (
                    <span className="text-[11px] font-brand font-bold text-[#888] uppercase tracking-wider">
                      Click para ver
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sleek Navigation Arrows & Dots */}
      <div className="flex items-center justify-center gap-6 mt-4 z-40 relative">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white border border-[rgba(18,18,18,0.12)] text-[#121212] flex items-center justify-center shadow-md hover:bg-[#121212] hover:text-[#e8e8e6] hover:scale-110 active:scale-95 transition-all"
          aria-label="Prenda anterior en el carrusel 3D"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === i
                  ? 'w-7 h-2 bg-[#121212]'
                  : 'w-2 h-2 bg-[#121212]/20 hover:bg-[#121212]/50'
              }`}
              aria-label={`Ir a la prenda ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white border border-[rgba(18,18,18,0.12)] text-[#121212] flex items-center justify-center shadow-md hover:bg-[#121212] hover:text-[#e8e8e6] hover:scale-110 active:scale-95 transition-all"
          aria-label="Siguiente prenda en el carrusel 3D"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
