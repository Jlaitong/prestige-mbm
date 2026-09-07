import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from './SplitText';
import { Sparkles, Shield, Percent, Truck, ArrowDown } from 'lucide-react';
import { smoothScrollTo } from '../../animations/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

export const ScrollExpand: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          scale: 0.94,
          opacity: 0.85,
        },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      id: 'costo',
      icon: Percent,
      tag: 'FINANZAS TRANSPARENTES',
      title: 'Cero Sobrecostos de Mall',
      highlight: '-45% MENOS',
      statLabel: 'Ahorro promedio por pieza',
      statValue: '$120.000 COP',
      desc: 'Eliminamos locales en centros comerciales y comisiones de vitrina. Pagas confección pura y diseño, no el arriendo de un mall.',
      badge: 'PRECIO DIRECTO DE TALLER',
    },
    {
      id: 'textil',
      icon: Shield,
      tag: 'INGENIERÍA TEXTIL',
      title: 'Algodón Pesado 200 GSM',
      highlight: 'BOXY FIT FIRME',
      statLabel: 'Densidad y estructura',
      statValue: '200 Gramos/m²',
      desc: 'Cuello reforzado indeformable y hombro caído. La silueta mantiene su caída intacta lavado tras lavado en Bogotá.',
      badge: 'GARANTÍA TEXTIL 100%',
    },
    {
      id: 'entrega',
      icon: Truck,
      tag: 'LOGÍSTICA INMEDIATA',
      title: 'Bodega Central Bogotá',
      highlight: 'DESPACHO 24H',
      statLabel: 'Tiempo de despacho capital',
      statValue: 'Mismo Día / 24H',
      desc: 'Todo el catálogo cuenta con stock físico en Bogotá. Confirmas por WhatsApp y enviamos de inmediato con pago seguro.',
      badge: 'STOCK DISPONIBLE AHORA',
    },
  ];

  const current = pillars[activeTab];

  return (
    <div ref={containerRef} className="py-10 md:py-16 px-5 md:px-10 max-w-7xl mx-auto" id="story">
      <div
        ref={cardRef}
        className="squircle-card p-6 sm:p-10 md:p-14 bg-[#0d0d0c] text-[#e8e8e6] border border-white/10 shadow-2xl relative overflow-hidden will-change-transform"
      >
        {/* Subtle Silk Gold/Sand Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#b7b79e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        {/* Section Eyebrow */}
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#b7b79e]" />
            <span className="text-[10px] font-brand font-bold uppercase tracking-widest text-[#b7b79e]">
              MANIFIESTO TALLER PRESTIGE MBM • BOGOTÁ
            </span>
          </div>

          <SplitText
            text="ALTA PRESENCIA • CERO SOBRECOSTOS DE MALL"
            as="h2"
            className="font-brand font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tighter leading-tight text-white mb-8"
          />

          {/* Interactive 3-Pillar Switcher Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between min-h-[90px] ${
                    isActive
                      ? 'bg-white/15 border-[#b7b79e] shadow-lg scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#b7b79e]' : 'text-white/60'}`} />
                    <span className="text-[9px] font-brand font-black uppercase tracking-wider text-white/50">
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <span className="font-brand font-bold text-xs uppercase block text-white">
                      {pillar.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Dynamic Display Deck */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7">
              <div className="inline-block px-3 py-1 rounded-md bg-[#b7b79e]/20 border border-[#b7b79e]/40 text-[#b7b79e] font-brand font-bold text-[10px] uppercase tracking-wider mb-2.5">
                {current.badge}
              </div>
              <h3 className="font-brand font-black text-2xl sm:text-3xl text-white mb-2 uppercase">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-[#aaa] font-normal leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Quick Stat Pill */}
            <div className="md:col-span-5 p-5 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-brand font-bold uppercase tracking-wider text-[#777] mb-1">
                {current.statLabel}
              </span>
              <span className="font-brand font-black text-2xl sm:text-3xl text-[#b7b79e] mb-1">
                {current.statValue}
              </span>
              <span className="text-[10px] font-brand font-bold uppercase text-white/70">
                {current.highlight}
              </span>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/10">
            <span className="text-xs text-[#888] font-brand font-medium">
              Hecho en Bogotá • Sin franquicias intermediarias
            </span>
            <button
              onClick={() => smoothScrollTo('#catalogo')}
              className="inline-flex items-center gap-2 text-xs font-brand font-bold uppercase tracking-wider text-white hover:text-[#b7b79e] transition-colors"
            >
              <span>Ver Prendas Disponibles</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Subtle Watermark */}
        <div className="absolute right-3 bottom-2 opacity-5 pointer-events-none select-none">
          <span className="font-brand font-black text-8xl md:text-9xl tracking-tighter text-white">
            MBM
          </span>
        </div>
      </div>
    </div>
  );
};
