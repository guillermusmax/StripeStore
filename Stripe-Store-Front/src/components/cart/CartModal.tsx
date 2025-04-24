"use client";

import { useCart } from "@/components/cart/cart-context";
import { useAuth } from "@/components/auth/auth-context";
import { useStripePayment } from "@/hooks/useStripePayment";
import StripeProvider from "@/components/payment/StripeProvider";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeCartItem, updateCartItem, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { processPayment, isProcessing, error: paymentError } = useStripePayment();
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    try {
      setError(null);
      const { clientSecret: secret } = await processPayment(cart, user?.email || '');
      setClientSecret(secret);
    } catch (err) {
      console.error('Error en el pago:', err);
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all">
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tu Carrito</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {(error || paymentError) && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
              {error || paymentError}
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce">🛒</div>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">Tu carrito está vacío</p>
                <Link
                  href="/product"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Ver Productos
                </Link>
              </div>
            ) : clientSecret ? (
              <StripeProvider clientSecret={clientSecret} />
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-200"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">${item.price}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <button
                            onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                          >
                            -
                          </button>
                          <span className="text-gray-900 dark:text-white font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">Total:</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                      isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing
                      ? "Procesando..."
                      : isAuthenticated
                      ? "Proceder al Pago"
                      : "Iniciar Sesión para Comprar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
