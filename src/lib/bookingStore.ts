import { Appointment, TimeSlot } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { therapistProfile } from '../data/therapistData';

const LOCAL_STORAGE_BOOKINGS_KEY = 'laura_terapia_bookings_v3';
const BROADCAST_CHANNEL_NAME = 'laura_booking_channel';

// Single admin password for Laura's Agenda Panel (can be overridden via VITE_ADMIN_PASSWORD)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'laura2026';

// Laura Rodríguez works exclusively Monday to Friday from 8:00 AM to 5:00 PM
export const STANDARD_DAILY_SLOTS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

/**
 * Formats a Date object as YYYY-MM-DD in local time (Cali, Colombia)
 * Avoids .toISOString() which shifts the date to UTC!
 */
export function formatLocalYMD(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD string safely in local time at midnight
 */
export function parseLocalYMD(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0);
}

/**
 * Converts a 12-hour slot string like "08:00 AM" or "03:00 PM" to minutes since midnight
 */
export function slotTimeToMinutes(slotTime: string): number {
  const match = slotTime.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
}

/**
 * Checks if a specific (dateStr, slotTime) has already passed according to current live time
 */
export function isSlotInPast(dateStr: string, slotTime: string, now: Date = new Date()): boolean {
  const todayStr = formatLocalYMD(now);
  if (dateStr < todayStr) return true;
  if (dateStr > todayStr) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const slotMinutes = slotTimeToMinutes(slotTime);
  return slotMinutes <= currentMinutes;
}

/**
 * Checks if a date (YYYY-MM-DD) is Saturday (6) or Sunday (0)
 * Laura works Monday (1) to Friday (5) only.
 */
export function isWeekendDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const dateObj = parseLocalYMD(dateStr);
  const day = dateObj.getDay();
  return day === 0 || day === 6;
}

export interface UpcomingWorkDay {
  dateStr: string;
  dayName: string;
  dayNum: number;
  monthName: string;
  isToday: boolean;
  fullLabel: string;
}

/**
 * Returns upcoming Monday–Friday workdays starting from TODAY (if today is Mon–Fri)
 */
export function getUpcomingWorkDays(count: number = 6, now: Date = new Date()): UpcomingWorkDay[] {
  const days: UpcomingWorkDay[] = [];
  const todayStr = formatLocalYMD(now);

  for (let i = 0; days.length < count && i < 21; i++) {
    const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const dayOfWeek = candidate.getDay();
    // Monday (1) through Friday (5) only
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateStr = formatLocalYMD(candidate);
      const isToday = dateStr === todayStr;
      const dayNameRaw = candidate
        .toLocaleDateString('es-CO', { weekday: 'short' })
        .replace('.', '');
      const monthNameRaw = candidate
        .toLocaleDateString('es-CO', { month: 'short' })
        .replace('.', '');
      const fullLabel = candidate.toLocaleDateString('es-CO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      days.push({
        dateStr,
        dayName: isToday
          ? 'HOY • ' + dayNameRaw.toUpperCase()
          : dayNameRaw.charAt(0).toUpperCase() + dayNameRaw.slice(1),
        dayNum: candidate.getDate(),
        monthName: monthNameRaw,
        isToday,
        fullLabel: fullLabel.charAt(0).toUpperCase() + fullLabel.slice(1),
      });
    }
  }
  return days;
}

/**
 * Returns today's date string if today is Mon–Fri, or next Monday if today is Sat/Sun
 */
export function getInitialBookingDate(now: Date = new Date()): string {
  const workDays = getUpcomingWorkDays(2, now);
  return workDays[0]?.dateStr || formatLocalYMD(now);
}

// Initial sample occupied slots on upcoming workdays to demonstrate real-time conflict prevention
const getInitialSampleBookings = (): Appointment[] => {
  const workDays = getUpcomingWorkDays(3, new Date());
  const firstDay = workDays[0]?.dateStr || formatLocalYMD(new Date());
  const secondDay = workDays[1]?.dateStr || firstDay;

  return [
    {
      id: 'cita-seed-1',
      serviceId: 'integracion-sensorial',
      serviceName: 'Enfoque de Integración Sensorial',
      date: secondDay,
      time: '09:00 AM',
      clientName: 'Valeria M. (Confirmada WhatsApp)',
      clientPhone: '3150001122',
      status: 'confirmada',
      source: 'admin_manual',
    },
    {
      id: 'cita-seed-2',
      serviceId: 'neurodesarrollo',
      serviceName: 'Neurodesarrollo',
      date: secondDay,
      time: '02:00 PM',
      clientName: 'Camilo S. (Confirmada WhatsApp)',
      clientPhone: '3180003344',
      status: 'confirmada',
      source: 'web',
    },
  ];
};

