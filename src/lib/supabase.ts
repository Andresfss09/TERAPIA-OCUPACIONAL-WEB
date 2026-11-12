import { createClient } from '@supabase/supabase-js';

// Configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * SQL Schema for Luisa's Database (Supabase):
 * 
 * -- TABLA DE CITAS
 * create table if not exists citas (
 *   id uuid default gen_random_uuid() primary key,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null,
 *   service_id text not null,
 *   service_name text not null,
 *   date date not null,
 *   time text not null,
 *   client_name text not null,
 *   client_phone text not null,
 *   client_email text,
 *   notes text,
 *   status text default 'confirmada',
 *   constraint unique_booking_slot unique (date, time)
 * );
 * 
 * -- TABLA DE RESEÑAS
 * create table if not exists resenas (
 *   id uuid default gen_random_uuid() primary key,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null,
 *   service_id text not null,
 *   service_name text not null,
 *   client_name text not null,
 *   rating integer check (rating >= 1 and rating <= 5) not null,
 *   comment text not null,
 *   date text not null,
 *   approved boolean default true
 * );
 * 
 * -- Politicas de lectura publica y creacion sin login
 * alter table citas enable row level security;
 * create policy "Permitir ver horarios ocupados" on citas for select using (true);
 * create policy "Permitir agendar citas" on citas for insert with check (true);
 * 
 * alter table resenas enable row level security;
 * create policy "Permitir ver resenas" on resenas for select using (approved = true);
 * create policy "Permitir crear resenas" on resenas for insert with check (true);
 */
