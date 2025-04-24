# Guía de Desarrollo - Stripe Store

## Configuración del Entorno de Desarrollo

### Requisitos
- Node.js 18.x o superior
- npm 9.x o superior
- Git
- Docker y Docker Compose
- VS Code (recomendado)

### Extensiones de VS Code Recomendadas
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Docker

## Estructura del Proyecto
```
src/
├── app/                    # Rutas y páginas de Next.js
├── components/            # Componentes React reutilizables
│   ├── cart/             # Componentes del carrito
│   ├── layout/           # Componentes de layout
│   └── ui/               # Componentes de UI básicos
├── styles/               # Estilos globales
└── lib/                  # Utilidades y configuraciones
```

## Convenciones de Código

### Nombrado
- Componentes: PascalCase (ej: `ProductCard.tsx`)
- Utilidades: camelCase (ej: `formatPrice.ts`)
- Estilos: kebab-case (ej: `product-card.css`)

### Estructura de Componentes
```typescript
// Importaciones
import { useState } from 'react';
import type { FC } from 'react';

// Tipos
interface Props {
  title: string;
  price: number;
}

// Componente
export const ProductCard: FC<Props> = ({ title, price }) => {
  // Estado
  const [isHovered, setIsHovered] = useState(false);

  // Renderizado
  return (
    <div className="product-card">
      <h2>{title}</h2>
      <p>${price}</p>
    </div>
  );
};
```

## Flujo de Trabajo con Git

### Ramas
- `main`: Producción
- `develop`: Desarrollo
- `feature/*`: Nuevas características
- `bugfix/*`: Correcciones de bugs
- `release/*`: Preparación de releases

### Commits
Formato: `tipo(alcance): descripción`

Tipos:
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Formato
- `refactor`: Refactorización
- `test`: Pruebas
- `chore`: Tareas de mantenimiento

### Pull Requests
1. Crear rama desde `develop`
2. Desarrollar característica
3. Crear PR a `develop`
4. Revisión de código
5. Merge después de aprobación

## Pruebas

### Unitarias
```typescript
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('renders product title and price', () => {
    render(<ProductCard title="Test Product" price={99.99} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });
});
```

### E2E
```typescript
import { test, expect } from '@playwright/test';

test('add to cart flow', async ({ page }) => {
  await page.goto('/products');
  await page.click('text=Add to Cart');
  await expect(page.locator('.cart-count')).toHaveText('1');
});
```

## Estilos

### Tailwind CSS
```typescript
// Ejemplo de componente con Tailwind
export const Button = ({ children, variant = 'primary' }) => {
  const baseStyles = 'px-4 py-2 rounded-md transition-colors';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
};
```

## API

### Endpoints
```typescript
// Ejemplo de llamada a API
const getProducts = async () => {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};
```

### Tipos
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}
```

## Despliegue Local

### Desarrollo
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Docker
```bash
# Construir imagen
docker build -t stripe-store .

# Ejecutar contenedor
docker run -p 3000:3000 stripe-store
```

## Troubleshooting

### Problemas Comunes
1. **Error de dependencias**
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Error de TypeScript**
   ```bash
   npm run type-check
   ```

3. **Error de linting**
   ```bash
   npm run lint
   ```

### Recursos Útiles
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs)
- [Documentación de React](https://reactjs.org/docs) 