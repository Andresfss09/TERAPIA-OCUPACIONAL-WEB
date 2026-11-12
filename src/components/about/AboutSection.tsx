import React from 'react';
import { Calendar, ShieldCheck } from 'lucide-react';
import { therapistProfile } from '../../data/therapistData';
import { Button } from '../ui/Button';

export const AboutSection: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  return (
    <section id="sobre-laura" className="py-24 bg-cream-100 border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Layered Editorial Imagery & Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="relative">
              {/* Main Portrait */}
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-stone-200 shadow-polaroid border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85"
                  alt="Laura Rodríguez - Terapeuta Ocupacional en Cali"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Overlapping Credential Card */}
              <div className="mt-4 sm:-mt-14 sm:ml-6 relative z-10 rounded-2xl bg-white border border-stone-200 p-5 shadow-polaroid text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blush-600">
                    Fundadora & Única Profesional a Cargo
                  </span>
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-stone-900">
                  Laura Rodríguez, T.O.
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Egresada de la <strong>Universidad del Valle (Cali)</strong> • Especialista en Neurodesarrollo, Integración Sensorial, Enfoque ABA, Inclusión Educativa y Rehabilitación.
                </p>
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] font-semibold text-stone-800">
                  <span>{therapistProfile.registryNumber}</span>
                  <span>Cali, Colombia</span>
                </div>
              </div>
            </div>

            {/* Personal Touch Card */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 text-left space-y-3 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-widest text-blush-600 block">
                El Sello de Nuestro Consultorio
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                {therapistProfile.littleThings.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blush-500 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Editorial Narrative + Academic Ledger (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-blush-600 block">
                Sobre Tu Terapeuta • Atención Personalizada
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.1]">
                Ciencia clínica con la calidez de sentirte en{' '}
                <span className="italic font-normal text-blush-600">casa.</span>
              </h2>
            </div>

            {/* Editorial Pull-Quote */}
            <blockquote className="pl-5 border-l-4 border-blush-500 font-sans text-base sm:text-lg font-bold text-stone-800 leading-relaxed bg-white/60 dark:bg-stone-900/50 p-4 rounded-r-2xl">
              {therapistProfile.quote}
            </blockquote>

            {/* First-Person Story */}
            <div className="space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line">
              {therapistProfile.fullBio}
            </div>

            {/* Signature & Direct CTA */}
            <div className="pt-2 pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-hand text-3xl text-stone-900">
                  Laura Rodríguez
                </p>
                <p className="text-xs text-stone-600 font-medium">
                  Terapeuta Ocupacional • Universidad del Valle
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                icon={<Calendar className="w-4 h-4" />}
                onClick={onOpenBooking}
              >
                Agendar Cita con Laura
              </Button>
            </div>

            {/* Academic & Clinical Trajectory Ledger */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-2xl font-semibold text-stone-900">
                Formación Académica y Certificaciones Clínicas
              </h3>

              <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
                {therapistProfile.educationTimeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline hover:bg-white/70 transition-colors px-2 rounded-xl"
                  >
                    <div className="sm:col-span-2">
                      <span className="font-sans text-base font-extrabold text-blush-600">
                        {item.year}
                      </span>
                    </div>
                    <div className="sm:col-span-10 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-serif text-lg font-semibold text-stone-900">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-cream-200 text-stone-800 px-2.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-sage-700">
                        {item.institution}
                      </p>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
