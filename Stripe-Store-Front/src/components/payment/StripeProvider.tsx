"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeProviderProps {
  clientSecret: string;
}

export default function StripeProvider({ clientSecret }: StripeProviderProps) {
  // Log para verificar el clientSecret
  console.log("Client secret recibido:", clientSecret);

  // Validar que el clientSecret sea válido
  if (!clientSecret || typeof clientSecret !== 'string' || clientSecret.trim() === '') {
    console.error('Client secret inválido:', clientSecret);
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error: No se pudo inicializar el pago. Por favor, intenta nuevamente.
      </div>
    );
  }

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#4F46E5',
      colorBackground: '#ffffff',
      colorText: '#1F2937',
      colorDanger: '#EF4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Input': {
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      '.Input:focus': {
        border: '1px solid #4F46E5',
        boxShadow: '0 0 0 1px #4F46E5',
      },
      '.Input--invalid': {
        border: '1px solid #EF4444',
      },
      '.Label': {
        fontWeight: '500',
        color: '#374151',
      },
      '.Error': {
        color: '#EF4444',
        fontSize: '0.875rem',
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  // Log para verificar las opciones
  console.log("Opciones de Stripe:", options);

  return (
    <div className="w-full overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Información de Pago
        </h3>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
} 