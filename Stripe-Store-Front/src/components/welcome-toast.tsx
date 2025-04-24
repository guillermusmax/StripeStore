"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export function WelcomeToast() {
  useEffect(() => {
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=1")) {
      toast("🛍️ ¡Bienvenido a nuestra tienda!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=1; max-age=31536000; path=/";
        },
        description: (
          <>
            Explora nuestros productos y encuentra lo mejor para ti.{" "}
            <Link href="/" className="text-blue-600 hover:underline">
        Ver catálogo
      </Link>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
