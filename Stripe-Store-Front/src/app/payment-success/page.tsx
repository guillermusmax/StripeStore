"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Limpiar el carrito después de un pago exitoso
    const clearCart = async () => {
      try {
        // Aquí podrías hacer una llamada al backend para limpiar el carrito
        // o usar el contexto del carrito para limpiarlo localmente
      } catch (error) {
        console.error("Error al limpiar el carrito:", error);
      }
    };

    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ¡Pago Exitoso!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Gracias por tu compra. Hemos procesado tu pago correctamente.
        </p>
        <div className="space-y-4">
          <Link
            href="/product"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continuar Comprando
          </Link>
          <Link
            href="/"
            className="block w-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
} 