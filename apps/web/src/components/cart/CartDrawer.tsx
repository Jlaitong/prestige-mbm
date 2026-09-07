import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { CheckoutForm } from './CheckoutForm';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, buildWhatsAppOrderMessage } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form'>('cart');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCheckoutStep('cart'), 300); // Reset after animation
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const handleWhatsAppSupport = () => {
    const url = buildWhatsAppOrderMessage();
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleSuccessPayment = () => {
    alert("¡Pago exitoso! Te enviaremos un correo con los detalles.");
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer panel */}
      <aside
        className="relative z-10 w-full max-w-md bg-[#f7f7f5] h-full shadow-2xl flex flex-col p-6 sm:p-8 animate-in slide-in-from-right duration-300"
        aria-label="Bolsa de pedidos"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[rgba(18,18,18,0.08)]">
          <div>
            <span className="text-[10px] font-brand tracking-widest text-[#777] uppercase block">
              Bolsa Oficial
            </span>
            <h3 className="font-brand font-black text-2xl text-[#121212]">
              Tus Prendas
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl text-[#121212] hover:bg-[#eaeaea] transition-colors"
            aria-label="Cerrar bolsa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item list */}
        {checkoutStep === 'cart' ? (
          <div className="flex-1 overflow-y-auto py-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <span className="font-brand font-black text-xl text-[#888] mb-2">
                  Tu bolsa está vacía
                </span>
                <p className="text-xs text-[#777] max-w-xs mb-6">
                  Descubre los drops de confección nacional 200 GSM y añade tu pieza favorita.
                </p>
                <Button variant="outline" size="sm" onClick={closeCart}>
                  Explorar Drops
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="squircle-card p-4 bg-white flex items-center justify-between gap-4"
                >
                  <div className="w-16 h-16 bg-[#f0f0ee] rounded-xl flex items-center justify-center shrink-0">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-brand font-black text-xs text-[#121212] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#777] block mt-0.5">
                      Talla {item.selectedVariant?.size || 'Única'} • 200 GSM
                    </span>
                    <span className="font-brand font-bold text-xs text-[#121212] mt-1 block">
                      ${(item.product.price * item.quantity).toLocaleString('es-CO')} COP
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#999] hover:text-red-600 transition-colors p-1"
                      aria-label={`Eliminar ${item.product.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-[rgba(18,18,18,0.12)] rounded-lg bg-[#fafafa]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-[#555] hover:text-black"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-[#555] hover:text-black"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-hidden py-2">
            <CheckoutForm 
              onBack={() => setCheckoutStep('cart')} 
              onSuccess={handleSuccessPayment}
            />
          </div>
        )}

        {/* Footer with subtotal and WhatsApp checkout */}
        {items.length > 0 && checkoutStep === 'cart' && (
          <div className="pt-5 border-t border-[rgba(18,18,18,0.08)] space-y-4">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-brand font-bold text-xs text-[#777] uppercase block">
                  Subtotal Taller
                </span>
                <span className="text-[10px] text-[#888]">
                  Despacho 24H Bogotá
                </span>
              </div>
              <span className="font-brand font-black text-2xl text-[#121212]">
                ${subtotal.toLocaleString('es-CO')} COP
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setCheckoutStep('form')}
              className="gap-2 shadow-xl bg-black hover:bg-neutral-800 text-white"
            >
              <span>Proceder al Pago Seguro</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <button 
              onClick={handleWhatsAppSupport}
              className="w-full flex justify-center items-center gap-2 text-xs font-bold text-[#555] hover:text-black transition-colors py-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tengo dudas, quiero asesoría por WhatsApp</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
