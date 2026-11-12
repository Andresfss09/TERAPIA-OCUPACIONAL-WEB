import { Review } from '../types';
import { initialReviews } from '../data/reviewsData';
import { supabase, isSupabaseConfigured } from './supabase';

const LOCAL_STORAGE_REVIEWS_KEY = 'laura_terapia_reviews_v2';
const LOCAL_STORAGE_REVIEW_EMAIL_LOG_KEY = 'laura_reviews_email_audit_v2';
const REVIEWS_CHANNEL_NAME = 'laura_reviews_channel';

const DISPOSABLE_OR_FAKE_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'yopmail.com',
  'guerrillamail.com',
  'sharklasers.com',
  'trashmail.com',
  'getnada.com',
  'test.com',
  'example.com',
  'correo.com',
  'ejemplo.com',
  'fake.com',
  'asdf.com',
  'qwerty.com',
]);

export class ReviewsManager {
  private static broadcastChannel: BroadcastChannel | null = null;
  private static listeners: Array<() => void> = [];
  private static pendingCodes: Map<string, { code: string; expiresAt: number }> = new Map();

  static init() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      if (!this.broadcastChannel) {
        this.broadcastChannel = new BroadcastChannel(REVIEWS_CHANNEL_NAME);
        this.broadcastChannel.onmessage = (event) => {
          if (event.data?.type === 'REVIEWS_UPDATED') {
            this.notifyListeners();
          }
        };
      }
    }
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

  /**
   * Strict Frontend Email Validation:
   * - Valid syntax
   * - Valid domain & TLD
   * - Blocks disposable, temporary or fake placeholder domains
   */
  static validateEmail(rawEmail: string): { valid: boolean; message?: string } {
    const email = rawEmail.trim().toLowerCase();
    if (!email) {
      return { valid: false, message: 'El correo electrónico es obligatorio para verificar tu reseña.' };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,10}$/;
    if (!emailRegex.test(email)) {
      return {
        valid: false,
        message: 'Por favor ingresa un correo electrónico con formato válido (ej. nombre@gmail.com).',
      };
    }

    const [localPart, domain] = email.split('@');
    if (!localPart || localPart.length < 2) {
      return { valid: false, message: 'El usuario del correo electrónico es demasiado corto.' };
    }

    if (DISPOSABLE_OR_FAKE_DOMAINS.has(domain)) {
      return {
        valid: false,
        message: 'No se permiten correos temporales o de prueba. Por favor usa tu correo real (Gmail, Outlook, Hotmail, iCloud o corporativo).',
      };
    }

    return { valid: true };
  }

  /**
   * Step 1 of Email Verification:
   * Generates a 6-digit verification code and dispatches it (via optional webhook/EmailJS or local verification inbox).
   */
  static async requestEmailVerificationCode(
    rawEmail: string,
    clientName: string
  ): Promise<{ success: boolean; message?: string; verificationCodePreview?: string }> {
    const validation = this.validateEmail(rawEmail);
    if (!validation.valid) {
      return { success: false, message: validation.message };
    }

    const normalizedEmail = rawEmail.trim().toLowerCase();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    this.pendingCodes.set(normalizedEmail, { code, expiresAt });

    // Optional real email webhook if configured via Vite env (e.g., EmailJS or custom serverless endpoint)
    const webhookUrl = import.meta.env.VITE_EMAIL_VERIFICATION_WEBHOOK;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: normalizedEmail,
            name: clientName,
            code,
            subject: `Código ${code} para confirmar tu reseña - Consultorio Laura Rodríguez`,
          }),
        });
      } catch (e) {
        console.warn('Webhook email send warning:', e);
      }
    }

    return {
      success: true,
      verificationCodePreview: code,
    };
  }

  /**
   * Step 2: Verify the 6-digit code entered by the user
   */
  static verifyEmailCode(rawEmail: string, inputCode: string): { valid: boolean; message?: string } {
    const normalizedEmail = rawEmail.trim().toLowerCase();
    const record = this.pendingCodes.get(normalizedEmail);

    if (!record) {
      return {
        valid: false,
        message: 'No encontramos un código activo para este correo. Por favor solicita un nuevo código.',
      };
    }

    if (Date.now() > record.expiresAt) {
      this.pendingCodes.delete(normalizedEmail);
      return {
        valid: false,
        message: 'El código ha expirado. Por favor solicita uno nuevo.',
      };
    }

    if (record.code !== inputCode.trim()) {
      return {
        valid: false,
        message: 'El código ingresado no coincide. Verifica los 6 dígitos e intenta nuevamente.',
      };
    }

    return { valid: true };
  }

  /**
   * Returns public reviews ONLY (explicitly strips any email field for privacy)
   */
  static async getReviews(): Promise<Review[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('resenas')
          .select('id, service_id, service_name, client_name, rating, comment, date, created_at')
          .eq('approved', true)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            serviceId: item.service_id,
            serviceName: item.service_name,
            clientName: item.client_name,
            emailVerified: true,
            rating: item.rating,
            comment: item.comment,
            date: item.date,
            verifiedPatient: true,
          }));
        }
      } catch (e) {
        console.warn('Supabase reviews fetch failed, using fallback', e);
      }
    }

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
      if (stored) {
        const parsed: Review[] = JSON.parse(stored);
        // Strip clientEmail before returning so it is never exposed in public state
        return parsed.map(({ clientEmail, ...publicFields }) => ({
          ...publicFields,
          emailVerified: true,
        }));
      }
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(initialReviews));
      return initialReviews;
    } catch {
      return initialReviews;
    }
  }

  static async addVerifiedReview(
    reviewData: {
      serviceId: string;
      serviceName: string;
      clientName: string;
      clientEmail: string;
      rating: number;
      comment: string;
      verificationCode: string;
    }
  ): Promise<{ success: boolean; message?: string }> {
    // 1. Validate fields
    if (!reviewData.clientName || reviewData.clientName.trim().length < 3) {
      return { success: false, message: 'Por favor ingresa tu nombre o iniciales.' };
    }

    const emailCheck = this.validateEmail(reviewData.clientEmail);
    if (!emailCheck.valid) {
      return { success: false, message: emailCheck.message };
    }

    const codeCheck = this.verifyEmailCode(reviewData.clientEmail, reviewData.verificationCode);
    if (!codeCheck.valid) {
      return { success: false, message: codeCheck.message };
    }

    if (!reviewData.comment || reviewData.comment.trim().length < 10) {
      return { success: false, message: 'El comentario debe tener al menos 10 caracteres.' };
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return { success: false, message: 'Selecciona una calificación entre 1 y 5 estrellas.' };
    }

    const normalizedEmail = reviewData.clientEmail.trim().toLowerCase();

    // 2. Anti-spam cooldown check per email + specialty
    try {
      const logRaw = localStorage.getItem(LOCAL_STORAGE_REVIEW_EMAIL_LOG_KEY);
      const emailLog: Record<string, number> = logRaw ? JSON.parse(logRaw) : {};
      const key = `${normalizedEmail}_${reviewData.serviceId}`;
      if (emailLog[key] && Date.now() - emailLog[key] < 12 * 60 * 60 * 1000) {
        return {
          success: false,
          message: 'Ya registraste una reseña para esta especialidad recientemente con este correo.',
        };
      }
      emailLog[key] = Date.now();
      localStorage.setItem(LOCAL_STORAGE_REVIEW_EMAIL_LOG_KEY, JSON.stringify(emailLog));
    } catch {
      // ignore storage errors
    }

    // Consume verification code
    this.pendingCodes.delete(normalizedEmail);

    const todayStr = new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    // Public review object (does NOT expose clientEmail publicly)
    const newPublicReview: Review = {
      id: 'rev-' + Date.now(),
      serviceId: reviewData.serviceId,
      serviceName: reviewData.serviceName,
      clientName: reviewData.clientName.trim(),
      emailVerified: true,
      rating: reviewData.rating,
      comment: reviewData.comment.trim(),
      date: todayStr,
      verifiedPatient: true,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('resenas').insert([
          {
            service_id: newPublicReview.serviceId,
            service_name: newPublicReview.serviceName,
            client_name: newPublicReview.clientName,
            client_email_private: normalizedEmail,
            rating: newPublicReview.rating,
            comment: newPublicReview.comment,
            date: newPublicReview.date,
            approved: true,
          },
        ]);
      } catch (e) {
        console.warn('Failed to insert into Supabase:', e);
      }
    }

    try {
      const current = await this.getReviews();
      const updated = [newPublicReview, ...current];
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(updated));

      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({ type: 'REVIEWS_UPDATED' });
      }
      this.notifyListeners();

      return { success: true };
    } catch {
      return { success: false, message: 'Error al registrar tu reseña.' };
    }
  }

  static calculateServiceStats(reviews: Review[], serviceId?: string) {
    const filtered = serviceId ? reviews.filter((r) => r.serviceId === serviceId) : reviews;
    if (filtered.length === 0) {
      return { average: 5.0, count: 0 };
    }
    const sum = filtered.reduce((acc, r) => acc + r.rating, 0);
    const average = Math.round((sum / filtered.length) * 10) / 10;
    return { average, count: filtered.length };
  }
}

ReviewsManager.init();
