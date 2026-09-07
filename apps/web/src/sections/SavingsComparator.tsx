import React, { useState } from 'react';
import { calculateSavings } from '../data/productDefaults';
import { TrendingDown, ShieldCheck } from 'lucide-react';

export const SavingsComparator: React.FC = () => {
  const [units, setUnits] = useState<number>(1);
  const savings = calculateSavings(units);

  return (
    <section className="px-5 md:px-10 max-w-5xl mx-auto my-16 md:my-24" id="comparador">
      <div className="squircle-card p-6 md:p-10 bg-[#f5f5f3]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <span className="font-brand font-bold text-[11px] tracking-widest text-[#777] uppercase block">
              Transparencia Directa de Costos
            </span>
            <h2 className="font-brand font-black text-2xl sm:text-3xl md:text-4xl text-[#121212] mt-1 uppercase">
              Taller PRESTIGE vs. Centro Comercial
            </h2>
          </div>
          <div className="bg-[#121212] text-[#e8e8e6] px-4 py-2.5 rounded-xl font-brand font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-[#25D366]" />
            <span>Ahorro: -${savings.savingsPerUnit.toLocaleString('es-CO')} COP / prenda</span>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="mb-8 bg-white/70 p-5 rounded-2xl border border-[rgba(18,18,18,0.06)]">
          <div className="flex justify-between items-center text-xs font-bold mb-3">
            <span className="text-[#555]">Simular cantidad de prendas:</span>
            <span className="font-brand font-black text-sm bg-[#121212] text-white px-3 py-1 rounded-full">
              {units} {units === 1 ? 'PRENDA' : 'PRENDAS'}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={units}
            onChange={(e) => setUnits(parseInt(e.target.value))}
            className="w-full h-2.5 bg-[#d8d8d4] rounded-lg cursor-pointer"
            aria-label="Selector de cantidad de prendas para simulación de ahorro"
          />
          <div className="flex justify-between text-[11px] text-[#888] font-brand font-bold mt-2">
            <span>1 prenda</span>
            <span>2 prendas</span>
            <span>3 prendas</span>
            <span>4 prendas</span>
            <span>5 prendas</span>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mall Retail Side */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(18,18,18,0.08)] flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#888] font-brand font-bold block mb-1">
                En Centro Comercial (Retail Mall)
              </span>
              <div className="my-4">
                <span className="font-brand font-black text-3xl md:text-4xl text-[#777] block">
                  ${savings.totalMallPrice.toLocaleString('es-CO')} COP
                </span>
                <p className="text-xs text-[#888] mt-1.5 leading-relaxed">
                  Incluye arriendo de local en zona comercial, vitrina, comisiones e intermediarios.
                </p>
              </div>
            </div>
            <div className="w-full bg-[#eee] h-2.5 rounded-full overflow-hidden mt-4">
              <div className="bg-[#888] h-full w-full" />
            </div>
          </div>

          {/* Workshop PRESTIGE Side */}
          <div className="p-6 rounded-2xl bg-[#121212] text-[#e8e8e6] flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs uppercase tracking-wider text-[#aaa] font-brand font-bold">
                  En PRESTIGE MBM (Taller Bogotá)
                </span>
                <span className="bg-[#1b7a42] text-white text-[9px] font-brand font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Precio Directo
                </span>
              </div>
              <div className="my-4">
                <span className="font-brand font-black text-3xl md:text-4xl text-white block">
                  ${savings.totalWorkshopPrice.toLocaleString('es-CO')} COP
                </span>
                <p className="text-xs text-[#bbb] mt-1.5 leading-relaxed">
                  Confección nacional de alta densidad (200 GSM). Cero intermediarios, entrega en 24H.
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-brand font-bold text-[#25D366] mb-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Tu Ahorro Total Real:</span>
                </span>
                <span className="text-sm font-black">
                  -${savings.totalSavings.toLocaleString('es-CO')} COP
                </span>
              </div>
              <div className="w-full bg-[#2a2a2a] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#25D366] h-full w-[54%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
