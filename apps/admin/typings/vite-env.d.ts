/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ICONIFY_API_PREFIX_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
