"use client";

import { useCart } from "@/components/cart/cart-context";
import { products } from "@/components/data";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del producto */}
        <div className="relative h-96">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-6">${product.price}</p>
          <button
            onClick={() => addToCart({ ...product, quantity: 1 })}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Agregar al Carrito
          </button>
          <Link
            href="/product"
            className="block w-full text-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← Volver a Productos
          </Link>
        </div>
      </div>
    </div>
  );
}
