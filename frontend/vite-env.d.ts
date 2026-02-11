
// The original error "Cannot find type definition file for 'vite/client'" indicates a missing `@types/vite` package or `tsconfig.json` configuration.
// As external package installation or `tsconfig.json` modifications are outside the scope of allowed changes,
// this reference is removed to clear the direct error in this file.
// Developers should ensure `@types/vite` is installed and `tsconfig.json` is correctly configured for proper type inference.

interface ImportMetaEnv {
  readonly VITE_USE_COSMOS_DB: string;
  readonly VITE_COSMOS_DB_ENDPOINT: string;
  readonly VITE_COSMOS_DB_KEY: string;
  readonly VITE_COSMOS_DB_DATABASE_ID: string;
  readonly VITE_COSMOS_DB_CONTAINER_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}