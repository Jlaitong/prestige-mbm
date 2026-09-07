import React, { useState } from 'react';
import { useCart } from '../components/cart/CartContext';
import { Button } from '../components/common/Button';
import { Sparkles, ShoppingBag, Shuffle, Check, MessageCircle } from 'lucide-react';
import { SplitText } from '../components/react-bits/SplitText';

interface CuratedOutfit {
  id: string;
  name: string;
  vibe: string;
  badge: string;
  description: string;
  items: {
    role: string;
    name: string;
    imageUrl: string;
  }[];
  price: number;
  compareAtPrice: number;
}

const CURATED_OUTFITS: CuratedOutfit[] = [
  {
    id: 'noche-zona-t',
    name: 'Outfit Noche Zona Rosa',
    vibe: '🍸 Zona T & Clubbing',
    badge: 'MÁS POPULAR EN BOGOTÁ',
    description: 'Conjunto de alto impacto en tonos oscuros para vida nocturna capitalina. Caída boxy pesada con contrastes de acero.',
    items: [
      {
        role: 'Camiseta 200 GSM',
        name: 'Camiseta Boss Negra',
        imageUrl: 'https://cdn.catalog-store.link/c179cae6bb3bcb33d8619d1bc893df0f_photo.webp',
      },
      {
        role: 'Gorra Estructurada',
        name: 'Gorra Negra 777 Gamuza',
        imageUrl: 'https://cdn.catalog-store.link/4209a77fbbf424f93d269f6a0f4eeec2_photo.webp',
      },
      {
        role: 'Relojería de Presencia',
        name: 'Reloj Rolex Rojo/Negro',
        imageUrl: 'https://cdn.catalog-store.link/a0b07a5b0dbdcc5f458c285c49840202_photo.webp',
      },
    ],
    price: 280000,
    compareAtPrice: 420000,
  },
  {
    id: 'street-capital',
    name: 'Outfit Street Minimal Bogotá',
    vibe: '🌆 Diario & Clima Frío',
    badge: 'ESTILO COTIDIANO',
    description: 'Equilibrio perfecto para el día a día. Algodón de 200 GSM para clima bogotano.',
    items: [
      {
        role: 'Camiseta 200 GSM',
        name: 'Camiseta Boss Azul',
        imageUrl: 'https://cdn.catalog-store.link/76e9fc2b99b56a49956443e3169d2d72_photo.webp',
      },
      {
        role: 'Gorra Insignia',
        name: 'Gorra Goorin Caballo Negra',
        imageUrl: 'https://cdn.catalog-store.link/991083adec48d4f98dea8447b5fc97b3_photo.webp',
      },
      {
        role: 'Relojería Acero',
        name: 'Reloj Tommy Hilfiger',
        imageUrl: 'https://cdn.catalog-store.link/3f51e0fdfd7ddb0cca51138fe2c50c90_photo.webp',
      },
    ],
    price: 240000,
    compareAtPrice: 380000,
  },
  {
    id: 'belico-gold',
    name: 'Outfit White Luxe',
    vibe: '⚡ Presencia & Exclusividad',
    badge: 'EDICIÓN ESPECIAL',
    description: 'Elegancia pura en blanco marfil con contraste en acero dorado para una presencia limpia e imponente.',
    items: [
      {
        role: 'Camiseta 200 GSM',
        name: 'Camiseta Hugo Blanca',
        imageUrl: 'https://cdn.catalog-store.link/0b0c3c81adac2059597ed8a6fbe38696_photo.webp',
      },
      {
        role: 'Gorra Bélica',
        name: 'Gorra Cruces Doradas',
        imageUrl: 'https://cdn.catalog-store.link/ddc326263f4615743b00fcb113f3ed0a_photo.webp',
      },
      {
        role: 'Relojería',
        name: 'Reloj Rolex Rojo/Negro',
        imageUrl: 'https://cdn.catalog-store.link/a0b07a5b0dbdcc5f458c285c49840202_photo.webp',
      },
    ],
    price: 210000,
    compareAtPrice: 320000,
  },
];

