import React, { useState } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { GalleryItem } from '../../types';
import { galleryItems } from '../../data/galleryData';
import { Modal } from '../ui/Modal';

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'todos' | 'espacio' | 'sesiones' | 'materiales' | 'videos'>('todos');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const tabs = [
    { id: 'todos', label: 'Recorrido Completo' },
    { id: 'espacio', label: 'El Consultorio' },
    { id: 'sesiones', label: 'Práctica Clínica' },
    { id: 'materiales', label: 'Recursos & Adaptaciones' },
    { id: 'videos', label: 'Videos Demostrativos' },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === 'todos') return true;
    return item.category === activeTab;
  });

  return (
    <section id="galeria" className="py-24 bg-cream-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header + Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="text-left space-y-3 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-blush-600 block">
              Instalaciones & Equipamiento en Cali
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.08]">
              Un entorno pensado para despertar la{' '}
              <span className="italic font-normal text-blush-600">confianza.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs font-bold px-4 py-2.5 rounded-full transition-all cursor-pointer border shrink-0 ${
                    isSelected
                      ? 'bg-blush-500 text-white border-blush-500 shadow-xs'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-blush-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredItems.map((item, idx) => {
            const isVideo = item.mediaType === 'video';
            const spanClass =
              activeTab === 'todos'
                ? idx === 0 || idx === 5
                  ? 'lg:col-span-6 aspect-[16/10]'
                  : 'lg:col-span-3 aspect-[4/5]'
                : 'lg:col-span-4 aspect-[4/3]';

            return (
              <div
                key={item.id}
                onClick={() => setActiveMedia(item)}
                className={`${spanClass} group relative rounded-3xl overflow-hidden bg-stone-200 cursor-pointer border border-stone-200 shadow-soft hover:shadow-soft-hover transition-all duration-500`}
              >
                <img
                  src={isVideo ? item.thumbnail || item.url : item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Right Action Badge */}
                <div className="absolute top-4 right-4">
                  {isVideo ? (
                    <span className="inline-flex items-center gap-1.5 bg-blush-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md">
                      <Play className="w-3 h-3 fill-white" />
                      <span>Ver video</span>
                    </span>
                  ) : (
                    <span className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  )}
                </div>

                {/* Bottom Editorial Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-left text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blush-300 block">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-medium leading-tight text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Media Detail Modal */}
      {activeMedia && (
        <Modal
          isOpen={Boolean(activeMedia)}
          onClose={() => setActiveMedia(null)}
          title={activeMedia.title}
          subtitle={activeMedia.description}
          maxWidth="2xl"
        >
          <div className="rounded-2xl overflow-hidden bg-stone-900/5 aspect-video flex items-center justify-center">
            {activeMedia.mediaType === 'video' ? (
              <video
                src={activeMedia.url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={activeMedia.url}
                alt={activeMedia.title}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};
