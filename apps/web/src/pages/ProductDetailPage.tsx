import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DEFAULT_PRODUCTS } from '../data/productDefaults';
import { useCart } from '../components/cart/CartContext';
import { Badge } from '../components/common/Badge';
import { Price } from '../components/common/Price';
import { Button } from '../components/common/Button';
import { ArrowLeft, ShoppingBag, MessageCircle, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = DEFAULT_PRODUCTS.find((p) => p.slug === slug);

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 pt-32">
        <h2 className="font-brand font-black text-3xl mb-3 text-[#121212]">
          Prenda no encontrada
        </h2>
        <p className="text-sm text-[#666] mb-6">
          El drop que buscas no está disponible en este momento.
        </p>
        <Link to="/">
          <Button variant="primary">Volver al Catálogo</Button>
        </Link>
      </div>
    );
  }

  const handleBuyNowWhatsApp = () => {
    const whatsappPhone = import.meta.env.VITE_WHATSAPP_NUMBER || '573332874590';
    const text = `*COMPRA INMEDIATA — PRESTIGE MBM*%0A%0A` +
      `Hola, quiero ordenar directamente:%0A` +
      `*Prenda:* ${product.name}%0A` +
      `*Talla:* ${selectedVariant?.size || 'Única'}%0A` +
      `*Precio Taller:* $${product.price.toLocaleString('es-CO')} COP%0A` +
      `*Gramaje:* ${product.densityGsm} GSM%0A` +
      `*Ciudad:* Bogotá / Colombia.%0A%0A` +
      `¿Podrían confirmarme disponibilidad inmediata para coordinar el despacho?`;
    window.open(`https://wa.me/${whatsappPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 font-brand font-bold text-xs uppercase tracking-wider text-[#777] hover:text-[#121212] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a los Drops</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery Box */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full h-[380px] sm:h-[480px] md:h-[540px] bg-[#dededb] rounded-3xl p-8 flex items-center justify-center relative overflow-hidden squircle-card">
            <div className="absolute top-5 left-5 z-10 flex gap-2">
              <Badge variant="dark">{product.badge || `${product.densityGsm} GSM`}</Badge>
              <Badge variant="green">DISPONIBLE EN BOGOTÁ</Badge>
            </div>
            <img
              src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
              alt={product.name}
              className="w-full h-full max-h-[85%] object-contain"
            />
          </div>

          {/* Thumbnails if multiple images exist */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-20 h-20 rounded-2xl p-2 bg-[#f0f0ee] border-2 transition-all ${
                    selectedImageIndex === i ? 'border-[#121212]' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Technical Specs, Size Selector & Purchase Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-brand font-bold tracking-widest uppercase text-[#777] block mb-1">
              Confección Nacional • {product.densityGsm} GSM
            </span>
            <h1 className="font-brand font-black text-3xl sm:text-4xl text-[#121212] mb-3 leading-tight uppercase">
              {product.name}
            </h1>

            <Price
              amount={product.price}
              compareAtAmount={product.compareAtPrice}
              size="xl"
              className="mb-6"
            />

            <p className="text-sm md:text-base text-[#555] leading-relaxed mb-6 font-normal">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-brand font-bold mb-2.5">
                  <span className="uppercase text-[#333]">Selecciona tu talla:</span>
                  <span className="text-[#777]">Corte Boxy Fit</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`min-w-[48px] h-12 px-4 rounded-xl font-brand font-black text-xs uppercase transition-all ${
                          isSelected
                            ? 'bg-[#121212] text-[#e8e8e6] shadow-md scale-105'
                            : 'bg-white text-[#121212] border border-[rgba(18,18,18,0.12)] hover:bg-[#f3f3f1]'
                        }`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Technical Construction Points */}
            <div className="bg-[#f5f5f3] p-5 rounded-2xl mb-8 space-y-2 border border-[rgba(18,18,18,0.06)]">
              <span className="text-[10px] font-brand font-bold uppercase tracking-wider text-[#777] block mb-2">
                Ficha Técnica de Taller
              </span>
              {product.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#444]">
                  <Sparkles className="w-3.5 h-3.5 text-[#121212] shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[rgba(18,18,18,0.08)]">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => addItem(product, selectedVariant)}
              className="gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Añadir a la Bolsa</span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleBuyNowWhatsApp}
              className="gap-2 border-[#121212]/20 hover:bg-white"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Comprar de Inmediato por WhatsApp</span>
            </Button>

            {/* Guarantees */}
            <div className="pt-4 grid grid-cols-2 gap-3 text-[11px] text-[#777]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#121212]" />
                <span>Despacho 24H en Bogotá</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#121212]" />
                <span>Garantía de confección 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
