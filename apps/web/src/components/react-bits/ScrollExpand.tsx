import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollExpandProps {
  children: React.ReactNode;
  tagline?: string;
  headline?: string;
}

export const ScrollExpand: React.FC<ScrollExpandProps> = ({
  children,
  tagline = 'MANIFIESTO DE TALLER BOGOTÁ',
  headline = 'ALTA PRESENCIA • CERO INTERMEDIARIOS',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          scale: 0.94,
          borderRadius: '36px',
        },
        {
          scale: 1,
          borderRadius: '24px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 50%',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-12 px-5 md:px-10 max-w-7xl mx-auto">
      <div
        ref={cardRef}
        className="squircle-card p-8 md:p-14 bg-gradient-to-br from-[#121212] to-[#1c1c1a] text-[#e8e8e6] shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10 max-w-3xl">
          <span className="text-[11px] font-brand font-bold uppercase tracking-widest text-[#888] block mb-2">
            {tagline}
          </span>
          <h2 className="font-brand font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter leading-tight mb-6">
            {headline}
          </h2>
          <div className="text-[#bbb] text-base md:text-lg font-normal leading-relaxed">
            {children}
          </div>
        </div>

        {/* Decorative architectural background watermark */}
        <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none select-none">
          <span className="font-brand font-black text-9xl tracking-tighter">MBM</span>
        </div>
      </div>
    </div>
  );
};
