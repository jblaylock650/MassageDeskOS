/// <reference types="vite/client" />

declare const __BASE_PATH__: string;
declare const __IS_PREVIEW__: boolean;
declare const __READDY_PROJECT_ID__: string;
declare const __READDY_VERSION_ID__: string;
declare const __READDY_AI_DOMAIN__: string;

interface ImportMetaEnv {
  readonly VITE_STRIPE_STARTER_PAYMENT_LINK?: string;
  readonly VITE_STRIPE_PROFESSIONAL_PAYMENT_LINK?: string;
  readonly VITE_STRIPE_STUDIO_PAYMENT_LINK?: string;
  readonly VITE_MASSAGEDESKOS_SUPPORT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