export const AtelierSection: React.FC = () => {
  const [selectedOutfitIndex, setSelectedOutfitIndex] = useState<number>(0);
  const { addItem } = useCart();

  const currentOutfit = CURATED_OUTFITS[selectedOutfitIndex];

  const handleAddLookToBag = () => {
    // Add combo as unified package to cart
    addItem({
      id: `combo-${currentOutfit.id}`,
      slug: `combo-${currentOutfit.id}`,
      name: currentOutfit.name,
      description: currentOutfit.description,
      details: currentOutfit.items.map((i) => `${i.role}: ${i.name}`),
      densityGsm: 200,
      price: currentOutfit.price,
      compareAtPrice: currentOutfit.compareAtPrice,
      badge: 'LOOK COMPLETO 3 PIEZAS',
      categorySlug: 'camisetas',
      images: [
        {
          id: `img-${currentOutfit.id}`,
          url: currentOutfit.items[0].imageUrl,
          altText: currentOutfit.name,
          isPrimary: true,
          order: 0,
        },
      ],
      variants: [],
      isAvailable: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleShuffle = () => {
    setSelectedOutfitIndex((prev) => (prev + 1) % CURATED_OUTFITS.length);
  };

  const handleAskStylistWhatsApp = () => {
    const whatsappPhone = import.meta.env.VITE_WHATSAPP_NUMBER || '573332874590';
    const text = `*ASESORÍA PRESTIGE IA — PRESTIGE MBM*%0A%0A` +
      `Hola, me interesa el conjunto: *${currentOutfit.name}* (${currentOutfit.vibe}).%0A` +
      `*Precio Especial:* $${currentOutfit.price.toLocaleString('es-CO')} COP%0A` +
      `¿Tienen las prendas disponibles para despachar en Bogotá?`;
    window.open(`https://wa.me/${whatsappPhone}?text=${text}`, '_blank');
  };

  return (
    <section className="px-5 md:px-10 max-w-7xl mx-auto my-16 md:my-28" id="atelier">
      <div className="squircle-card p-6 sm:p-10 md:p-14 bg-white border border-[rgba(18,18,18,0.08)] shadow-2xl relative overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b border-[rgba(18,18,18,0.08)]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#121212]" />
              <span className="font-brand font-bold text-[11px] tracking-widest text-[#777] uppercase">
                Estilista Virtual • Recomendación Inteligente
              </span>
            </div>
            <h2 className="font-brand font-black text-2xl sm:text-4xl md:text-5xl text-[#121212] uppercase tracking-tight">
              CREADOR DE OUTFITS • PRESTIGE IA
            </h2>
          </div>

          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f4f4f2] hover:bg-[#121212] hover:text-[#e8e8e6] text-[#121212] text-xs font-brand font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Sugerir Otro Look</span>
          </button>
        </div>

        {/* Step 1: Mood / Vibe Selector Buttons */}
        <div className="mb-8">
          <span className="text-[10px] font-brand font-bold tracking-widest uppercase text-[#888] block mb-3">
            Paso 1: Selecciona la Ocasión
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CURATED_OUTFITS.map((outfit, index) => {
              const isSelected = selectedOutfitIndex === index;
              return (
                <button
                  key={outfit.id}
                  onClick={() => setSelectedOutfitIndex(index)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#121212] text-[#e8e8e6] border-[#121212] shadow-xl scale-[1.02]'
                      : 'bg-[#f7f7f5] text-[#121212] border-[rgba(18,18,18,0.08)] hover:bg-[#eeeee9]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-brand font-black text-sm uppercase">
                      {outfit.vibe}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#25D366]" />}
                  </div>
                  <span className={`text-xs ${isSelected ? 'text-[#aaa]' : 'text-[#666]'}`}>
                    {outfit.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: 3-Piece Visual Look Representation */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-brand font-bold tracking-widest uppercase text-[#888]">
              Paso 2: Look Coordinado (3 Piezas)
            </span>
            <span className="bg-[#1b7a42] text-white font-brand font-bold text-[9px] px-3 py-1 rounded-full uppercase">
              {currentOutfit.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentOutfit.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#f8f8f6] border border-[rgba(18,18,18,0.06)] flex flex-col justify-between"
              >
                <div className="w-full aspect-square rounded-xl bg-white border border-black/5 overflow-hidden mb-3 flex items-center justify-center p-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-lg mix-blend-multiply"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-brand font-bold tracking-widest uppercase text-[#888] block">
                    {item.role}
                  </span>
                  <h4 className="font-brand font-bold text-xs text-[#121212] mt-0.5 line-clamp-1">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Transparent Pricing & Direct Add to Bag */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] text-[#e8e8e6] flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <span className="text-[10px] font-brand font-bold uppercase tracking-widest text-[#b7b79e] block mb-1">
              Inversión Especial en Conjunto (Ahorras ${ (currentOutfit.compareAtPrice - currentOutfit.price).toLocaleString('es-CO') } COP)
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-brand font-black text-3xl sm:text-4xl text-white">
                ${currentOutfit.price.toLocaleString('es-CO')} COP
              </span>
              <span className="text-sm line-through text-[#888]">
                ${currentOutfit.compareAtPrice.toLocaleString('es-CO')} COP
              </span>
            </div>
            <p className="text-xs text-[#aaa] mt-1.5 max-w-lg">
              {currentOutfit.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddLookToBag}
              className="w-full sm:w-auto bg-white text-black hover:bg-[#e8e8e6] shadow-xl gap-2 font-black"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Añadir las 3 Piezas a la Bolsa</span>
            </Button>

            <button
              onClick={handleAskStylistWhatsApp}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-white/20 text-white hover:bg-white/10 text-xs font-brand font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Personalizar por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
