export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  whatItIs: string;
  whatItSolves: string[];
  whatToExpect: string[];
  category:
    | 'neurodesarrollo'
    | 'neurorehabilitacion'
    | 'funcional'
    | 'inclusion'
    | 'aba'
    | 'sensorial';
  targetAudience: string;
  durationMinutes: number;
  benefits: string[];
  priceEstimated?: string;
  image: string;
  iconName: string;
  videoEmbedUrl: string;
  videoTitle?: string;
  videoPreviewUrl?: string;
  rating?: number;
  reviewCount?: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  isPast?: boolean;
  bookedBySpecialty?: string;
  appointmentId?: string;
}

export interface DayAvailability {
  date: string;
  slots: TimeSlot[];
}

export interface Appointment {
  id?: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  notes?: string;
  createdAt?: string;
  status: 'confirmada' | 'pendiente' | 'cancelada';
  source?: 'web' | 'admin_manual';
}

export interface Review {
  id: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  /** Stored privately for spam verification; NEVER displayed publicly */
  clientEmail?: string;
  emailVerified?: boolean;
  rating: number;
  comment: string;
  date: string;
  verifiedPatient?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'espacio' | 'sesiones' | 'materiales' | 'videos';
  mediaType: 'image' | 'video';
  url: string;
  thumbnail?: string;
  description: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface EducationMilestone {
  year: string;
  title: string;
  institution: string;
  description: string;
  badge?: string;
}
