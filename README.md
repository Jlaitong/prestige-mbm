# PRESTIGE MBM — Luxury Streetwear Bogotá Monorepo

> **“ALTA PRESENCIA. ACTITUD CAPITALINA. EXCLUSIVIDAD PURA.”**  
> Aplicación web integral y escalable para la marca de confección prémium y streetwear 200 GSM en Bogotá, Colombia.

---

## 1. Arquitectura del Monorepo

El proyecto está estructurado como un monorepo modular desacoplado:

```
prestige-mbm/
│
├── apps/
│   ├── web/                     # Frontend: React 18 + Vite + TypeScript + Tailwind CSS
│   │   ├── public/assets/
│   │   │   ├── branding/        # Logo del caballo, monogramas vectoriales
│   │   │   ├── products/        # Fotografías y vectores de prendas (200 GSM)
│   │   │   ├── atelier/         # Looks coordinados
│   │   │   ├── horse/           # horse-silhouette.svg, poster fallback
│   │   │   └── videos/horse/    # horse-run.mp4 / webm soporte
│   │   │
│   │   └── src/
│   │       ├── animations/      # Lenis smooth scroll, GSAP Context, ScrollTrigger
│   │       ├── components/      # UI primitives, React Bits (AccordionGallery, ScrollExpand, CardNav)
│   │       ├── sections/        # Navbar, Hero, Comparator, Catalog, Atelier, Footer
│   │       ├── pages/           # HomePage, ProductDetailPage (/products/:slug)
│   │       ├── data/            # Catálogo oficial de Bogotá y cálculo de ahorro
│   │       └── styles/          # Tokens Obsidian/Chalk, tipografías Montserrat y Outfit
│   │
│   └── api/                     # Backend: NestJS 10 + TypeScript + REST API
│       └── src/
│           ├── modules/
│           │   ├── products/    # GET /api/products, GET /api/products/:slug
│           │   ├── categories/  # GET /api/categories
│           │   ├── orders/      # POST /api/orders (validación de inventario y precios en DB)
│           │   ├── atelier/     # GET /api/atelier (looks coordinados)
│           │   ├── auth/        # JWT + bcrypt para panel de administración
│           │   └── health/      # GET /api/health
│           └── database/        # PrismaService resiliente
│
├── packages/
│   └── types/                   # Interfaces y tipos compartidos (@prestige/types)
│
├── prisma/
│   ├── schema.prisma            # Modelos PostgreSQL (Product, Category, Order, Atelier, User)
│   └── seed.ts                  # Carga de catálogo y precios oficiales de Bogotá
│
├── docker-compose.yml           # PostgreSQL 16 local
├── .env.example                 # Plantilla documentada de variables de entorno
├── pnpm-workspace.yaml          # Configuración del workspace
└── README.md
```

---

## 2. Tecnologías Utilizadas

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, GSAP 3, ScrollTrigger, Lenis Smooth Scroll, Lucide React, React Router.
* **Componentes React Bits:**
  * `AccordionGallery`: Galería expandible horizontal prémium y vista vertical móvil.
  * `ScrollExpand`: Transición continua del Hero al Manifiesto de Taller con scrub de GSAP.
  * `CardNav`: Barra de acceso rápido a Drops, Simulador, Atelier y Garantía.
  * `SpotlightCard`: Realce sutil con gradiente radial que sigue el cursor.
* **Backend:** NestJS, TypeScript, class-validator, class-transformer, Passport, JWT, bcrypt.
* **Base de Datos & ORM:** PostgreSQL 16, Prisma ORM.

---

## 3. Instalación y Puesta en Marcha

### Prerrequisitos
* Node.js >= 20
* pnpm (instalado globalmente con `npm i -g pnpm`)

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/Jlaitong/prestige-mbm.git
cd prestige-mbm
pnpm install
```

### 2. Configurar Variables de Entorno
Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

Variables clave:
* `VITE_WHATSAPP_NUMBER`: Número oficial de WhatsApp (ej: `573332874590`).
* `WHATSAPP_NUMBER`: Número oficial utilizado por el backend.
* `DATABASE_URL`: Conexión a PostgreSQL (opcional para modo catálogo estático).

### 3. Iniciar PostgreSQL (Opcional)
Si deseas utilizar la base de datos PostgreSQL local:
```bash
docker compose up -d
pnpm prisma:generate
pnpm prisma:seed
```
*(Nota: Si no inicias Docker, el backend y frontend operan de forma autónoma con los datos precargados de Bogotá sin romperse).*

### 4. Modo Desarrollo
* **Frontend Web:**
  ```bash
  pnpm dev:web
  ```
  Abre [http://localhost:5173](http://localhost:5173).

* **Backend API:**
  ```bash
  pnpm dev:api
  ```
  Activo en [http://localhost:4000/api](http://localhost:4000/api).

* **Ejecutar ambos en paralelo:**
  ```bash
  pnpm dev
  ```

---

## 4. Compilación y Producción

Para compilar todos los paquetes con validación estricta de TypeScript:
```bash
pnpm build
```

El bundle de producción del frontend se genera en `apps/web/dist/` listo para desplegar en Vercel, Netlify o cualquier CDN.

---

## 5. Guía de Mantenimiento y Personalización

### ¿Dónde agregar nuevas fotos de prendas?
Guarda tus fotografías en:
👉 `apps/web/public/assets/products/`  
(Formatos recomendados: `.webp`, `.jpg` o `.svg`).

### ¿Dónde agregar nuevos productos o cambiar precios?
Edita los datos centralizados en:
👉 `apps/web/src/data/productDefaults.ts`  
Y en el backend:
👉 `apps/api/src/common/seed-data.ts`

### ¿Dónde cambiar el número de WhatsApp comercial?
En el archivo `.env`:
```env
VITE_WHATSAPP_NUMBER="573332874590"
WHATSAPP_NUMBER="573332874590"
```
Toda la lógica de checkout utiliza la función centralizada `buildWhatsAppOrderMessage()`, por lo que cambiar la variable actualiza automáticamente el botón flotante, el carrito y el botón de compra inmediata.

### ¿Dónde controlar la escena y animación del caballo?
El componente responsable se encuentra en:
👉 `apps/web/src/components/horse/HorseScene.tsx`  
* Si cuentas con un video real en MP4/WebM, solo colócalo en:  
  `apps/web/public/assets/videos/horse/horse-run.mp4`
* El componente detecta automáticamente si el archivo existe y lo reproduce de manera sutil con autoplay muted, lazy loading y parallax con el mouse. Si no hay video, utiliza la silueta vectorial de alta definición sin bloquear la carga.

---

## 6. Despliegue Gratuito en Vercel

1. Sube tu monorepo a GitHub:
   ```bash
   git add .
   git commit -m "feat: PRESTIGE MBM Luxury Streetwear Web Application"
   git push origin main
   ```
2. En **Vercel**:
   * Selecciona **Import** en el repositorio `prestige-mbm`.
   * En **Root Directory**: Selecciona `apps/web`.
   * Framework Preset: **Vite**.
   * Haz clic en **Deploy**.
