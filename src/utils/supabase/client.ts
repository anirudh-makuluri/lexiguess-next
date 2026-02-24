import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'
import { requireSupabaseEnv } from '@/utils/supabase/env'

export function createClient() {
  const { url, key } = requireSupabaseEnv()

  return createBrowserClient<Database>(url, key)
}
