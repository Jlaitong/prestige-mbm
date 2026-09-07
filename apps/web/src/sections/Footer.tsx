import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

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
      <footer className="bg-[#121212] text-[#e8e8e6] pt-20 pb-12 px-5 md:px-10 mt-28">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Brand Monogram */}
          <img
            src="/assets/branding/horse-logo.svg"
            alt="Isotipo PRESTIGE"
            className="w-12 h-12 invert mb-3"
          />
          <span className="font-brand font-black text-3xl tracking-tighter text-white">
            PRESTIGE
          </span>
          <span className="font-brand font-bold text-xs tracking-[0.3em] text-[#888] mt-0.5">
            MBM
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

          {/* Secondary Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#888] mb-10 font-medium">
            <a href="/#catalogo" className="hover:text-white transition-colors">Drops Disponibles</a>
            <a href="/#comparador" className="hover:text-white transition-colors">Simulador de Ahorro</a>
            <a href="/#atelier" className="hover:text-white transition-colors">Atelier Privé MBM</a>
            <span className="text-[#555]">•</span>
            <span>Envíos 24H en Bogotá</span>
            <span>Pagos Nequi / PSE / Transferencia</span>
          </div>

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
