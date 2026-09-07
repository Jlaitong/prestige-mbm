import { Product, AtelierLook, SavingsComparison } from '@prestige/types';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'heavy-boxy-hoodie-ash',
    name: 'Heavy Boxy Hoodie Ash',
    description: 'Felpa pesada 200 GSM confeccionada con corte cuadrado boxy fit. Tonalidad ceniza con costuras reforzadas de taller.',
    details: [
      'Felpa pesada de 200 GSM con textura prémium',
      'Corte boxy estructurado de hombro caído',
      'Capota doble sin cordones para estética limpia',
      'Bolsillo frontal tipo canguro reforzado'
    ],
    densityGsm: 200,
    price: 140000,
    compareAtPrice: 240000,
    badge: '200 GSM',
    categorySlug: 'hoodies',
    images: [
      {
        id: 'img-1',
        url: '/assets/products/hoodie-ash.svg',
        altText: 'Heavy Boxy Hoodie Ash — PRESTIGE MBM Bogotá',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'v-1-s', productId: 'prod-1', size: 'S', color: 'Ceniza', sku: 'PBM-HOOD-S', stock: 8 },
      { id: 'v-1-m', productId: 'prod-1', size: 'M', color: 'Ceniza', sku: 'PBM-HOOD-M', stock: 12 },
      { id: 'v-1-l', productId: 'prod-1', size: 'L', color: 'Ceniza', sku: 'PBM-HOOD-L', stock: 10 },
      { id: 'v-1-xl', productId: 'prod-1', size: 'XL', color: 'Ceniza', sku: 'PBM-HOOD-XL', stock: 5 },
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    slug: 'boxy-tee-washed-black',
    name: 'Boxy Tee Washed Black',
    description: 'Algodón peinado 200 GSM con proceso de lavado reactivo oscuro. Cuello cerrado en rib grueso de 3.5 cm.',
    details: [
      'Algodón 100% peinado nacional',
      'Rib grueso en cuello que mantiene la forma',
      'Silueta oversize con mangas amplias',
      'Lavado reactivo que no destiñe'
    ],
    densityGsm: 200,
    price: 89000,
    compareAtPrice: 145000,
    badge: '200 GSM',
    categorySlug: 'tees',
    images: [
      {
        id: 'img-2',
        url: '/assets/products/tee-washed-black.svg',
        altText: 'Boxy Tee Washed Black — PRESTIGE MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'v-2-s', productId: 'prod-2', size: 'S', color: 'Washed Black', sku: 'PBM-TEE-S', stock: 10 },
      { id: 'v-2-m', productId: 'prod-2', size: 'M', color: 'Washed Black', sku: 'PBM-TEE-M', stock: 15 },
      { id: 'v-2-l', productId: 'prod-2', size: 'L', color: 'Washed Black', sku: 'PBM-TEE-L', stock: 12 },
      { id: 'v-2-xl', productId: 'prod-2', size: 'XL', color: 'Washed Black', sku: 'PBM-TEE-XL', stock: 6 },
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-3',
    slug: 'pantalon-cargo-wide-leg',
    name: 'Pantalón Cargo Wide-Leg',
    description: 'Dril pesado nacional con bolsillos tácticos de fuelle y corte ancho contemporáneo para movimiento fluido.',
    details: [
      'Dril pesado 100% algodón colombiano',
      'Seis bolsillos utilitarios con cierre velcro',
      'Bota recta de 24 cm para caída sobre calzado',
      'Ajuste con pasadores reforzados'
    ],
    densityGsm: 240,
    price: 155000,
    compareAtPrice: 220000,
    badge: 'DRIL PESADO',
    categorySlug: 'pantalones',
    images: [
      {
        id: 'img-3',
        url: '/assets/products/cargo-wide-leg.svg',
        altText: 'Pantalón Cargo Wide-Leg — PRESTIGE MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'v-3-28', productId: 'prod-3', size: '28', color: 'Obsidian', sku: 'PBM-CARGO-28', stock: 6 },
      { id: 'v-3-30', productId: 'prod-3', size: '30', color: 'Obsidian', sku: 'PBM-CARGO-30', stock: 10 },
      { id: 'v-3-32', productId: 'prod-3', size: '32', color: 'Obsidian', sku: 'PBM-CARGO-32', stock: 10 },
      { id: 'v-3-34', productId: 'prod-3', size: '34', color: 'Obsidian', sku: 'PBM-CARGO-34', stock: 4 },
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-4',
    slug: 'biker-jacket-matte-finish',
    name: 'Biker Jacket Matte Finish',
    description: 'Chaqueta de silueta rígida mate con cremallera metálica de doble apertura y forro térmico suave.',
    details: [
      'Estructura rígida con acabado mate antibrillo',
      'Cremallera metálica calibre 8 antioxidante',
      'Corte ceñido a la cintura estilo Bogotá nocturna',
      'Bolsillo interior oculto de seguridad'
    ],
    densityGsm: 300,
    price: 210000,
    compareAtPrice: 310000,
    badge: 'EDICIÓN LUXE',
    categorySlug: 'hoodies',
    images: [
      {
        id: 'img-4',
        url: '/assets/products/biker-jacket.svg',
        altText: 'Biker Jacket Matte Finish — PRESTIGE MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'v-4-s', productId: 'prod-4', size: 'S', color: 'Matte Black', sku: 'PBM-BIKER-S', stock: 4 },
      { id: 'v-4-m', productId: 'prod-4', size: 'M', color: 'Matte Black', sku: 'PBM-BIKER-M', stock: 7 },
      { id: 'v-4-l', productId: 'prod-4', size: 'L', color: 'Matte Black', sku: 'PBM-BIKER-L', stock: 5 },
      { id: 'v-4-xl', productId: 'prod-4', size: 'XL', color: 'Matte Black', sku: 'PBM-BIKER-XL', stock: 3 },
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEFAULT_ATELIER_LOOKS: AtelierLook[] = [
  {
    id: 'look-1',
    key: 'night',
    title: '01 • Noche Zona Rosa',
    subtitle: 'Biker Jacket Matte + Pantalón Sastre Wide',
    description: 'Dos piezas estructuradas para el frío de Bogotá y la vida nocturna de alta presencia.',
    price: 320000,
    compareAtPrice: 430000,
    isPopular: true,
    imageUrl: '/assets/products/biker-jacket.svg',
    includedItems: [
      { name: 'Biker Jacket Matte Finish', description: 'Estructura rígida mate con herrajes oscurecidos', productSlug: 'biker-jacket-matte-finish' },
      { name: 'Pantalón Sastre Wide', description: 'Caída pesada y pliegues pronunciados' }
    ]
  },
  {
    id: 'look-2',
    key: 'cold',
    title: '02 • Clima Frío Diario 200 GSM',
    subtitle: 'Heavy Hoodie Ash + Cargo Táctico',
    description: 'El uniforme capitalino por excelencia: protección térmica densa y funcionalidad urbana.',
    price: 270000,
    compareAtPrice: 360000,
    isPopular: false,
    imageUrl: '/assets/products/hoodie-ash.svg',
    includedItems: [
      { name: 'Heavy Boxy Hoodie Ash', description: 'Felpa pesada 200 GSM corte boxy fit', productSlug: 'heavy-boxy-hoodie-ash' },
      { name: 'Pantalón Cargo Wide-Leg', description: 'Dril pesado con bolsillos de fuelle', productSlug: 'pantalon-cargo-wide-leg' }
    ]
  },
  {
    id: 'look-3',
    key: 'minimal',
    title: '03 • Minimal Boxy Puro',
    subtitle: 'Boxy Tee Washed + Cargo Wide',
    description: 'Silueta pura, líneas limpias y la textura inconfundible del algodón pesado peinado.',
    price: 220000,
    compareAtPrice: 300000,
    isPopular: false,
    imageUrl: '/assets/products/tee-washed-black.svg',
    includedItems: [
      { name: 'Boxy Tee Washed Black', description: 'Algodón peinado 200 GSM cuello cerrado', productSlug: 'boxy-tee-washed-black' },
      { name: 'Pantalón Cargo Wide-Leg', description: 'Dril pesado corte recto contemporáneo', productSlug: 'pantalon-cargo-wide-leg' }
    ]
  },
];

export function calculateSavings(units: number): SavingsComparison {
  const workshopPerUnit = 140000;
  const mallPerUnit = 260000;
  const savingsPerUnit = mallPerUnit - workshopPerUnit;

  return {
    piecesCount: units,
    workshopPricePerUnit: workshopPerUnit,
    mallPricePerUnit: mallPerUnit,
    savingsPerUnit,
    totalWorkshopPrice: workshopPerUnit * units,
    totalMallPrice: mallPerUnit * units,
    totalSavings: savingsPerUnit * units,
  };
}
