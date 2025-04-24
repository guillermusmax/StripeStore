'use server';

import { revalidateTag } from 'next/cache';

// Define un tipo de producto
type CartItem = {
    id: string;
    quantity: number;
};

// Aplica el tipo a cart
let cart: CartItem[] = []; // ✅ Ahora cart tiene un tipo definido

export async function addItem(selectedVariantId: string | undefined) {  // ✅ Eliminamos prevState
    if (!selectedVariantId) {
        return 'Error adding item to cart';
    }

    try {
        // Simula agregar un producto al carrito
        const product: CartItem = {
            id: selectedVariantId,
            quantity: 1,
        };
        cart.push(product);
        revalidateTag("cart"); // Revalida el estado del carrito
    } catch (e) {
        return 'Error adding item to cart';
    }
}

export async function removeItem(merchandiseId: string) {  // ✅ Eliminamos prevState
    try {
        cart = cart.filter((item) => item.id !== merchandiseId);
        revalidateTag("cart");
    } catch (e) {
        return 'Error removing item from cart';
    }
}

export async function updateItemQuantity(payload: { merchandiseId: string; quantity: number; }) {  // ✅ Eliminamos prevState
    const { merchandiseId, quantity } = payload;

    try {
        cart = cart.map((item) =>
            item.id === merchandiseId ? { ...item, quantity } : item
        );
        revalidateTag("cart");
    } catch (e) {
        console.error(e);
        return 'Error updating item quantity';
    }
}
