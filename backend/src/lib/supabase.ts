import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://hmkhfqduwtfhprsyoeul.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJh...placeholder';

if (supabaseKey === 'eyJh...placeholder') {
  console.warn("⚠️ Warning: SUPABASE_KEY or SUPABASE_ANON_KEY is missing in your .env. File uploads to Supabase will fail! Please add it.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
