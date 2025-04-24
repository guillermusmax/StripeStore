"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "electronics",
    name: "Electrónica",
    description: "Los últimos gadgets y dispositivos electrónicos",
    image: "/images/smartphone.jpg",
    productCount: 24,
  },
  {
    id: "computers",
    name: "Computadoras",
    description: "Laptops y equipos de cómputo de última generación",
    image: "/images/laptop.jpg",
    productCount: 18,
  },
  {
    id: "audio",
    name: "Audio",
    description: "Auriculares y equipos de sonido de alta calidad",
    image: "/images/headphones.jpg",
    productCount: 15,
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Dispositivos portátiles y relojes inteligentes",
    image: "/images/smartwatch.jpg",
    productCount: 12,
  }
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nuestras Categorías</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Explora nuestra amplia selección de productos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/product?category=${category.id}`}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    {category.productCount} productos
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 group-hover:underline">
                    Ver productos →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Explora todos nuestros productos o contáctanos para más información
        </p>
        <Link
          href="/product"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-200 transform hover:scale-105"
        >
          Ver Todos los Productos
        </Link>
      </div>
    </div>
  );
}