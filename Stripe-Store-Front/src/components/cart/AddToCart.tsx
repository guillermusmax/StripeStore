"use client";

import { useCart } from "./cart-context";
import { products } from "@/components/data"; // Asegúrate de importar correctamente la data

export default function AddToCart({ product }: { product: (typeof products)[0] }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart({ ...product, id: product.id.toString(), quantity: 1 })}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
      Agregar al Carrito
    </button>
  );
}
