import React, { useState, useEffect } from 'react';
import { useCart } from '../components/cart/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { smoothScrollTo } from '../animations/smoothScroll';

export const Navbar: React.FC = () => {
  const { totalCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      smoothScrollTo(targetId);
    } else {
      navigate(`/${targetId}`);
      setTimeout(() => smoothScrollTo(targetId), 150);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#e8e8e6]/92 backdrop-blur-xl border-b border-[rgba(18,18,18,0.08)] py-3 shadow-sm'
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        {/* Brand Logo with Official Horse Mark */}
        <Link to="/" className="flex items-center gap-3.5 group" aria-label="PRESTIGE MBM Inicio">
          <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src="/assets/branding/prestige-official-logo.svg"
              alt="Logo PRESTIGE MBM"
              className="w-full h-full object-contain"
            />
          </div>
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

        {/* Desktop Navigation Links with Smooth Gliding Scroll */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          <button
            onClick={() => handleNavClick('#catalogo')}
            className="font-brand font-bold text-xs uppercase tracking-wider text-[#121212] hover:opacity-70 transition-opacity"
          >
            Drops Disponibles
          </button>
          <button
            onClick={() => handleNavClick('#comparador')}
            className="font-brand font-bold text-xs uppercase tracking-wider text-[#121212] hover:opacity-70 transition-opacity"
          >
            Taller vs. Mall
          </button>
          <button
            onClick={() => handleNavClick('#atelier')}
            className="font-brand font-bold text-xs uppercase tracking-wider text-[#121212] hover:opacity-70 transition-opacity"
          >
            Prestige IA
          </button>
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
          <button
            onClick={() => handleNavClick('#catalogo')}
            className="w-full text-left font-brand font-bold text-sm uppercase tracking-wider text-[#121212] py-2 border-b border-[rgba(18,18,18,0.04)]"
          >
            Drops Disponibles
          </button>
          <button
            onClick={() => handleNavClick('#comparador')}
            className="w-full text-left font-brand font-bold text-sm uppercase tracking-wider text-[#121212] py-2 border-b border-[rgba(18,18,18,0.04)]"
          >
            Taller vs. Mall (-$120K)
          </button>
          <button
            onClick={() => handleNavClick('#atelier')}
            className="w-full text-left font-brand font-bold text-sm uppercase tracking-wider text-[#121212] py-2"
          >
            Prestige IA
          </button>
        </div>
      )}
    </header>
  );
};
