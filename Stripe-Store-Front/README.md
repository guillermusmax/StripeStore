# Stripe Store - E-commerce Platform

## Descripción
Stripe Store es una plataforma de comercio electrónico moderna construida con Next.js, React y TailwindCSS. El proyecto implementa las mejores prácticas de DevOps, automatización y despliegue en la nube.

## Características
- 🛍️ Catálogo de productos con imágenes
- 🛒 Carrito de compras
- 👤 Autenticación de usuarios
- 💳 Integración con Stripe para pagos
- 🌙 Modo oscuro
- 📱 Diseño responsive

## Requisitos
- Node.js 18.x o superior
- npm 9.x o superior
- Docker y Docker Compose
- Git

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/stripe-store.git
cd stripe-store
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto
```
Stripe-Store/
├── .github/                    # Configuración de GitHub Actions
├── .gitlab/                    # Configuración de GitLab CI
├── docs/                       # Documentación del proyecto
│   ├── architecture/          # Documentación de arquitectura
│   ├── deployment/            # Guías de despliegue
│   └── development/           # Guías de desarrollo
├── src/                       # Código fuente
│   ├── app/                   # Aplicación Next.js
│   ├── components/            # Componentes React
│   └── styles/                # Estilos
├── tests/                     # Pruebas
│   ├── unit/                 # Pruebas unitarias
│   └── integration/          # Pruebas de integración
├── infrastructure/            # Infraestructura como código
│   ├── terraform/            # Configuración de Terraform
│   └── kubernetes/           # Manifiestos de Kubernetes
├── scripts/                   # Scripts de automatización
├── .gitignore                # Archivos ignorados por Git
├── docker-compose.yml        # Configuración de Docker Compose
├── Dockerfile                # Configuración de Docker
├── package.json              # Dependencias de Node.js
└── README.md                 # Documentación principal
```

## Scripts Disponibles
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia la aplicación en modo producción
- `npm run test` - Ejecuta las pruebas
- `npm run lint` - Ejecuta el linter

## Contribución
1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto
Tu Nombre - [@tutwitter](https://twitter.com/tutwitter)
Email - tu@email.com
