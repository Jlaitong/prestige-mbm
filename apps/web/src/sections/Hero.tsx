import React, { useEffect, useRef } from 'react';
import { Button } from '../components/common/Button';
import { HorseScene } from '../components/horse/HorseScene';
import { initHeroAnimation } from '../animations/gsapAnimations';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const cleanup = initHeroAnimation(heroRef.current);
    return cleanup;
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-28 md:pt-36 pb-14 px-5 md:px-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Eyebrow */}
      <div className="hero-reveal mb-5">
        <div className="inline-flex items-center gap-2 bg-[#ffffff]/70 border border-[rgba(18,18,18,0.08)] px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#121212] animate-pulse" />
          <span className="font-brand font-bold text-[10px] tracking-widest uppercase text-[#333]">
            BODEGA CENTRAL BOGOTÁ • DESPACHO INMEDIATO 24H
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-7">
          <h1 className="hero-reveal font-brand font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tighter text-[#121212] mb-6 uppercase">
            ALTA PRESENCIA.<br />
            <span className="text-[#6e6e6b]">ACTITUD CAPITALINA.</span><br />
            EXCLUSIVIDAD PURA.
          </h1>

          <p className="hero-sub-reveal text-[#444] text-base md:text-lg max-w-xl mb-8 font-normal leading-relaxed">
            Prendas de corte boxy y alta densidad textil (200 GSM) diseñadas para el ritmo de Bogotá.
            Eliminamos el 45% de sobrecostos de centros comerciales para darte confección prémium directo de taller.
          </p>

          {/* Action CTAs */}
          <div className="hero-sub-reveal flex flex-wrap items-center gap-4 mb-10">
            <a href="#catalogo">
              <Button variant="primary" size="lg">
                Explorar Drops
              </Button>
            </a>
            <a href="#comparador">
              <Button variant="secondary" size="lg" className="gap-2">
                <Sparkles className="w-4 h-4 text-[#121212]" />
                <span>Simulador de Ahorro (-$120K)</span>
              </Button>
            </a>
          </div>

          {/* Specifications Grid */}
          <div className="hero-sub-reveal grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(18,18,18,0.08)]">
            <div>
              <span className="block text-[10px] font-brand uppercase tracking-wider text-[#777]">
                Densidad
              </span>
              <span className="font-brand font-black text-xl md:text-2xl text-[#121212]">
                200 GSM
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-brand uppercase tracking-wider text-[#777]">
                Entrega
              </span>
              <span className="font-brand font-black text-xl md:text-2xl text-[#121212]">
                24H Bogotá
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-brand uppercase tracking-wider text-[#777]">
                Precio Taller
              </span>
              <span className="font-brand font-black text-xl md:text-2xl text-[#1b7a42]">
                $140.000 COP
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Cinematic Horse Movement Scene */}
        <div className="lg:col-span-5">
          <div className="squircle-card p-6 bg-[#f9f9f7] relative overflow-hidden border border-[rgba(18,18,18,0.08)]">
            <div className="absolute top-5 left-5 z-20">
              <span className="bg-[#121212] text-[#e8e8e6] px-3.5 py-1.5 rounded-full font-brand font-bold text-[9px] uppercase tracking-wider">
                PIEZA INSIGNIA • CABALLO MBM
              </span>
            </div>
            <HorseScene />
            <div className="pt-4 border-t border-[rgba(18,18,18,0.06)] flex justify-between items-center text-xs">
              <span className="font-brand font-bold text-[#666]">
                Identidad Ecuestre y Velocidad
              </span>
              <span className="font-brand font-bold text-[#121212]">
                Bogotá D.C.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
