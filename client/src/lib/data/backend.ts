import type { BackendProvider } from "@/lib/data/types";

/**
 * Central backend configuration. Swap VITE_BACKEND_PROVIDER to "supabase"
 * or "firebase" once credentials are set — service modules read this config.
 */
export const backendConfig = {
  provider: (import.meta.env.VITE_BACKEND_PROVIDER ?? "local") as BackendProvider,

  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL ?? "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
  },

  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  },

  admin: {
    email: import.meta.env.VITE_ADMIN_EMAIL ?? "admin@portfolio.local",
    password: import.meta.env.VITE_ADMIN_PASSWORD ?? "changeme",
  },
} as const;

export function isSupabaseConfigured(): boolean {
  return Boolean(backendConfig.supabase.url && backendConfig.supabase.anonKey);
}

export function isFirebaseConfigured(): boolean {
  return Boolean(
    backendConfig.firebase.apiKey &&
      backendConfig.firebase.authDomain &&
      backendConfig.firebase.projectId
  );
}
