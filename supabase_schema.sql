-- ==========================================================
-- ESQUEMA SQL PARA BASE DE DATOS SUPABASE
-- Consultorio de Terapia Ocupacional Luisa Restrepo (Cali)
-- ==========================================================

-- 1. TABLA DE CITAS (Bloqueo de horarios en tiempo real)
create table if not exists citas (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  service_id text not null,
  service_name text not null,
  date date not null,
  time text not null,
  client_name text not null,
  client_phone text not null,
  client_email text,
  notes text,
  status text default 'confirmada',
  -- Restricción estricta de unicidad: impide doble agendamiento en el mismo horario
  constraint unique_booking_slot unique (date, time)
);

-- 2. TABLA DE RESEÑAS Y TESTIMONIOS
create table if not exists resenas (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  service_id text not null,
  service_name text not null,
  client_name text not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text not null,
  date text not null,
  approved boolean default true
);

-- 3. POLÍTICAS DE SEGURIDAD (Row Level Security - Sin necesidad de Login)
alter table citas enable row level security;

-- Cualquier persona puede consultar horarios ocupados para ver el calendario
create policy "Permitir lectura publica de horarios ocupados" 
  on citas for select 
  using (true);

-- Cualquier persona puede insertar una nueva cita
create policy "Permitir agendar citas publicamente" 
  on citas for insert 
  with check (true);

alter table resenas enable row level security;

-- Cualquier persona puede leer las reseñas aprobadas
create policy "Permitir lectura de resenas aprobadas" 
  on resenas for select 
  using (approved = true);

-- Cualquier persona puede publicar una reseña
create policy "Permitir enviar resenas" 
  on resenas for insert 
  with check (true);
