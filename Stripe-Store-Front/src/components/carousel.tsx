"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/components/data"; // Importamos tus productos

export function ProductCarousel() {
  if (!products.length) return null;

  // Duplicar los productos para hacer un loop infinito en el carrusel
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-6">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}-${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link 
              href={`/product/${product.id}`} 
              className="relative h-full w-full group"
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  priority={i < products.length}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-200">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
