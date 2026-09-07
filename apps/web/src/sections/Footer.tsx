import React from 'react';
import { ArrowUpRight, MessageCircle, ArrowUp } from 'lucide-react';
import { smoothScrollTo, scrollToTop } from '../animations/smoothScroll';

export const Footer: React.FC = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '573332874590';
  const conciergeUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hola PRESTIGE MBM, tengo una consulta sobre las prendas 200 GSM y entregas en Bogotá.'
  )}`;

  return (
    <>
      {/* Floating Concierge WhatsApp Button */}
      <aside className="fixed bottom-6 right-6 z-[9998]">
        <a
          href={conciergeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#121212] text-[#e8e8e6] px-5 py-3.5 rounded-full border border-white/20 shadow-float hover:scale-105 hover:bg-[#0d0d0d] transition-all min-h-[44px]"
          aria-label="Abrir chat de Concierge en WhatsApp Bogotá"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] shadow-[0_0_10px_#25D366] animate-pulse" />
          <span className="font-brand font-bold text-xs uppercase tracking-wider hidden sm:inline">
            CONCIERGE BOGOTÁ • WHATSAPP
          </span>
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
        </a>
      </aside>

      {/* Main Brand Footer */}
      <footer className="bg-[#0e0e0d] text-[#e8e8e6] pt-20 pb-12 px-5 md:px-10 mt-28 border-t border-white/10 relative">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Brand Monogram & Official Horse Mark */}
          <div className="w-24 h-24 mb-3 flex items-center justify-center filter drop-shadow-lg">
            <img
              src="/assets/branding/prestige-official-logo.svg"
              alt="Isotipo Oficial PRESTIGE MBM"
              className="w-full h-full object-contain"
            />
          </div>

          <span className="font-brand font-black text-3xl tracking-tighter text-white">
            PRESTIGE
          </span>
          <span className="font-brand font-bold text-xs tracking-[0.3em] text-[#b7b79e] mt-0.5">
            MBM • BOGOTÁ
          </span>

          {/* Exclusivity Statement */}
          <blockquote className="font-brand font-bold text-lg sm:text-xl md:text-2xl text-[#f0f0ee] max-w-2xl my-8 leading-snug uppercase">
            “LA VERDADERA EXCLUSIVIDAD NO ES PAGAR DE MÁS POR UN LOGO; ES PORTAR UNA PRESENCIA QUE NADIE MÁS PUEDE COMPRAR.”
          </blockquote>

          {/* Official Social Links */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <a
              href="https://www.tiktok.com/@prestigembm?_r=1&_t=ZS-99NtA6PjWbt"
              target="_blank"
              rel="noopener noreferrer"
              className="font-brand font-bold text-xs uppercase px-5 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
            >
              <span>TikTok @prestigembm</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/prestigembm?igsi=MTl3cWVmYXN0cHR0bQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-brand font-bold text-xs uppercase px-5 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
            >
              <span>Instagram @prestigembm</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={conciergeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-brand font-bold text-xs uppercase px-5 py-2.5 rounded-full border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-all flex items-center gap-1.5"
            >
              <span>WhatsApp +57 333 287 4590</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Secondary Quick Links with Smooth Gliding Navigation */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-[#888] mb-10 font-medium">
            <button
              onClick={() => smoothScrollTo('#catalogo')}
              className="hover:text-white transition-colors"
            >
              Drops Disponibles
            </button>
            <button
              onClick={() => smoothScrollTo('#comparador')}
              className="hover:text-white transition-colors"
            >
              Simulador de Ahorro
            </button>
            <button
              onClick={() => smoothScrollTo('#atelier')}
              className="hover:text-white transition-colors"
            >
              Atelier Privé MBM
            </button>
            <span className="text-[#555]">•</span>
            <span>Envíos 24H en Bogotá</span>
            <span>Pagos Nequi / PSE / Transferencia</span>
          </div>

          {/* Back to Top Floating Trigger */}
          <button
            onClick={() => scrollToTop(false)}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white text-xs font-brand font-bold uppercase tracking-wider transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Volver Arriba</span>
          </button>

          {/* Legal Bar */}
          <div className="w-full pt-8 border-t border-white/10 text-xs text-[#777] flex flex-col sm:flex-row justify-between items-center gap-3">
            <span>© 2026 PRESTIGE MBM. Bogotá D.C., Colombia. Todos los derechos reservados.</span>
            <span>Confección nacional 200 GSM • Cero intermediarios.</span>
          </div>
        </div>
      </footer>
    </>
  );
};
