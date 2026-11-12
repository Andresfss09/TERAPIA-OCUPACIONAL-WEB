import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Calendar, ArrowUpRight, Lock } from 'lucide-react';
import { therapistProfile } from '../../data/therapistData';
import { LegalTabType } from '../legal/LegalModals';
import { Button } from '../ui/Button';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLegal: (tab: LegalTabType) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLegal, onOpenAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-200 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pre-Footer Conversion Banner */}
        <div className="py-16 border-b border-stone-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-blush-300 block">
              Da el Primer Paso Hoy
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif font-normal text-white leading-tight">
              Comienza el camino hacia una vida más{' '}
              <span className="italic text-blush-300">autónoma y plena.</span>
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto">
            <Button
              variant="primary"
              size="lg"
              icon={<Calendar className="w-4 h-4" />}
              onClick={onOpenBooking}
            >
              Agendar Cita en Línea
            </Button>

            <a
              href={`https://wa.me/${therapistProfile.whatsappNumber}?text=${encodeURIComponent('Hola Laura, me gustaría agendar una cita de valoración en tu consultorio de Cali.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-stone-600 hover:border-white text-xs sm:text-sm font-semibold text-white hover:bg-stone-800 transition-all"
            >
              <span>WhatsApp Directo: {therapistProfile.phone}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Main 4-Column Footer */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-stone-800 text-left">
          
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blush-500 text-white flex items-center justify-center font-serif italic text-base font-semibold">
                LR
              </div>
              <div>
                <h4 className="font-serif text-xl font-semibold text-white leading-none">
                  Laura Rodríguez
                </h4>
                <span className="text-[10px] uppercase tracking-[0.18em] text-blush-300 font-semibold block mt-1">
                  Terapia Ocupacional • Cali
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
              Consultorio privado de Terapia Ocupacional atendido exclusivamente por Laura Rodríguez en Cali. Especialista en Neurodesarrollo, Integración Sensorial, Enfoque ABA, Inclusión Educativa, Neurorehabilitación y Rehabilitación Funcional.
            </p>

            <p className="text-xs font-semibold text-sage-300 pt-1">
              Registro Profesional: {therapistProfile.registryNumber}
            </p>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Secciones
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              <li><a href="#inicio" className="hover:text-blush-300 transition-colors">Inicio</a></li>
              <li><a href="#que-es-to" className="hover:text-blush-300 transition-colors">¿Cómo te ayudo?</a></li>
              <li><a href="#especialidades" className="hover:text-blush-300 transition-colors">Especialidades & Videos</a></li>
              <li><a href="#sobre-laura" className="hover:text-blush-300 transition-colors">Sobre Laura</a></li>
              <li><a href="#agenda-directa" className="hover:text-blush-300 transition-colors">Agenda en Vivo</a></li>
              <li><a href="#resenas" className="hover:text-blush-300 transition-colors">Testimonios</a></li>
            </ul>
          </div>

          {/* Col 3: Schedule (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Horario Clínico
            </h5>
            <ul className="space-y-2 text-xs text-stone-300">
              {therapistProfile.officeHours.map((h, i) => (
                <li key={i} className="flex justify-between border-b border-stone-800 pb-1.5">
                  <span>{h.day}</span>
                  <span className="font-semibold text-white">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Location & Domain (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Consultorio en Cali
            </h5>
            <div className="space-y-2 text-xs text-stone-300 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blush-400 shrink-0 mt-0.5" />
                <span>{therapistProfile.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage-400 shrink-0" />
                <span>{therapistProfile.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blush-300 shrink-0" />
                <span>{therapistProfile.email}</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenAdmin}
                aria-label="Acceso privado"
                className="p-2 rounded-full text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Colombian Legal Compliance & Copyright Bar */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-stone-200 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-sage-400" />
              Normativa Colombia:
            </span>
            <button
              type="button"
              onClick={() => onOpenLegal('datos')}
              className="text-stone-300 hover:text-white underline cursor-pointer transition-colors"
            >
              Política de Tratamiento de Datos (Ley 1581 de 2012)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="text-stone-300 hover:text-white underline cursor-pointer transition-colors"
            >
              Política de Cookies (SIC)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('terminos')}
              className="text-stone-300 hover:text-white underline cursor-pointer transition-colors"
            >
              Términos de Agendamiento
            </button>
          </div>

          <p className="text-stone-400">
            © {new Date().getFullYear()} Laura Rodríguez • laurarodriguezto.com.co • Cali, Colombia.
          </p>
        </div>

      </div>
    </footer>
  );
};
