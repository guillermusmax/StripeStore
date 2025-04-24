import { useState } from 'react';
import { api } from '@/lib/api';

export const useStripePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (items: any[], email: string) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Obtener el clientSecret del backend
      const { clientSecret } = await api.payments.processCart(items, email);
      return { clientSecret };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processPayment,
    isProcessing,
    error,
  };
}; 