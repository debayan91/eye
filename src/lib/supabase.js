import { createClient } from '@supabase/supabase-js';

// ⚠️ IMPORTANT: Create a .env file in the project root with these values:
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key
// VITE_ADMIN_PASSWORD=your-admin-password

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '⚠️ Supabase credentials not configured. Admin features will not work.\n' +
        'Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
    );
}

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Admin password from environment
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
    return supabase !== null;
};
