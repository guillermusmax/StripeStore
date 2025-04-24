"use client";

import CartModal from "@/components/cart/CartModal";
import { useAuth } from "@/components/auth/auth-context";
import { SearchBar } from "@/components/search/SearchBar";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-context";

export function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre de la tienda */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <span className="text-2xl transform group-hover:scale-110 transition-transform duration-200">🛒</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StripeStore
              </span>
            </Link>
          </div>

          {/* Barra de búsqueda */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Navegación principal */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/home"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Inicio
            </Link>
            <Link
              href="/product"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Productos
            </Link>
            <Link
              href="/categories"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Categorías
            </Link>
          </div>

          {/* Carrito y autenticación */}
          <div className="flex items-center space-x-4">
            <button
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="text-xl">🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Hola, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal del carrito */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}

export default Navbar;