export class BookingManager {
  private static broadcastChannel: BroadcastChannel | null = null;
  private static listeners: Array<() => void> = [];
  private static initialized = false;

  static init() {
    if (typeof window === 'undefined' || this.initialized) return;
    this.initialized = true;

    if ('BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      this.broadcastChannel.onmessage = (event) => {
        if (event.data?.type === 'BOOKING_UPDATED') {
          this.notifyListeners();
        }
      };
    }

    // Also listen to storage events across browser tabs for instant live sync
    window.addEventListener('storage', (event) => {
      if (event.key === LOCAL_STORAGE_BOOKINGS_KEY) {
        this.notifyListeners();
      }
    });
  }

  static subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private static notifyListeners() {
    this.listeners.forEach((l) => l());
  }

  private static broadcastUpdate() {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type: 'BOOKING_UPDATED' });
    }
    this.notifyListeners();
  }

  // Verify single password for Laura's Admin Panel
  static verifyAdminPassword(inputPassword: string): boolean {
    return inputPassword.trim() === ADMIN_PASSWORD;
  }

  // Get all active bookings (from Supabase or LocalStorage)
  static async getBookings(): Promise<Appointment[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('citas')
          .select('*')
          .neq('status', 'cancelada');

        if (!error && data) {
          return data.map((item: any) => ({
            id: item.id,
            serviceId: item.service_id,
            serviceName: item.service_name,
            date: item.date,
            time: item.time,
            clientName: item.client_name,
            clientPhone: item.client_phone,
            clientEmail: item.client_email,
            notes: item.notes,
            status: item.status,
            createdAt: item.created_at,
          }));
        }
      } catch (e) {
        console.warn('Supabase fetch failed, falling back to local storage', e);
      }
    }

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      if (stored) {
        const parsed: Appointment[] = JSON.parse(stored);
        return parsed.filter((b) => b.status !== 'cancelada');
      }
      const initial = getInitialSampleBookings();
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(initial));
      return initial;
    } catch {
      return getInitialSampleBookings();
    }
  }

  // Since Laura is the sole professional, any active booking on (date, time) blocks that slot globally
  static async isSlotOccupied(date: string, time: string): Promise<boolean> {
    const bookings = await this.getBookings();
    return bookings.some((b) => b.date === date && b.time === time && b.status !== 'cancelada');
  }

  // Calculate full day availability for Laura (Monday to Friday, 8:00 AM to 5:00 PM)
  static async getDaySlots(dateStr: string): Promise<TimeSlot[]> {
    if (!dateStr || isWeekendDate(dateStr)) {
      return [];
    }

    const now = new Date();
    const bookings = await this.getBookings();
    const dayBookings = bookings.filter((b) => b.date === dateStr && b.status !== 'cancelada');

    return STANDARD_DAILY_SLOTS.map((time) => {
      const match = dayBookings.find((b) => b.time === time);
      const past = isSlotInPast(dateStr, time, now);
      return {
        time,
        available: !match && !past,
        isPast: past,
        bookedBySpecialty: match?.serviceName,
        appointmentId: match?.id,
      };
    });
  }

  // Get only FREE and FUTURE slots for a date (strictly available hours for patients)
  static async getAvailableDaySlots(dateStr: string): Promise<TimeSlot[]> {
    const allSlots = await this.getDaySlots(dateStr);
    return allSlots.filter((s) => s.available && !s.isPast);
  }

  // Book a new appointment from the web and lock the slot immediately
  static async bookAppointment(
    appointment: Appointment
  ): Promise<{ success: boolean; message?: string }> {
    if (isWeekendDate(appointment.date)) {
      return {
        success: false,
        message:
          'Laura atiende únicamente de lunes a viernes de 8:00 AM a 5:00 PM. Por favor selecciona un día hábil.',
      };
    }

    if (isSlotInPast(appointment.date, appointment.time, new Date())) {
      return {
        success: false,
        message:
          'Este horario ya pasó según la hora actual. Por favor selecciona un horario disponible más adelante.',
      };
    }

    const occupied = await this.isSlotOccupied(appointment.date, appointment.time);
    if (occupied) {
      return {
        success: false,
        message:
          'Este horario acaba de ser reservado por otro paciente. Por favor selecciona otro de los horarios libres.',
      };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('citas').insert([
          {
            service_id: appointment.serviceId,
            service_name: appointment.serviceName,
            date: appointment.date,
            time: appointment.time,
            client_name: appointment.clientName,
            client_phone: appointment.clientPhone,
            client_email: appointment.clientEmail || null,
            notes: appointment.notes || null,
            status: 'confirmada',
          },
        ]);

        if (error && error.code === '23505') {
          return {
            success: false,
            message: 'Este horario ya fue ocupado. Por favor elige otro horario libre.',
          };
        }
      } catch (err) {
        console.warn('Supabase insert failed, storing locally:', err);
      }
    }

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      const bookings: Appointment[] = stored ? JSON.parse(stored) : getInitialSampleBookings();

      // Double-check atomic lock before pushing
      const alreadyExists = bookings.some(
        (b) =>
          b.date === appointment.date &&
          b.time === appointment.time &&
          b.status !== 'cancelada'
      );
      if (alreadyExists) {
        this.broadcastUpdate();
        return {
          success: false,
          message: 'Este horario acaba de ser tomado. Por favor elige otro horario libre.',
        };
      }

      const newBooking: Appointment = {
        ...appointment,
        id: 'cita-' + Date.now(),
        createdAt: new Date().toISOString(),
        source: appointment.source || 'web',
      };
      bookings.push(newBooking);
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));

      // Notify all components & tabs immediately so the slot disappears in real time
      this.broadcastUpdate();
      return { success: true };
    } catch {
      return { success: false, message: 'Ocurrió un error al bloquear el horario.' };
    }
  }

  /**
   * ADMIN PANEL ACTION:
   * Allows Laura to manually toggle a slot between "Ocupado" and "Libre" after confirming via WhatsApp.
   */
  static async adminToggleSlot(
    date: string,
    time: string,
    serviceId: string = 'manual-whatsapp',
    serviceName: string = 'Reserva confirmada por WhatsApp',
    clientName: string = 'Paciente WhatsApp (Bloqueo Manual)'
  ): Promise<{ success: boolean; nowOccupied: boolean }> {
    const bookings = await this.getBookings();
    const existing = bookings.find(
      (b) => b.date === date && b.time === time && b.status !== 'cancelada'
    );

    if (existing) {
      if (isSupabaseConfigured && supabase && existing.id) {
        try {
          await supabase.from('citas').delete().eq('id', existing.id);
        } catch (e) {
          console.warn('Supabase delete warning:', e);
        }
      }

      const updated = bookings.filter((b) => !(b.date === date && b.time === time));
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(updated));
      this.broadcastUpdate();
      return { success: true, nowOccupied: false };
    } else {
      const manualAppointment: Appointment = {
        id: 'admin-' + Date.now(),
        serviceId,
        serviceName,
        date,
        time,
        clientName,
        clientPhone: therapistProfile.phone,
        status: 'confirmada',
        source: 'admin_manual',
        createdAt: new Date().toISOString(),
      };

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('citas').insert([
            {
              service_id: manualAppointment.serviceId,
              service_name: manualAppointment.serviceName,
              date: manualAppointment.date,
              time: manualAppointment.time,
              client_name: manualAppointment.clientName,
              client_phone: manualAppointment.clientPhone,
              status: 'confirmada',
            },
          ]);
        } catch (e) {
          console.warn('Supabase admin insert warning:', e);
        }
      }

      const updated = [...bookings, manualAppointment];
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(updated));
      this.broadcastUpdate();
      return { success: true, nowOccupied: true };
    }
  }

  // Generate WhatsApp Direct Deep Link to 3185753889 (573185753889)
  static generateWhatsAppUrl(appointment: Appointment): string {
    const phone = therapistProfile.whatsappNumber; // 573185753889

    let formattedDate = appointment.date;
    try {
      const dateObj = parseLocalYMD(appointment.date);
      formattedDate = dateObj.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    } catch {
      formattedDate = appointment.date;
    }

    const message = `Hola Laura, quiero confirmar mi reserva de Terapia Ocupacional desde tu página web:

• *Especialidad:* ${appointment.serviceName}
• *Fecha elegida:* ${formattedDate}
• *Horario elegido:* ${appointment.time}
• *Paciente / Acudiente:* ${appointment.clientName}
• *WhatsApp de contacto:* ${appointment.clientPhone}${
      appointment.notes ? `\n• *Motivo / Notas:* ${appointment.notes}` : ''
    }

El horario (${appointment.time}) ya quedó bloqueado en la agenda web. Quedo atento(a) para confirmar mi cita. ¡Muchas gracias!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }
}

BookingManager.init();
