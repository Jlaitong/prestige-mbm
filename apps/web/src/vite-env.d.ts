/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_BRAND_NAME?: string;
  readonly VITE_CITY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
