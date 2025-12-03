/**
 * Get the redirect URL based on the current environment
 */
export const getRedirectUrl = (path: string = "/dashboard"): string => {
  const currentUrl = window.location.origin;

  // In development (localhost)
  if (currentUrl.includes("localhost")) {
    return `${currentUrl}${path}`;
  }

  // In production (Vercel)
  if (currentUrl.includes("vercel.app")) {
    return `${currentUrl}${path}`;
  }

  // Fallback
  return `${currentUrl}${path}`;
};

export const getEnvironment = (): "development" | "production" => {
  return import.meta.env.MODE === "development" ? "development" : "production";
};

export const getSupabaseUrl = (): string => {
  return import.meta.env.VITE_SUPABASE_URL;
};

export const getSupabaseAnonKey = (): string => {
  return import.meta.env.VITE_SUPABASE_ANON_KEY;
};
