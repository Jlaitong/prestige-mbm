import React from 'react';
import { ArrowRight, Layers, DollarSign, Sparkles, ShieldCheck } from 'lucide-react';

export const CardNav: React.FC = () => {
  const navItems = [
    {
      title: 'Drops Disponibles',
      subtitle: 'Stock en Bogotá • 200 GSM',
      target: '#catalogo',
      icon: Layers,
    },
    {
      title: 'Taller vs. Mall',
      subtitle: 'Ahorro directo -$120.000 COP',
      target: '#comparador',
      icon: DollarSign,
    },
    {
      title: 'Atelier Privé MBM',
      subtitle: 'Conjuntos coordinados',
      target: '#atelier',
      icon: Sparkles,
    },
    {
      title: 'Garantía y Calidad',
      subtitle: 'Despacho 24H en Bogotá',
      target: '#manifiesto',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="px-5 md:px-10 max-w-7xl mx-auto my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.target}
              className="squircle-card p-5 bg-[#ffffff]/90 hover:bg-[#ffffff] border border-[rgba(18,18,18,0.06)] flex items-center justify-between group transition-all duration-300"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#121212] text-[#e8e8e6] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-brand font-black text-sm uppercase text-[#121212]">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-[#777] block font-normal">
                    {item.subtitle}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#aaa] group-hover:text-[#121212] group-hover:translate-x-1 transition-all" />
            </a>
          );
        })}
      </div>
    </div>
  );
};
