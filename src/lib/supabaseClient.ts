import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey);

if (!supabaseEnabled) {
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Using demo mode.');
}

export const supabase = supabaseEnabled ? createClient(supabaseUrl!, supabaseAnonKey!) : null;

export async function uploadImage(file: File, options?: { bucket?: string; folder?: string }) {
  const bucket = options?.bucket || 'images';
  const folder = options?.folder || 'uploads';
  const fileName = `${Date.now()}_${file.name.replaceAll(' ', '_')}`;
  const path = `${folder}/${fileName}`;

  if (!supabaseEnabled || !supabase) {
    // Demo fallback: return an object URL so UI can show a preview without uploading
    // Note: object URLs won't persist across reloads — for demo only.
    return URL.createObjectURL(file);
  }

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error;

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}
