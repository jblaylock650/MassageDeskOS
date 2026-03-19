import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Singleton Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types
export interface Profile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  license_type: string | null;
  license_number: string | null;
  license_state: string | null;
  specialties: string[] | null;
  modalities: string[] | null;
  bio: string | null;
  location: string | null;
  practice_setting: string | null;
  years_experience: number | null;
  trade_massage_available: boolean;
  website: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  images: string[] | null;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}
