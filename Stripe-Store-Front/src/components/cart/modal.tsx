"use client";
import { useCart } from "@/components/cart/cart-context";

export default function CartPage() {
  const { cart, removeCartItem } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <button onClick={() => removeCartItem(item.id)} className="text-red-500">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
