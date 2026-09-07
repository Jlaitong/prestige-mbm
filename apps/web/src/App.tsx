import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLenis } from './animations/smoothScroll';
import { Navbar } from './sections/Navbar';
import { Footer } from './sections/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { Preloader } from './components/common/Preloader';
import { ScrollToTop } from './components/common/ScrollToTop';

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll
  useLenis();

  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      {/* Route scroll reset so product pages always open at the top */}
      <ScrollToTop />

      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* Subtle luxury grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
      </Routes>

      {/* Global Shopping Bag Drawer */}
      <CartDrawer />

      {/* Global Footer */}
      <Footer />
    </>
  );
};
