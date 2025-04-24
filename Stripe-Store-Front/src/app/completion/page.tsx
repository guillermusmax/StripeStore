"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CompletionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"success" | "processing" | "error">("processing");

  useEffect(() => {
    const redirectStatus = searchParams.get("redirect_status");
    
    if (redirectStatus === "succeeded") {
      setStatus("success");
      // Redirigir a la página principal después de 5 segundos
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } else if (redirectStatus === "failed") {
      setStatus("error");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
        {status === "success" && (
          <>
            <div className="text-6xl mb-4 animate-bounce">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¡Pago Completado!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Gracias por tu compra. Serás redirigido a la página principal en unos segundos.
            </p>
          </>
        )}

        {status === "processing" && (
          <>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Procesando Pago
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Por favor, espera mientras confirmamos tu pago...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Error en el Pago
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Lo sentimos, hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
            </p>
          </>
        )}

        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Volver a la Tienda
        </Link>
      </div>
    </div>
  );
} 