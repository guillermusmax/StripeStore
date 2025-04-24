"use client";
import { useCart } from "@/components/cart/cart-context";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: { id: string; quantity: number };
  type: "plus" | "minus";
}) {
  const { updateCartItem } = useCart();

  if (!updateCartItem) {
    console.error("updateCartItem no está definido en el contexto del carrito");
    return null;
  }

  return (
    <button
      className="bg-gray-200 p-1 rounded"
      onClick={() =>
        updateCartItem(item.id, type === "plus" ? item.quantity + 1 : Math.max(1, item.quantity - 1))
      }
    >
      {type === "plus" ? "+" : "-"}
    </button>
  );
}
