"use client";

import { ProductCarousel } from "@/components/carousel";
import { ThreeItemGrid } from "@/components/grid/ThreeItemGrid";
import { WelcomeToast } from "@/components/welcome-toast";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/laptop.jpg"
            alt="Hero Background"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative z-10 text-center text-white space-y-8 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Bienvenido a StripeStore
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-200">
            Descubre nuestra colección de productos exclusivos con la mejor calidad y precio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/product"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              Ver Productos
            </Link>
            <Link
              href="/categories"
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              Explorar Categorías
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Categorías Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Electrónica", image: "/images/smartphone.jpg" },
              { name: "Computadoras", image: "/images/laptop.jpg" },
              { name: "Audio", image: "/images/headphones.jpg" },
              { name: "Wearables", image: "/images/smartwatch.jpg" }
            ].map((category) => (
              <div
                key={category.name}
                className="relative h-64 rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Productos Destacados</h2>
          <ThreeItemGrid />
        </div>
      </section>

      {/* Product Carousel */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Novedades</h2>
          <ProductCarousel />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para comprar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explora nuestra colección y encuentra los mejores productos con las mejores ofertas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/product"
              className="inline-block bg-white text-blue-600 font-medium py-4 px-8 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              Comprar Ahora
            </Link>
            <Link
              href="/categories"
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              Ver Categorías
            </Link>
          </div>
        </div>
      </section>

      <WelcomeToast />
    </div>
  );
}
