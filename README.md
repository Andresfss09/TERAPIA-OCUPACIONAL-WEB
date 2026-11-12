# 🌿 Página Web Profesional de Terapia Ocupacional • Luisa Restrepo (Cali, Colombia)

Sitio web moderno, cálido, femenino y profesional diseñado para el consultorio de Terapia Ocupacional de **Luisa Fernanda Restrepo** en Cali, Colombia.

Permite que pacientes y familias conozcan las especialidades clínicas, exploren las instalaciones, lean testimonios reales y **agenden citas directamente en tiempo real sin requerir registro ni inicio de sesión**, bloqueando los horarios en la base de datos y notificando a Luisa por WhatsApp en 1 solo clic.

---

## ✨ Características Principales

1. **Estética Cálida & Femenina ("Cute" pero Médica y Profesional):**
   - Paleta de colores pastel: Lavanda suave, Rosa palo (*blush*), Verde salvia, Blanco hueso y acentos en Terracota y Dorado.
   - Tipografía editorial elegante: Serif suave (*Playfair Display*) para títulos y Sans-serif limpia (*Plus Jakarta Sans*) para lectura ágil.
   - Microanimaciones suaves, tarjetas flotantes con efecto vidrio (*glassmorphism*) y sombras envolventes.

2. **Sistema de Agendamiento en 3 Pasos (Sin Login):**
   - **Paso 1:** Selección de la especialidad clínica (con duración estimada y precio de referencia).
   - **Paso 2:** Selección de fecha y horario disponible. El sistema consulta en tiempo real los horarios ocupados y **bloquea visual y lógicamente los slots ya tomados** para evitar cruces entre distintos pacientes.
   - **Paso 3:** Formulario amigable con validación de teléfono WhatsApp (+57 Colombia), nombre y motivo de consulta.
   - Pantalla de confirmación con animación de celebración (*confetti*), resumen de cita y botón automático para abrir WhatsApp con el mensaje estructurado para Luisa.

3. **Integración con WhatsApp:**
   - Enlace `wa.me` optimizado con mensaje pre-rellenado con emojis y formato legible.
   - Botón flotante siempre visible para consultas rápidas.

4. **Calificaciones y Reseñas sin Login:**
   - Pacientes pueden calificar con estrellas (1 a 5) y dejar su reseña.
   - Filtro por estrellas y cálculo dinámico del promedio de satisfacción tanto general como por cada especialidad.
   - Validación anti-spam incluida.

5. **Galería Multimedia:**
   - Fotos y videos del consultorio, materiales didácticos, adaptaciones para la vida diaria y dinámicas terapéuticas con *lazy loading*.

6. **Localización y Contacto en Cali:**
   - Mapa interactivo de Cali (Sector Salud: San Fernando / Tequendama).
   - Formulario de consulta rápida directo a WhatsApp.

---

## 🚀 Cómo Ejecutar el Proyecto en Local

### 1. Requisitos
- Node.js v18+ instalado.

### 2. Instalar Dependencias
```bash
pnpm install
# o con npm:
# npm install
```

### 3. Iniciar el Servidor de Desarrollo
```bash
pnpm run dev
# o con npm:
# npm run dev
```
Abre en tu navegador la dirección indicada (usualmente `http://localhost:5173`).

### 4. Compilar para Producción
```bash
pnpm run build
```

---

## 🗄️ Conexión con Base de Datos en la Nube (Opcional - Supabase)

El sitio funciona **100% interactivo de inmediato**, guardando y bloqueando citas en tiempo real mediante *LocalStorage* sincronizado con *BroadcastChannel* entre pestañas.

Si deseas que las citas queden guardadas en una base de datos en la nube accesible desde cualquier celular o computador:

1. Crea un proyecto gratuito en [Supabase](https://supabase.com).
2. Ve al **SQL Editor** de Supabase y pega el contenido del archivo [`supabase_schema.sql`](./supabase_schema.sql). Haz clic en **Run**.
3. Copia tu `Project URL` y tu `anon public key` desde *Project Settings > API*.
4. Crea un archivo `.env` en la raíz del proyecto con tus credenciales:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
   ```
5. ¡Listo! La web se sincronizará automáticamente con tu base de datos en la nube.

---

## ⚙️ Dónde Personalizar la Información de Luisa

- **Datos Personales, Teléfono de WhatsApp, Dirección y Horarios:**
  [`src/data/therapistData.ts`](./src/data/therapistData.ts)
- **Especialidades, Precios, Duración y Textos:**
  [`src/data/servicesData.ts`](./src/data/servicesData.ts)
- **Fotos y Videos de la Galería:**
  [`src/data/galleryData.ts`](./src/data/galleryData.ts)
- **Reseñas Iniciales:**
  [`src/data/reviewsData.ts`](./src/data/reviewsData.ts)

---

## 🌐 Despliegue en 1 Clic (Vercel / Netlify)

1. Sube este repositorio a tu cuenta de GitHub.
2. Conecta el repositorio en [Vercel](https://vercel.com) o [Netlify](https://netlify.com).
3. Framework preset: **Vite**.
4. En caso de usar Supabase, añade las variables de entorno en el panel de Vercel/Netlify.
5. ¡Despliega en menos de 1 minuto con certificado SSL gratuito y dominio propio!
