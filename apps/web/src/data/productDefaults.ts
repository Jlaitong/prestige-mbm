import { Product, AtelierLook, SavingsComparison } from '@prestige/types';

export const DEFAULT_PRODUCTS: Product[] = [
  // --- CAMISETAS ---
  {
    id: 'prod-cam-1',
    slug: 'camiseta-hugo-blanca-xxl',
    name: 'Camiseta Hugo Blanca Talla XXL',
    description: 'Camiseta de algodón peinado prémium de alto gramaje con estampado frontal Hugo. Confección limpia y corte holgado contemporáneo.',
    details: [
      'Algodón peinado 200 GSM',
      'Cuello cerrado en rib grueso anti-deformación',
      'Estampado frontal de alta definición',
      'Hombro caído con silueta boxy'
    ],
    densityGsm: 200,
    price: 140000,
    compareAtPrice: 220000,
    badge: '200 GSM',
    categorySlug: 'camisetas' as any,
    images: [
      {
        id: 'img-cam-1',
        url: 'https://cdn.catalog-store.link/0b0c3c81adac2059597ed8a6fbe38696_photo.webp',
        altText: 'Camiseta Hugo Blanca Talla XXL — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-cam-1-xxl', productId: 'prod-cam-1', size: 'XXL', color: 'Blanco', sku: 'PBM-HUGO-XXL', stock: 6 }
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-cam-2',
    slug: 'camiseta-boss-azul-xxl',
    name: 'Camiseta Boss Azul Talla XXL',
    description: 'Camiseta Boss en tono azul petróleo intenso. Confección en algodón pesado con textura ultra suave y cuello cerrado.',
    details: [
      'Algodón pesado 200 GSM',
      'Logotipo Boss frontal en relieve sutil',
      'Tonalidad azul petróleo exclusivo',
      'Costuras reforzadas en hombros y sisa'
    ],
    densityGsm: 200,
    price: 140000,
    compareAtPrice: 240000,
    badge: '200 GSM',
    categorySlug: 'camisetas' as any,
    images: [
      {
        id: 'img-cam-2',
        url: 'https://cdn.catalog-store.link/76e9fc2b99b56a49956443e3169d2d72_photo.webp',
        altText: 'Camiseta Boss Azul Talla XXL — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-cam-2-xxl', productId: 'prod-cam-2', size: 'XXL', color: 'Azul', sku: 'PBM-BOSS-AZUL-XXL', stock: 5 }
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-cam-3',
    slug: 'camiseta-boss-negra-xl',
    name: 'Camiseta Boss Negra Talla XL',
    description: 'Pieza insignia en negro obsidian con tipografía Boss en microestampado. Estructura rígida que mantiene la presencia todo el día.',
    details: [
      'Algodón 200 GSM negro profundo',
      'Corte boxy estructurado',
      'Rib cerrado en cuello',
      'Acabado antipilling'
    ],
    densityGsm: 200,
    price: 140000,
    compareAtPrice: 240000,
    badge: 'PIEZA INSIGNIA',
    categorySlug: 'camisetas' as any,
    images: [
      {
        id: 'img-cam-3',
        url: 'https://cdn.catalog-store.link/c179cae6bb3bcb33d8619d1bc893df0f_photo.webp',
        altText: 'Camiseta Boss Negra Talla XL — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-cam-3-xl', productId: 'prod-cam-3', size: 'XL', color: 'Negro Obsidian', sku: 'PBM-BOSS-NEG-XL', stock: 8 }
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-cam-4',
    slug: 'camiseta-carolina-herrera-blanca-xl',
    name: 'Camiseta Carolina Herrera Blanca Talla XL',
    description: 'Camiseta blanca clásica con monograma CH en contraste. Elegancia urbana con confección ligera y transpirable.',
    details: [
      'Algodón peinado premium',
      'Monograma CH bordado/estampado de lujo',
      'Corte regular contemporáneo',
      'Tacto fresco ideal para el día'
    ],
    densityGsm: 190,
    price: 120000,
    compareAtPrice: 210000,
    badge: 'EDICIÓN LUXE',
    categorySlug: 'camisetas' as any,
    images: [
      {
        id: 'img-cam-4',
        url: 'https://cdn.catalog-store.link/f51df3ddfc40ebbf27b6b3e52bf144fd_photo.webp',
        altText: 'Camiseta Carolina Herrera Blanca Talla XL — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-cam-4-xl', productId: 'prod-cam-4', size: 'XL', color: 'Blanco', sku: 'PBM-CH-BLA-XL', stock: 4 }
    ],
    isAvailable: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-cam-5',
    slug: 'camiseta-coach-blanca-xl',
    name: 'Camiseta Coach Blanca Talla XL',
    description: 'Diseño minimalista con emblema Coach en tonos oscuros sobre base blanca marfil.',
    details: [
      'Algodón denso 200 GSM',
      'Cuello cerrado resistente',
      'Corte suelto y cómodo',
      'Despacho inmediato en Bogotá'
    ],
    densityGsm: 200,
    price: 140000,
    compareAtPrice: 230000,
    badge: '200 GSM',
    categorySlug: 'camisetas' as any,
    images: [
      {
        id: 'img-cam-5',
        url: 'https://cdn.catalog-store.link/177d566f149651475efa375c53c02f3b_photo.webp',
        altText: 'Camiseta Coach Blanca Talla XL — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-cam-5-xl', productId: 'prod-cam-5', size: 'XL', color: 'Blanco', sku: 'PBM-COACH-XL', stock: 4 }
    ],
    isAvailable: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-cam-6',
    slug: 'camiseta-boss-roja-xl',
    name: 'Camiseta Boss Roja Talla XL',
    description: 'Tono rojo rubí enérgico con tipografía Boss frontal. Confección de alta presencia para destacar en la ciudad.',
    details: [
      'Algodón reactivo que no decolora',
      'Gramaje pesado 200 GSM',
      'Silueta street contemporánea',
      'Caída recta impecable'
    ],
    densityGsm: 200,
    price: 140000,
    compareAtPrice: 220000,
    badge: '200 GSM',
    categorySlug: 'camisetas' as any,
    images: [
      {
        id: 'img-cam-6',
        url: 'https://cdn.catalog-store.link/6ed0774ca2dfa1756cc95a2eba213c4a_photo.webp',
        altText: 'Camiseta Boss Roja Talla XL — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-cam-6-xl', productId: 'prod-cam-6', size: 'XL', color: 'Rojo Rubí', sku: 'PBM-BOSS-ROJ-XL', stock: 5 }
    ],
    isAvailable: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // --- GORRAS ---
  {
    id: 'prod-gor-1',
    slug: 'gorra-belica-piedreria-cruces-doradas',
    name: 'Gorra Bélica en Pedrería con Cruces en Acero Doradas',
    description: 'Diseño exclusivo con incrustaciones de pedrería fina y cruces de acero dorado inoxidable. Estructura rígida de alto impacto visual.',
    details: [
      'Pedrería fijada con prensa térmica de alta resistencia',
      'Cruces en acero quirúrgico doradas',
      'Visera curva con textura prémium',
      'Broche metálico ajustable'
    ],
    densityGsm: 300,
    price: 95000,
    compareAtPrice: 160000,
    badge: 'EDICIÓN ESPECIAL',
    categorySlug: 'gorras' as any,
    images: [
      {
        id: 'img-gor-1',
        url: 'https://cdn.catalog-store.link/ddc326263f4615743b00fcb113f3ed0a_photo.webp',
        altText: 'Gorra Bélica en Pedrería con Cruces Doradas — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-gor-1', productId: 'prod-gor-1', size: 'Ajustable', color: 'Negro / Dorado', sku: 'PBM-GOR-CRUCES', stock: 6 }
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-gor-2',
    slug: 'gorra-belica-negra-777-gamuza',
    name: 'Gorra Bélica Negra 777 en Gamuza',
    description: 'Acabado en gamuza suave color negro azabache con parche bordado 777 de la suerte en alto relieve.',
    details: [
      'Gamuza suave prémium al tacto',
      'Bordado 777 en 3D de alta densidad',
      'Copa estructurada que no pierde la forma',
      'Cierre ajustable de lujo'
    ],
    densityGsm: 280,
    price: 90000,
    compareAtPrice: 150000,
    badge: 'GAMUZA LUXE',
    categorySlug: 'gorras' as any,
    images: [
      {
        id: 'img-gor-2',
        url: 'https://cdn.catalog-store.link/4209a77fbbf424f93d269f6a0f4eeec2_photo.webp',
        altText: 'Gorra Bélica Negra 777 en Gamuza — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-gor-2', productId: 'prod-gor-2', size: 'Ajustable', color: 'Negro Gamuza', sku: 'PBM-GOR-777', stock: 8 }
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-gor-3',
    slug: 'gorra-belica-treboles-negra-gamuza',
    name: 'Gorra Bélica Tréboles Negra en Gamuza',
    description: 'Confeccionada en gamuza profunda con parches de tréboles bélicos bordados en relieve verde y blanco.',
    details: [
      'Gamuza mate anti-polvo',
      'Bordados de trébol en relieve reforzado',
      'Forro interno antitranspirante',
      'Ajuste trasero ergonómico'
    ],
    densityGsm: 280,
    price: 90000,
    compareAtPrice: 150000,
    badge: 'GAMUZA LUXE',
    categorySlug: 'gorras' as any,
    images: [
      {
        id: 'img-gor-3',
        url: 'https://cdn.catalog-store.link/035bdd4f9c5efd8626fe775d0684c109_photo.webp',
        altText: 'Gorra Bélica Tréboles Negra en Gamuza — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-gor-3', productId: 'prod-gor-3', size: 'Ajustable', color: 'Negro Gamuza', sku: 'PBM-GOR-TREB', stock: 6 }
    ],
    isAvailable: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-gor-4',
    slug: 'gorra-goorin-bros-caballo-negra',
    name: 'Gorra Goorin Bros Caballo Negra',
    description: 'La icónica silueta de camionero con el parche insigne de Caballo enmarcado en dorado sobre base negra.',
    details: [
      'Parche icónico del Caballo de Fuerza',
      'Malla transpirable en parte trasera',
      'Visera con costuras simétricas',
      'El sello de identidad de PRESTIGE MBM'
    ],
    densityGsm: 260,
    price: 70000,
    compareAtPrice: 120000,
    badge: 'CABALLO MBM',
    categorySlug: 'gorras' as any,
    images: [
      {
        id: 'img-gor-4',
        url: 'https://cdn.catalog-store.link/991083adec48d4f98dea8447b5fc97b3_photo.webp',
        altText: 'Gorra Goorin Bros Caballo Negra — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-gor-4', productId: 'prod-gor-4', size: 'Ajustable', color: 'Negro', sku: 'PBM-GOORIN-CAB-NEG', stock: 10 }
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-gor-5',
    slug: 'gorra-puma-ferrari-gris',
    name: 'Gorra Puma en Colaboración con Ferrari Gris',
    description: 'Edición Motorsport con el escudo Scuderia Ferrari metálico en el frontal sobre corona gris texturizada.',
    details: [
      'Escudo Ferrari de alta fidelidad',
      'Material liviano y de rápido secado',
      'Cierre con hebilla Puma metálica',
      'Diseño aerodinámico deportivo'
    ],
    densityGsm: 220,
    price: 70000,
    compareAtPrice: 130000,
    badge: 'MOTORSPORT',
    categorySlug: 'gorras' as any,
    images: [
      {
        id: 'img-gor-5',
        url: 'https://cdn.catalog-store.link/e88740284b970d0d41ef5d8c5e11d973_photo.webp',
        altText: 'Gorra Puma Ferrari Gris — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-gor-5', productId: 'prod-gor-5', size: 'Ajustable', color: 'Gris Ferrari', sku: 'PBM-PUMA-FER', stock: 5 }
    ],
    isAvailable: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // --- RELOJERÍA ---
  {
    id: 'prod-rel-1',
    slug: 'reloj-rolex-rojo-con-negro',
    name: 'Reloj Rolex Rojo con Negro',
    description: 'Bisel giratorio bitono rojo y negro estilo Pepsi/Coke con dial negro de alto contraste y pulso de eslabones en acero inoxidable.',
    details: [
      'Bisel giratorio cerámico bitono rojo y negro',
      'Caja y pulso en acero inoxidable macizo',
      'Lupa cíclope sobre ventana de fecha a las 3',
      'Broche desplegable de seguridad de doble traba'
    ],
    densityGsm: 350,
    price: 80000,
    compareAtPrice: 160000,
    badge: 'ALTA PRESENCIA',
    categorySlug: 'relojeria' as any,
    images: [
      {
        id: 'img-rel-1',
        url: 'https://cdn.catalog-store.link/a0b07a5b0dbdcc5f458c285c49840202_photo.webp',
        altText: 'Reloj Rolex Rojo con Negro — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-rel-1', productId: 'prod-rel-1', size: 'Ajustable Acero', color: 'Rojo / Negro', sku: 'PBM-REL-ROLEX-RN', stock: 4 }
    ],
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-rel-2',
    slug: 'reloj-tommy-hilfiger-deportivo',
    name: 'Reloj Tommy Hilfiger Deportivo',
    description: 'Reloj deportivo con pulso de silicona ergonómico y dial multifunción con los distintivos colores azul, blanco y rojo.',
    details: [
      'Pulso de silicona de alta durabilidad y comodidad',
      'Subdiales funcionales con acentos icónicos',
      'Bisel deportivo en negro mate',
      'Resistente al uso diario urbano'
    ],
    densityGsm: 250,
    price: 60000,
    compareAtPrice: 120000,
    badge: 'DEPORTIVO URBANO',
    categorySlug: 'relojeria' as any,
    images: [
      {
        id: 'img-rel-2',
        url: 'https://cdn.catalog-store.link/3f51e0fdfd7ddb0cca51138fe2c50c90_photo.webp',
        altText: 'Reloj Tommy Hilfiger Deportivo — Prestige MBM',
        isPrimary: true,
        order: 0,
      }
    ],
    variants: [
      { id: 'var-rel-2', productId: 'prod-rel-2', size: 'Silicona Ajustable', color: 'Azul / Blanco / Rojo', sku: 'PBM-REL-TOMMY', stock: 6 }
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
    subtitle: 'Reloj Rolex Rojo/Negro + Camiseta Boss Negra + Gorra Gamuza 777',
    description: 'Conjunto de alta presencia para la noche bogotana: reloj de acero bitono, camiseta de 200 GSM negro profundo y gorra en gamuza.',
    price: 280000,
    compareAtPrice: 420000,
    isPopular: true,
    imageUrl: 'https://cdn.catalog-store.link/c179cae6bb3bcb33d8619d1bc893df0f_photo.webp',
    includedItems: [
      { name: 'Camiseta Boss Negra Talla XL', description: '200 GSM algodón denso', productSlug: 'camiseta-boss-negra-xl' },
      { name: 'Gorra Bélica Negra 777 en Gamuza', description: 'Gamuza azabache con bordado 3D', productSlug: 'gorra-belica-negra-777-gamuza' },
      { name: 'Reloj Rolex Rojo con Negro', description: 'Acero macizo con bisel cerámico', productSlug: 'reloj-rolex-rojo-con-negro' }
    ]
  },
  {
    id: 'look-2',
    key: 'cold',
    title: '02 • Streetwear Capitalino Diario',
    subtitle: 'Camiseta Boss Azul + Gorra Goorin Caballo + Reloj Tommy',
    description: 'El look urbano versátil para el día a día en Bogotá con identidad de caballo y comodidad extrema.',
    price: 240000,
    compareAtPrice: 380000,
    isPopular: false,
    imageUrl: 'https://cdn.catalog-store.link/76e9fc2b99b56a49956443e3169d2d72_photo.webp',
    includedItems: [
      { name: 'Camiseta Boss Azul Talla XXL', description: 'Algodón pesado 200 GSM', productSlug: 'camiseta-boss-azul-xxl' },
      { name: 'Gorra Goorin Bros Caballo Negra', description: 'Parche icónico de caballo', productSlug: 'gorra-goorin-bros-caballo-negra' },
      { name: 'Reloj Tommy Hilfiger Deportivo', description: 'Pulso de silicona ergonómico', productSlug: 'reloj-tommy-hilfiger-deportivo' }
    ]
  },
  {
    id: 'look-3',
    key: 'minimal',
    title: '03 • Minimal White Luxe',
    subtitle: 'Camiseta Hugo Blanca + Gorra Cruces Doradas',
    description: 'Elegancia pura en blanco marfil con contraste en acero dorado para una presencia limpia e imponente.',
    price: 210000,
    compareAtPrice: 320000,
    isPopular: false,
    imageUrl: 'https://cdn.catalog-store.link/0b0c3c81adac2059597ed8a6fbe38696_photo.webp',
    includedItems: [
      { name: 'Camiseta Hugo Blanca Talla XXL', description: 'Algodón denso 200 GSM', productSlug: 'camiseta-hugo-blanca-xxl' },
      { name: 'Gorra Bélica Pedrería Cruces Doradas', description: 'Cruces en acero inoxidable', productSlug: 'gorra-belica-piedreria-cruces-doradas' }
    ]
  }
];

export function calculateSavings(units: number): SavingsComparison {
  const workshopPerUnit = 90000;
  const mallPerUnit = 180000;
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
