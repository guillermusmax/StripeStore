"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Información de la tienda */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              StripeStore
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Tu tienda online de confianza para encontrar los mejores productos con la mejor calidad y servicio.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="text-2xl">📱</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="text-2xl">💬</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="text-2xl">📸</span>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/home" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>🏠</span>
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/product" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>🛍️</span>
                  <span>Productos</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>📑</span>
                  <span>Categorías</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Ayuda</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/faq" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>❓</span>
                  <span>Preguntas Frecuentes</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/shipping" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>🚚</span>
                  <span>Envíos</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/returns" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>↩️</span>
                  <span>Devoluciones</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <span>📧</span>
                <span>info@stripestore.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <span>📞</span>
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <span>📍</span>
                <span>123 Calle Principal, Ciudad</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} StripeStore. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
