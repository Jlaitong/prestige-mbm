import React, { useState, useEffect } from 'react';
import { useCart } from '../components/cart/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { totalCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#e8e8e6]/90 backdrop-blur-xl border-b border-[rgba(18,18,18,0.08)] py-3'
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3.5 group" aria-label="PRESTIGE MBM Inicio">
          <img
            src="/assets/branding/horse-logo.svg"
            alt="Logo Caballo PRESTIGE"
            className="w-9 h-9 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
          />
          <div className="flex flex-col">
            <span className="font-brand font-black text-2xl tracking-tighter leading-none text-[#121212]">
              PRESTIGE
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="h-[2px] w-3 bg-[#121212]" />
              <span className="font-brand font-bold text-[9px] tracking-[0.25em] text-[#121212]">
                MBM
              </span>
              <span className="h-[2px] w-3 bg-[#121212]" />
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          <a
            href="/#catalogo"
            className="font-brand font-bold text-xs uppercase tracking-wider text-[#121212] hover:opacity-70 transition-opacity"
          >
            Drops Disponibles
          </a>
          <a
            href="/#comparador"
            className="font-brand font-bold text-xs uppercase tracking-wider text-[#121212] hover:opacity-70 transition-opacity"
          >
            Taller vs. Mall
          </a>
          <a
            href="/#atelier"
            className="font-brand font-bold text-xs uppercase tracking-wider text-[#121212] hover:opacity-70 transition-opacity"
          >
            Atelier Privé
          </a>
        </nav>

        {/* Right Action: Bolsa & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative flex items-center gap-2.5 bg-[#121212] text-[#e8e8e6] px-4 py-2.5 rounded-full shadow-sm hover:scale-105 transition-transform min-h-[44px]"
            aria-label={`Bolsa de compras con ${totalCount} artículos`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-brand font-bold text-xs tracking-wider hidden sm:inline">
              BOLSA
            </span>
            <span className="w-5 h-5 bg-[#e8e8e6] text-[#121212] rounded-full flex items-center justify-center font-bold text-[10px]">
              {totalCount}
            </span>
          </button>

          {/* Hamburger button on mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[#121212] rounded-xl hover:bg-black/5"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f7f7f5] border-b border-[rgba(18,18,18,0.08)] px-5 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <a
            href="/#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-brand font-bold text-sm uppercase tracking-wider text-[#121212] py-2 border-b border-[rgba(18,18,18,0.04)]"
          >
            Drops Disponibles
          </a>
          <a
            href="/#comparador"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-brand font-bold text-sm uppercase tracking-wider text-[#121212] py-2 border-b border-[rgba(18,18,18,0.04)]"
          >
            Taller vs. Mall (-$120K)
          </a>
          <a
            href="/#atelier"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-brand font-bold text-sm uppercase tracking-wider text-[#121212] py-2"
          >
            Atelier Privé MBM
          </a>
        </div>
      )}
    </header>
  );
};
