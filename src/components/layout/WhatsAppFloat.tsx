import React from 'react';
import { therapistProfile } from '../../data/therapistData';

export const WhatsAppFloat: React.FC = () => {
  const whatsappUrl = `https://wa.me/${therapistProfile.whatsappNumber}?text=${encodeURIComponent('Hola Laura, me gustaría recibir información sobre tus sesiones de Terapia Ocupacional en Cali.')}`;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con Laura Rodríguez"
        className="group flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-white pl-4 pr-2 py-2 rounded-full shadow-polaroid border border-stone-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
        </span>
        <span className="text-xs font-bold tracking-wide pr-1 text-white">
          Hablar con Laura
        </span>
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white shadow-sm group-hover:scale-105 transition-transform">
          {/* Official WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
            aria-hidden="true"
          >
            <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.459 3.474 1.332 4.988L2 22l5.182-1.359a9.927 9.927 0 0 0 4.847 1.259h.004c5.515 0 9.967-4.452 9.967-9.968A9.936 9.936 0 0 0 19.08 4.92 9.932 9.932 0 0 0 12.031 2zm0 18.235h-.003a8.263 8.263 0 0 1-4.213-1.153l-.302-.179-3.136.822.837-3.056-.197-.313a8.257 8.257 0 0 1-1.269-4.387c0-4.568 3.716-8.284 8.286-8.284 2.213 0 4.293.862 5.857 2.427a8.232 8.232 0 0 1 2.425 5.858c0 4.569-3.716 8.265-8.285 8.265zm4.544-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062-.249-.125-1.051-.387-2.002-1.235-.74-.66-1.239-1.475-1.384-1.724-.145-.249-.015-.384.109-.508.112-.112.249-.291.373-.436.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.436-.062-.125-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427-.145-.007-.311-.009-.477-.009s-.436.062-.664.311c-.228.249-.871.851-.871 2.075s.892 2.407 1.016 2.573c.125.166 1.755 2.679 4.252 3.757.594.256 1.058.409 1.419.524.596.189 1.139.162 1.568.098.478-.071 1.472-.602 1.68-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
          </svg>
        </span>
      </a>
    </div>
  );
};
