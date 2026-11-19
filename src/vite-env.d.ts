/// <reference types="vite/client" />

// Déclare la variable d'environnement lue par src/api/http.ts (interface : on étend le type de Vite)
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}
