import React, { useState } from 'react';
import { Clock, ArrowUpRight, Check, Play, X } from 'lucide-react';
import { Service, Review } from '../../types';
import { servicesData } from '../../data/servicesData';
import { Button } from '../ui/Button';
import { StarRating } from '../ui/StarRating';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  reviews: Review[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking, reviews }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [inlineVideoServiceId, setInlineVideoServiceId] = useState<string | null>(null);

  const categories = [
    { id: 'todos', label: 'Todas las Especialidades (6)' },
    { id: 'neurodesarrollo', label: 'Neurodesarrollo' },
    { id: 'sensorial', label: 'Integración Sensorial' },
    { id: 'aba', label: 'Enfoque ABA' },
    { id: 'inclusion', label: 'Inclusión Educativa' },
    { id: 'neurorehabilitacion', label: 'Neurorehabilitación' },
    { id: 'funcional', label: 'Rehabilitación Funcional' },
  ];

  const filteredServices = servicesData.filter((service) => {
    if (activeCategory === 'todos') return true;
    return service.category === activeCategory;
  });

  const handleOpenDetail = (service: Service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <section id="especialidades" className="py-16 sm:py-24 bg-cream-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
          <div className="text-left space-y-3 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-blush-600 block">
              Portafolio Clínico Especializado • Video y Detalle por Área
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-semibold text-stone-900 tracking-tight leading-[1.12]">
              Nuestras 6 especialidades para impulsar tu{' '}
              <span className="text-blush-600">independencia.</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
              Explora el video explicativo y el detalle claro de cada especialidad para conocer en qué consiste, qué situaciones resuelve y qué esperar en tus sesiones con Laura.
            </p>
          </div>

          {/* Filter Pills - Mobile Horizontal Scrollable & High Contrast */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs font-bold px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer border shrink-0 ${
                    isSelected
                      ? 'bg-blush-500 text-white border-blush-500 shadow-sticker'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-blush-300 hover:bg-cream-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, idx) => {
            const serviceReviews = reviews.filter((r) => r.serviceId === service.id);
            const ratingAvg =
              serviceReviews.length > 0
                ? serviceReviews.reduce((acc, r) => acc + r.rating, 0) / serviceReviews.length
                : service.rating || 5.0;

            const indexNum = String(idx + 1).padStart(2, '0');
            const isPlayingInline = inlineVideoServiceId === service.id;

            return (
              <div
                key={service.id}
                className="group rounded-3xl bg-white hover:bg-cream-50 border border-stone-200 hover:border-blush-400 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-soft hover:shadow-soft-hover text-left"
              >
                <div>
                  {/* Responsive Media Header: Either Inline Embedded Video or Cover Image */}
                  {isPlayingInline && service.videoEmbedUrl ? (
                    <div className="relative aspect-video w-full bg-stone-900">
                      <iframe
                        src={`${service.videoEmbedUrl}${service.videoEmbedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                        title={service.videoTitle || `Video explicativo de ${service.name}`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <button
                        type="button"
                        onClick={() => setInlineVideoServiceId(null)}
                        className="absolute top-2.5 right-2.5 bg-stone-900/85 hover:bg-stone-900 text-white rounded-full p-1.5 shadow-md cursor-pointer transition-colors"
                        title="Cerrar video"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleOpenDetail(service)}
                      className="relative aspect-[16/10] overflow-hidden bg-stone-200 cursor-pointer"
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/20 to-transparent" />

                      {/* Editorial Number Top Left */}
                      <div className="absolute top-3.5 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-stone-200 shadow-2xs">
                        <span className="font-sans text-xs font-extrabold text-blush-600">
                          {indexNum}
                        </span>
                        <span className="text-[11px] font-bold text-stone-800 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-500" />
                          {service.durationMinutes} min
                        </span>
                      </div>

                      {/* Interactive Video Trigger Button Top Right */}
                      {service.videoEmbedUrl && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInlineVideoServiceId(service.id);
                          }}
                          className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blush-500 hover:bg-blush-600 text-white text-[11px] font-bold shadow-sm transition-colors cursor-pointer"
                          title="Reproducir video explicativo de esta especialidad"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Ver video</span>
                        </button>
                      )}

                      {/* Bottom Price & Rating */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <div className="bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                          <StarRating rating={ratingAvg} size="sm" showScore />
                        </div>
                        {service.priceEstimated && (
                          <span className="text-xs font-bold bg-stone-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full">
                            {service.priceEstimated}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3
                      onClick={() => handleOpenDetail(service)}
                      className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 group-hover:text-blush-600 transition-colors leading-snug cursor-pointer"
                    >
                      {service.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-700 font-medium line-clamp-3 leading-relaxed">
                      {service.whatItIs || service.shortDescription}
                    </p>

                    {/* Key Situations Solved Preview */}
                    <div className="pt-3 border-t border-stone-200 space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block">
                        ¿Qué trata o resuelve?
                      </span>
                      {(service.whatItSolves || service.benefits).slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1 font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(service)}
                    className="py-2.5 px-4 rounded-full bg-cream-100 border border-stone-300 hover:border-stone-500 text-xs font-bold text-stone-800 hover:bg-stone-100 transition-all cursor-pointer"
                  >
                    Detalle y Video
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 py-2.5"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                    iconPosition="right"
                    onClick={() => onOpenBooking(service.id)}
                  >
                    Reservar Cita
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal for Service Details + Embedded Video */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectBooking={(serviceId) => onOpenBooking(serviceId)}
        serviceReviews={selectedService ? reviews.filter((r) => r.serviceId === selectedService.id) : []}
      />
    </section>
  );
};
