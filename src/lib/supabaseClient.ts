import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function cleanEnv(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined
  const s = v.trim()
  // Remove surrounding single/double quotes if pasted from somewhere
  return s.replace(/^['"]/, '').replace(/['"]$/, '').trim()
}

function isValidHttpUrl(v: string): boolean {
  try {
    const u = new URL(v)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

const supabaseUrl = cleanEnv(import.meta.env.VITE_SUPABASE_URL)
const supabaseAnonKey = cleanEnv(import.meta.env.VITE_SUPABASE_ANON_KEY)

let supabase: SupabaseClient | null = null

if (supabaseUrl && supabaseAnonKey && isValidHttpUrl(supabaseUrl)) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

export function isSupabaseConfigured() {
  return Boolean(supabase)
}
