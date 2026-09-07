import React, { useEffect, useRef } from 'react';
import { Button } from '../components/common/Button';
import { HorseScene } from '../components/horse/HorseScene';
import { initHeroAnimation } from '../animations/gsapAnimations';
import { Sparkles, ArrowDownRight, ShieldCheck, Zap } from 'lucide-react';
import { smoothScrollTo } from '../animations/smoothScroll';
import { SplitText } from '../components/react-bits/SplitText';

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
      className="relative pt-28 md:pt-36 pb-16 px-5 md:px-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Dynamic ambient radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#121212]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Eyebrow with Pulsing Dot */}
      <div className="hero-reveal mb-6 flex items-center gap-3">
        <div className="inline-flex items-center gap-2.5 bg-white/80 border border-[rgba(18,18,18,0.1)] px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_8px_#25D366] animate-ping" />
          <span className="font-brand font-bold text-[10px] tracking-widest uppercase text-[#222]">
            BODEGA CENTRAL BOGOTÁ • DESPACHO INMEDIATO 24H
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1 text-[11px] font-brand font-bold uppercase text-[#777]">
          <Zap className="w-3.5 h-3.5 text-[#121212]" />
          <span>Colección Oficial 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-7">
          <div className="hero-reveal mb-6">
            <h1 className="font-brand font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tighter text-[#121212] uppercase">
              ALTA PRESENCIA. ACTITUD CAPITALINA. <span className="text-[#b7b79e]">EXCLUSIVIDAD PURA.</span>
            </h1>
          </div>

          <p className="hero-sub-reveal text-[#444] text-base md:text-lg max-w-xl mb-8 font-normal leading-relaxed">
            Prendas de corte boxy, gorras estructuradas y relojería de presencia diseñadas para Bogotá.
            Eliminamos el 45% de sobrecostos de centros comerciales para darte confección prémium directo de taller.
          </p>

          {/* Action CTAs with Smooth Gliding Scroll */}
          <div className="hero-sub-reveal flex flex-wrap items-center gap-4 mb-10">
            <Button
              variant="primary"
              size="lg"
              onClick={() => smoothScrollTo('#catalogo')}
              className="gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <span>Explorar Colección</span>
              <ArrowDownRight className="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => smoothScrollTo('#comparador')}
              className="gap-2 hover:bg-white transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#121212]" />
              <span>Simulador de Ahorro (-$90K)</span>
            </Button>
          </div>

          {/* Specifications Grid */}
          <div className="hero-sub-reveal grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(18,18,18,0.08)]">
            <div className="group cursor-default">
              <span className="block text-[10px] font-brand uppercase tracking-wider text-[#777] mb-0.5">
                Calidad Textil
              </span>
              <span className="font-brand font-black text-xl md:text-2xl text-[#121212] group-hover:text-black transition-colors">
                200 GSM
              </span>
            </div>
            <div className="group cursor-default">
              <span className="block text-[10px] font-brand uppercase tracking-wider text-[#777] mb-0.5">
                Entrega
              </span>
              <span className="font-brand font-black text-xl md:text-2xl text-[#121212] group-hover:text-black transition-colors">
                24H Bogotá
              </span>
            </div>
            <div className="group cursor-default">
              <span className="block text-[10px] font-brand uppercase tracking-wider text-[#777] mb-0.5">
                Precios Taller
              </span>
              <span className="font-brand font-black text-xl md:text-2xl text-[#1b7a42] group-hover:scale-105 transition-transform inline-block">
                Desde $60.000
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Cinematic Horse Movement Scene */}
        <div className="lg:col-span-5">
          <div className="squircle-card p-6 bg-[#f9f9f7] relative overflow-hidden border border-[rgba(18,18,18,0.08)] shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <div className="absolute top-5 left-5 z-20 flex gap-2">
              <span className="bg-[#121212] text-[#e8e8e6] px-3.5 py-1.5 rounded-full font-brand font-bold text-[9px] uppercase tracking-wider">
                PIEZA INSIGNIA • CABALLO MBM
              </span>
            </div>
            <HorseScene />
            <div className="pt-4 border-t border-[rgba(18,18,18,0.06)] flex justify-between items-center text-xs">
              <span className="font-brand font-bold text-[#666] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#121212]" />
                <span>Identidad Ecuestre y Poder</span>
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
