import React, { useState } from 'react';
import { MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { Review } from '../../types';
import { Button } from '../ui/Button';
import { StarRating } from '../ui/StarRating';
import { AddReviewModal } from './AddReviewModal';
import { LegalTabType } from '../legal/LegalModals';

interface ReviewsSectionProps {
  reviews: Review[];
  onReviewAdded: () => void;
  onOpenLegal: (tab: LegalTabType) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onReviewAdded,
  onOpenLegal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 5.0;

  return (
    <section id="resenas" className="py-24 bg-cream-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric Header + Aggregate Score Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 text-left space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-blush-600 block">
              Historias Reales • Pacientes y Familias en Cali
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.08]">
              La tranquilidad de saber que estás en las{' '}
              <span className="italic font-normal text-blush-600">manos correctas.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200 shadow-soft">
            <div className="flex items-center gap-4">
              <span className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 leading-none">
                {averageRating.toFixed(1)}
              </span>
              <div className="text-left">
                <StarRating rating={averageRating} size="sm" />
                <p className="text-xs text-stone-600 font-medium mt-1">
                  Basado en {reviews.length} reseñas verificadas por correo
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={<MessageSquarePlus className="w-3.5 h-3.5" />}
              onClick={() => setModalOpen(true)}
            >
              Dejar reseña verificada
            </Button>
          </div>
        </div>

        {/* Editorial Testimonials Grid (Client Email is NEVER shown publicly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => {
            const isFeatured = idx === 0;

            return (
              <div
                key={review.id}
                className={`rounded-3xl p-7 flex flex-col justify-between text-left transition-all duration-300 border ${
                  isFeatured
                    ? 'bg-blush-50/90 border-blush-300 shadow-soft'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-soft'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <StarRating rating={review.rating} size="sm" />
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-sage-700">
                      <CheckCircle2 className="w-3 h-3 text-sage-600" />
                      Correo Verificado
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base font-semibold text-stone-800 leading-relaxed">
                    «{review.comment}»
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-stone-200 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-stone-900">
                      {review.clientName}
                    </p>
                    <p className="text-[11px] text-blush-600 font-medium mt-0.5">
                      {review.serviceName}
                    </p>
                  </div>
                  <span className="text-[11px] text-stone-500 shrink-0">
                    {review.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Add Review Modal with Email Verification */}
      <AddReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onReviewAdded={onReviewAdded}
        onOpenLegal={onOpenLegal}
      />
    </section>
  );
};
