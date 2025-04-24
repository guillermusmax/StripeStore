"use client";
import { useCart } from "@/components/cart/cart-context";

export function DeleteItemButton({ item }: { item: { id: string } }) {
  const { removeCartItem } = useCart();

  return (
    <button
      className="text-red-500"
      onClick={() => removeCartItem(item.id)}
    >
      X
    </button>
  );
}
