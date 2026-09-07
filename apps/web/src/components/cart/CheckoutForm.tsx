import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { useCart } from './CartContext';
import { ArrowLeft, CreditCard, Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onBack, onSuccess }) => {
  const { subtotal, items } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    department: '',
  });

  // Inject Wompi script on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateReference = () => {
    return `PRESTIGE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Wompi Widget programmatic integration
    // @ts-ignore
    if (typeof window.WidgetCheckout !== 'undefined') {
      const reference = generateReference();
      const amountInCents = subtotal * 100;
      
      // @ts-ignore
      const checkout = new window.WidgetCheckout({
        currency: 'COP',
        amountInCents: amountInCents,
        reference: reference,
        // LLAVE PÚBLICA DE PRUEBA DE WOMPI (Debes cambiarla por la tuya en Producción)
        publicKey: 'pub_test_Q5yDA9ooKq0YcXNCtAcbg5iA4iQ4y53M',
        customerData: {
          email: formData.email,
          fullName: formData.name,
          phoneNumber: formData.phone,
          phoneNumberPrefix: '+57',
          legalPersonalIdentification: '123456789'
        }
      });

      checkout.open((result: any) => {
        setLoading(false);
        const transaction = result.transaction;
        if (transaction.status === 'APPROVED') {
          console.log('Transacción exitosa', transaction);
          onSuccess();
        } else {
          console.warn('Transacción fallida o declinada', transaction);
          alert('El pago no pudo ser procesado o fue cancelado. Intenta de nuevo.');
        }
      });
    } else {
      setLoading(false);
      alert('Error cargando la pasarela de pagos. Por favor recarga la página.');
    }
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-[#eaeaea] transition-colors" type="button">
          <ArrowLeft className="w-5 h-5 text-[#121212]" />
        </button>
        <div>
          <h3 className="font-brand font-black text-xl text-[#121212]">
            Envío y Pago
          </h3>
          <span className="text-[10px] text-[#777] uppercase tracking-wider block">
            Pago Seguro con Wompi
          </span>
        </div>
      </div>

      <form onSubmit={handlePayment} className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div>
            <label className="block text-xs font-bold text-[#121212] mb-1">Nombre Completo</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white border border-[rgba(18,18,18,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="Ej: Juan Pérez"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#121212] mb-1">Email</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border border-[rgba(18,18,18,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                placeholder="juan@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#121212] mb-1">Teléfono / WhatsApp</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-[rgba(18,18,18,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                placeholder="3001234567"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#121212] mb-1">Dirección de Entrega</label>
            <input
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-white border border-[rgba(18,18,18,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="Calle 123 #45-67 Apto 8"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#121212] mb-1">Ciudad</label>
              <input
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-white border border-[rgba(18,18,18,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                placeholder="Bogotá"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#121212] mb-1">Departamento</label>
              <input
                required
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-white border border-[rgba(18,18,18,0.12)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                placeholder="Cundinamarca"
              />
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-[rgba(18,18,18,0.08)] mt-4">
          <div className="flex justify-between items-baseline mb-4">
            <span className="font-brand font-bold text-xs text-[#777] uppercase block">
              Total a Pagar
            </span>
            <span className="font-brand font-black text-2xl text-[#121212]">
              ${subtotal.toLocaleString('es-CO')} COP
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            className="gap-2 shadow-xl bg-black hover:bg-neutral-800 text-white"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Pagar Seguro con Wompi</span>
              </>
            )}
          </Button>
          
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-[#888] uppercase tracking-wider">Aceptamos: Nequi, PSE y Tarjetas</span>
          </div>
        </div>
      </form>
    </div>
  );
};
