import React, { useState } from 'react';
import { DEFAULT_ATELIER_LOOKS } from '../data/productDefaults';
import { AtelierLook } from '@prestige/types';
import { useCart } from '../components/cart/CartContext';
import { Button } from '../components/common/Button';
import { Price } from '../components/common/Price';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const AtelierSection: React.FC = () => {
  const [selectedLook, setSelectedLook] = useState<AtelierLook>(DEFAULT_ATELIER_LOOKS[0]);
  const { addItem } = useCart();

  const handleAddCombo = () => {
    const comboProduct = {
      id: `combo-${selectedLook.key}`,
      slug: `combo-${selectedLook.key}`,
      name: `Combo Atelier: ${selectedLook.title}`,
      description: selectedLook.description,
      details: selectedLook.includedItems.map((i) => i.name),
      densityGsm: 200,
      price: selectedLook.price,
      compareAtPrice: selectedLook.compareAtPrice,
      badge: 'LOOK COORDINADO',
      categorySlug: 'camisetas' as const,
      images: [
        {
          id: `img-combo-${selectedLook.key}`,
          url: selectedLook.imageUrl || 'https://cdn.catalog-store.link/c179cae6bb3bcb33d8619d1bc893df0f_photo.webp',
          altText: selectedLook.title,
          isPrimary: true,
          order: 0,
        },
      ],
      variants: [],
      isAvailable: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addItem(comboProduct);
  };

  return (
    <section className="px-5 md:px-10 max-w-7xl mx-auto my-16 md:my-28" id="atelier">
      <div className="squircle-card p-8 md:p-14 bg-white border border-[rgba(18,18,18,0.08)] shadow-xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <span className="font-brand font-bold text-[11px] tracking-widest text-[#777] uppercase block">
            Asesoría Privada de Vestuario • Bogotá
          </span>
          <h2 className="font-brand font-black text-3xl sm:text-4xl md:text-5xl text-[#121212] mt-1 uppercase">
            Atelier Privé MBM
          </h2>
          <p className="text-[#555] text-sm md:text-base mt-2 leading-relaxed">
            Configuramos conjuntos coordinados de camisetas de lujo, gorras estructuradas y relojería para ocasiones específicas en Bogotá,
            con descuento preferencial directo a tu bolsa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Look Selection Buttons (Left) */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            {DEFAULT_ATELIER_LOOKS.map((look) => {
              const isActive = selectedLook.key === look.key;
              return (
                <button
                  key={look.key}
                  onClick={() => setSelectedLook(look)}
                  className={`p-5 rounded-2xl border text-left flex justify-between items-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#121212] text-[#e8e8e6] border-[#121212] shadow-xl scale-[1.01]'
                      : 'bg-[#f7f7f5] text-[#121212] border-[rgba(18,18,18,0.08)] hover:bg-[#eee]'
                  }`}
                  aria-pressed={isActive}
                >
                  <div>
                    <span className="font-brand font-black text-base block mb-0.5">
                      {look.title}
                    </span>
                    <span className={`text-xs ${isActive ? 'text-[#aaa]' : 'text-[#777]'}`}>
                      {look.subtitle}
                    </span>
                  </div>
                  <span className="font-brand font-black text-sm shrink-0 ml-4">
                    ${look.price.toLocaleString('es-CO')} COP
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Look Showcase Card (Right) */}
          <div className="lg:col-span-6 p-7 md:p-8 rounded-3xl bg-[#f5f5f3] border border-[rgba(18,18,18,0.06)] flex flex-col justify-between shadow-md">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-brand font-bold text-[10px] tracking-widest text-[#777] uppercase">
                  Detalles del Conjunto
                </span>
                <span className="bg-[#1b7a42] text-white font-brand font-bold text-[9px] px-3 py-1 rounded-full uppercase flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>Ahorro en Conjunto</span>
                </span>
              </div>

              {/* Photo preview of active combo */}
              {selectedLook.imageUrl && (
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-white border border-[rgba(18,18,18,0.06)] flex items-center justify-center">
                  <img
                    src={selectedLook.imageUrl}
                    alt={selectedLook.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}

              <h3 className="font-brand font-black text-2xl text-[#121212]">
                {selectedLook.title}
              </h3>
              <p className="text-xs md:text-sm text-[#666] mt-2 leading-relaxed">
                {selectedLook.description}
              </p>

              {/* Items included in look */}
              <div className="my-5 pt-4 border-t border-[rgba(18,18,18,0.08)] space-y-2.5">
                {selectedLook.includedItems.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#444]">
                    <CheckCircle2 className="w-4 h-4 text-[#1b7a42] shrink-0" />
                    <span>{it.name} — <span className="text-[#888]">{it.description}</span></span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="my-4 pt-3 border-t border-[rgba(18,18,18,0.08)]">
                <span className="text-[11px] uppercase tracking-wider text-[#888] font-brand font-bold block mb-1">
                  Inversión del combo completo:
                </span>
                <Price
                  amount={selectedLook.price}
                  compareAtAmount={selectedLook.compareAtPrice}
                  size="xl"
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddCombo}
              className="mt-4 shadow-xl"
            >
              Añadir Conjunto Completo a la Bolsa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
