"use client";

import { CartProvider } from "@/components/cart/cart-context";
import { AuthProvider } from "@/components/auth/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
