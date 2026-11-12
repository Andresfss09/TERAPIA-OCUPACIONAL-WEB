import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Star, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { BookingManager, getUpcomingWorkDays } from '../../lib/bookingStore';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
  onExploreServices: () => void;
}

const HERO_PORTRAIT_MAIN =
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85';
const HERO_PORTRAIT_FALLBACK =
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=900&q=85';

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  const [imgSrc, setImgSrc] = useState(HERO_PORTRAIT_MAIN);
  const [previewFreeSlots, setPreviewFreeSlots] = useState<string[]>(['08:00 AM', '10:00 AM', '03:00 PM']);
  const [previewDayLabel, setPreviewDayLabel] = useState<string>('Hoy');

  useEffect(() => {
    const loadNextFree = async () => {
      const workDays = getUpcomingWorkDays(3, new Date());
      for (const wd of workDays) {
        const free = await BookingManager.getAvailableDaySlots(wd.dateStr);
        if (free.length > 0) {
          setPreviewFreeSlots(free.slice(0, 3).map((s) => s.time));
          setPreviewDayLabel(wd.isToday ? `Hoy (${wd.dayNum} ${wd.monthName})` : `${wd.dayName} ${wd.dayNum} ${wd.monthName}`);
          return;
        }
      }
    };
    loadNextFree();
    const unsub = BookingManager.subscribe(loadNextFree);
    const interval = setInterval(loadNextFree, 30000);
    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  const marqueeItems = [
    'Neurodesarrollo',
    'Neurorehabilitación',
    'Rehabilitación Funcional',
    'Asesoramiento y Acompañamiento en Inclusión Educativa',
    'Enfoque ABA',
    'Enfoque de Integración Sensorial',
  ];

  return (
    <section id="inicio" className="relative pt-24 sm:pt-36 overflow-hidden bg-cream-100">
      {/* Subtle Architectural Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blush-100/35 dark:bg-blush-500/5 rounded-bl-[6rem] -z-10 pointer-events-none hidden lg:block" />
      <div className="absolute top-24 left-12 w-96 h-96 bg-blush-200/20 dark:bg-blush-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: High-Converting Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-5 sm:space-y-7">
            
            {/* Eyebrow Credential Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-white border border-stone-200 rounded-full pl-2.5 pr-4 py-1.5 shadow-2xs">
              <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-extrabold bg-blush-100 text-blush-700 rounded-full">
                Cali, Colombia
              </span>
              <span className="text-xs font-bold text-stone-700">
                Laura Rodríguez • Terapeuta Ocupacional Univalle
              </span>
            </div>

            {/* High-Contrast, Cute & Super Legible Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-serif font-semibold text-stone-900 tracking-[-0.02em] leading-[1.12]">
              Donde cada pequeño avance se convierte en una vida con{' '}
              <span className="text-blush-600 underline decoration-blush-300/70 decoration-2 underline-offset-8">
                autonomía.
              </span>
            </h1>

            {/* Persuasive Subheadline */}
            <p className="text-sm sm:text-lg text-stone-700 leading-relaxed max-w-2xl font-medium">
              Consultorio privado en Cali dirigido y atendido personalmente por <strong className="text-stone-900 font-bold">Laura Rodríguez</strong>, especializado en <strong className="text-stone-900 font-bold">Neurodesarrollo, Integración Sensorial, Enfoque ABA, Inclusión Educativa, Neurorehabilitación y Rehabilitación Funcional</strong>.
            </p>

            {/* Primary & Secondary Conversion CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="lg"
                icon={<Calendar className="w-4 h-4" />}
                onClick={() => onOpenBooking()}
              >
                Reservar Cita de Valoración
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={onExploreServices}
              >
                Conocer las 6 especialidades
              </Button>
            </div>

            {/* Friction-Killer Micro-Guarantees */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-6 gap-y-2 text-xs text-stone-700 pt-1">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                Atención 1 a 1 siempre con Laura
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                Horarios en vivo sin cruces
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                Confirmación directa por WhatsApp (318 575 3889)
              </span>
            </div>

            {/* Social Proof & Authority Ledger */}
            <div className="pt-5 sm:pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-2xl">
              <div className="flex items-center gap-3 sm:col-span-2">
                <div className="flex -space-x-2.5 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                    alt="Paciente"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Paciente"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=120&q=80"
                    alt="Paciente"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-gold-400 text-gold-500" />
                    ))}
                    <span className="text-xs font-extrabold text-stone-900 ml-1">5.0</span>
                  </div>
                  <p className="text-xs text-stone-600 font-medium">
                    Confiado por <strong className="text-stone-900">+850 familias</strong> en Cali y el Valle
                  </p>
                </div>
              </div>

              <div className="sm:border-l sm:border-stone-200 sm:pl-5 flex flex-col justify-center">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-blush-600">
                  Respaldo Clínico
                </span>
                <span className="text-xs font-bold text-stone-800 mt-0.5">
                  Rethus T.O. 76-104928
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Portrait + Live Slot Widget (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[380px] sm:max-w-[420px]">
              
              {/* Architectural Offset Frame */}
              <div className="absolute -inset-2.5 sm:-inset-3 rounded-t-[9rem] sm:rounded-t-[11rem] rounded-b-3xl border border-stone-300/70 pointer-events-none" />

              {/* Main Portrait Image */}
              <div className="relative rounded-t-[8.5rem] sm:rounded-t-[10.5rem] rounded-b-3xl overflow-hidden aspect-[4/5] bg-stone-200 shadow-polaroid">
                <img
                  src={imgSrc}
                  onError={() => {
                    if (imgSrc !== HERO_PORTRAIT_FALLBACK) {
                      setImgSrc(HERO_PORTRAIT_FALLBACK);
                    }
                  }}
                  alt="Laura Rodríguez - Terapeuta Ocupacional en Cali"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />

                {/* Top Credential Tag inside Portrait */}
                <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-stone-200 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                  <span className="text-[11px] font-bold text-stone-900">
                    7+ Años de Experiencia Clínica
                  </span>
                </div>

                {/* Bottom Overlay Bio & Interactive Live Availability Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md border border-stone-200/80 rounded-2xl p-3.5 sm:p-4 shadow-polaroid text-left space-y-2.5 sm:space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-none">
                        Laura Rodríguez
                      </p>
                      <p className="text-[11px] text-stone-600 font-semibold mt-1">
                        Terapeuta Ocupacional • Atención Exclusiva 1 a 1
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-sage-100 text-sage-700 px-2.5 py-1 rounded-full shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-600 animate-pulse" />
                      Agenda en Vivo
                    </span>
                  </div>

                  {/* Mini Quick-Slot Selector for Instant Conversion */}
                  <div className="pt-2 border-t border-stone-200">
                    <div className="flex items-center justify-between text-[11px] text-stone-600 mb-2">
                      <span className="font-bold text-stone-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blush-500" />
                        Libres ({previewDayLabel}):
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenBooking()}
                        className="font-extrabold text-blush-600 hover:underline cursor-pointer"
                      >
                        Ver agenda →
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {previewFreeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => onOpenBooking()}
                          className="py-1.5 px-2 rounded-lg bg-cream-100 hover:bg-blush-500 hover:text-white text-stone-800 border border-stone-200 text-[11px] font-bold transition-all cursor-pointer text-center"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Editorial Marquee Ticker with clear sans-serif font */}
      <div className="bg-stone-900 text-white py-3.5 border-y border-stone-800 overflow-hidden">
        <div className="animate-marquee flex items-center gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-10 shrink-0">
              <span className="text-xs sm:text-sm font-sans font-semibold tracking-wide text-stone-100">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blush-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
