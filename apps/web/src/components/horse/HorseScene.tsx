import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const HorseScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.5, delay: 0.2, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl"
      aria-label="Silueta del Caballo PRESTIGE MBM en movimiento"
    >
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=2000&auto=format&fit=crop"
        alt="Caballo PRESTIGE MBM Bogotá"
        className="w-full h-full object-cover opacity-90"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent opacity-80 z-20 pointer-events-none" />
    </div>
  );
};
