/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    // Puedes añadir más variables si las usas, por ejemplo:
    // readonly VITE_OTRA_VAR: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  