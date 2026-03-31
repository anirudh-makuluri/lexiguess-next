// Dummy Supabase config placeholders
const SUPABASE_URL = "https://example-project.supabase.co";
const SUPABASE_KEY = "dummy-supabase-anon-key";

export function requireSupabaseEnv(): { url: string; key: string } {
  return { url: SUPABASE_URL, key: SUPABASE_KEY };
}
