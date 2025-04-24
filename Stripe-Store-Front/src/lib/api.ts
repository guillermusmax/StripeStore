const API_URL = 'http://localhost:8000/api';

export const api = {
  // Productos
  products: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/products/`);
      if (!response.ok) throw new Error('Error al obtener productos');
      return response.json();
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/products/${id}/`);
      if (!response.ok) throw new Error('Error al obtener el producto');
      return response.json();
    },
  },

  // Pagos
  payments: {
    processCart: async (items: any[], email: string) => {
      const response = await fetch(`${API_URL}/process-cart-payment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, email }),
      });
      if (!response.ok) throw new Error('Error al procesar el pago');
      return response.json();
    },
  },
}; 