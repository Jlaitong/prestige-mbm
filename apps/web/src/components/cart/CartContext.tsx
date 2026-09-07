import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem } from '@prestige/types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  buildWhatsAppOrderMessage: (customerCity?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('prestige_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('prestige_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const selectedVariant = variant || product.variants?.[0];
    const itemId = `${product.id}-${selectedVariant?.id || 'standard'}`;

    setItems((prev) => {
      const existing = prev.find((it) => it.id === itemId);
      if (existing) {
        return prev.map((it) =>
          it.id === itemId ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [...prev, { id: itemId, product, selectedVariant, quantity }];
    });

    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((it) => it.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((it) => {
          if (it.id === itemId) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);

  const buildWhatsAppOrderMessage = (customerCity: string = 'Bogotá / Colombia'): string => {
    if (items.length === 0) return '';
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '573332874590';

    const itemsText = items
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.product.name}* [Talla: ${it.selectedVariant?.size || 'Única'}] x${it.quantity} — $${(it.product.price * it.quantity).toLocaleString('es-CO')} COP`
      )
      .join('%0A');

    const message =
      `*PEDIDO TIENDA OFICIAL — PRESTIGE MBM*%0A%0A` +
      `Hola PRESTIGE MBM, quiero confirmar mi compra directa de taller:%0A%0A` +
      `${itemsText}%0A%0A` +
      `*TOTAL:* $${subtotal.toLocaleString('es-CO')} COP%0A` +
      `*Ciudad / Destino:* ${customerCity}%0A` +
      `*Densidad textil:* 200 GSM Garantizado%0A` +
      `*Despacho:* 24H Bogotá / Envíos Nacionales%0A%0A` +
      `¿Podrían indicarme los datos de transferencia para coordinar el despacho?`;

    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalCount,
        subtotal,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        buildWhatsAppOrderMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
