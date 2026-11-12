import React from 'react';
import { Clock, Users, CheckCircle2, Calendar, PlayCircle, Sparkles, HelpCircle, Compass } from 'lucide-react';
import { Service, Review } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking: (serviceId: string) => void;
  serviceReviews: Review[];
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectBooking,
  serviceReviews
}) => {
  if (!service) return null;

  const averageRating = serviceReviews.length > 0
    ? (serviceReviews.reduce((sum, r) => sum + r.rating, 0) / serviceReviews.length)
    : (service.rating || 5.0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service.name}
      subtitle={`Atención personalizada con Laura Rodríguez • Duración: ${service.durationMinutes} minutos`}
      maxWidth="2xl"
    >
      <div className="space-y-6 pb-2 text-stone-800 text-left">
        
        {/* 1. Embedded Video Explaining the Specialty (Responsive 16:9 YouTube/Vimeo) */}
        {service.videoEmbedUrl ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blush-600">
                <PlayCircle className="w-4 h-4 text-blush-500" />
                Video explicativo de la especialidad
              </span>
              <div className="flex items-center gap-2">
                <Badge variant="cream" size="sm">
                  <Clock className="w-3.5 h-3.5 text-blush-600 mr-1" />
                  {service.durationMinutes} min
                </Badge>
                {service.priceEstimated && (
                  <Badge variant="sage" size="sm">
                    {service.priceEstimated}
                  </Badge>
                )}
              </div>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-soft">
              <iframe
                src={service.videoEmbedUrl}
                title={service.videoTitle || `En qué consiste ${service.name}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            {service.videoTitle && (
              <p className="text-[11px] text-stone-500 italic">
                {service.videoTitle}
              </p>
            )}
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-stone-100 shadow-inner">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Short Rating Summary */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-cream-100 border border-stone-200">
          <div className="flex items-center gap-2">
            <StarRating rating={averageRating} size="md" showScore />
            <span className="text-xs text-stone-600 font-medium">
              ({serviceReviews.length} opiniones verificadas)
            </span>
          </div>
          <span className="text-xs font-semibold text-sage-800 bg-sage-100 px-3 py-1 rounded-full border border-sage-200">
            Atención 1 a 1 con Laura Rodríguez
          </span>
        </div>

        {/* 2. ¿En qué consiste esta especialidad? (Claro y sin tecnicismos) */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
          <h4 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blush-500 shrink-0" />
            <span>¿En qué consiste esta especialidad?</span>
          </h4>
          <p className="text-sm text-stone-700 leading-relaxed">
            {service.whatItIs || service.fullDescription}
          </p>
        </div>

        {/* 3. ¿Qué trata o resuelve en el día a día? */}
        {service.whatItSolves && service.whatItSolves.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-sage-600 shrink-0" />
              <span>¿Qué situaciones trata o resuelve?</span>
            </h4>
            <p className="text-xs text-stone-600">
              Esta terapia es ideal si tú o tu familiar viven alguna de estas situaciones cotidianas:
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {service.whatItSolves.map((situation, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-cream-50 border border-stone-200 flex items-start gap-3 text-xs sm:text-sm text-stone-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-blush-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{situation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. ¿Qué puede esperar el paciente y su familia? */}
        {service.whatToExpect && service.whatToExpect.length > 0 && (
          <div className="p-5 rounded-2xl bg-sage-50/90 border border-sage-200 space-y-3">
            <h4 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sage-700 shrink-0" />
              <span>¿Qué puedes esperar durante tu proceso con Laura?</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-800">
              {service.whatToExpect.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sage-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Target Audience */}
        <div className="p-4 rounded-2xl bg-cream-100 border border-stone-200 space-y-1.5">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4 text-blush-600" />
            <span>¿A quién va dirigido?</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
            {service.targetAudience}
          </p>
        </div>

        {/* Recent Service Reviews (Email strictly hidden) */}
        {serviceReviews.length > 0 && (
          <div className="space-y-2 pt-1">
            <h4 className="font-serif text-lg font-bold text-stone-900">
              Lo que opinan pacientes de esta especialidad:
            </h4>
            <div className="space-y-2">
              {serviceReviews.slice(0, 2).map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-2xl bg-white border border-stone-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">{rev.clientName}</span>
                    <StarRating rating={rev.rating} size="sm" />
                  </div>
                  <p className="text-stone-700 italic">«{rev.comment}»</p>
                  <p className="text-[10px] text-stone-500">{rev.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Bar */}
        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-stone-500 block">Valor por sesión individual</span>
            <span className="text-base font-bold text-stone-900">
              {service.priceEstimated || 'Tarifa personalizada'}
            </span>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<Calendar className="w-4 h-4" />}
            onClick={() => {
              onClose();
              onSelectBooking(service.id);
            }}
            className="w-full sm:w-auto"
          >
            Agendar esta Especialidad por WhatsApp
          </Button>
        </div>

      </div>
    </Modal>
  );
};
