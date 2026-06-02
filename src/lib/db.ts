// ============================================
// Database helpers — Supabase (replaces Firebase Firestore)
// ============================================
import { supabase, supabaseEnabled } from './supabaseClient';

export async function createAlbumRecord(payload: {
  owner_id?: string | null;
  title: string;
  description?: string | null;
  cover_photo?: string | null;
  total_photos?: number;
}) {
  if (!supabaseEnabled || !supabase) {
    // Demo fallback
    return { id: `album_demo_${Date.now()}`, ...payload };
  }

  try {
    const { data, error } = await supabase
      .from('albums')
      .insert([{
        owner_id: payload.owner_id ?? null,
        title: payload.title,
        description: payload.description ?? null,
        cover_photo: payload.cover_photo ?? null,
        total_photos: payload.total_photos ?? 0,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('createAlbumRecord error:', error);
    return { id: `album_demo_${Date.now()}`, ...payload };
  }
}

export async function createPhotoRecord(payload: {
  album_id?: string | null;
  owner_id?: string | null;
  storage_path?: string | null;
  public_url?: string | null;
  caption?: string | null;
}) {
  if (!supabaseEnabled || !supabase) {
    // Demo fallback
    return { id: `photo_demo_${Date.now()}`, public_url: payload.public_url };
  }

  try {
    const { data, error } = await supabase
      .from('photos')
      .insert([{
        album_id: payload.album_id ?? null,
        owner_id: payload.owner_id ?? null,
        storage_path: payload.storage_path ?? null,
        public_url: payload.public_url ?? null,
        caption: payload.caption ?? null,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('createPhotoRecord error:', error);
    return { id: `photo_demo_${Date.now()}`, public_url: payload.public_url };
  }
}