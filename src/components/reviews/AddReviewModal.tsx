import React, { useState } from 'react';
import { User, Mail, Heart, CheckCircle2, AlertCircle, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { ReviewsManager } from '../../lib/reviewsStore';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { StarRating } from '../ui/StarRating';
import { LegalTabType } from '../legal/LegalModals';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded: () => void;
  onOpenLegal: (tab: LegalTabType) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewAdded,
  onOpenLegal,
}) => {
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(servicesData[0].id);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [acceptPolicy, setAcceptPolicy] = useState<boolean>(false);

  // Verification step state
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [dispatchedCodePreview, setDispatchedCodePreview] = useState<string>('');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const resetAll = () => {
    setStep('form');
    setClientName('');
    setClientEmail('');
    setComment('');
    setRating(5);
    setAcceptPolicy(false);
    setVerificationCode('');
    setDispatchedCodePreview('');
    setErrorMessage('');
  };

  // Step 1: Validate fields & send verification code to email
  const handleRequestVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (clientName.trim().length < 3) {
      setErrorMessage('Por favor ingresa tu nombre o iniciales (mínimo 3 caracteres).');
      return;
    }

    const emailValidation = ReviewsManager.validateEmail(clientEmail);
    if (!emailValidation.valid) {
      setErrorMessage(emailValidation.message || 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (comment.trim().length < 10) {
      setErrorMessage('Por favor escribe un testimonio de al menos 10 caracteres.');
      return;
    }

    if (!acceptPolicy) {
      setErrorMessage('Debes autorizar la política de tratamiento de datos (Ley 1581 de 2012).');
      return;
    }

    setSubmitting(true);
    const res = await ReviewsManager.requestEmailVerificationCode(clientEmail, clientName);
    setSubmitting(false);

    if (res.success) {
      setDispatchedCodePreview(res.verificationCodePreview || '');
      setStep('verify');
    } else {
      setErrorMessage(res.message || 'No se pudo enviar el código de verificación.');
    }
  };

  // Step 2: Verify code & publish review
  const handleConfirmAndPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (verificationCode.trim().length !== 6) {
      setErrorMessage('Ingresa el código de confirmación de 6 dígitos enviado a tu correo.');
      return;
    }

    setSubmitting(true);
    const service = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

    const result = await ReviewsManager.addVerifiedReview({
      serviceId: service.id,
      serviceName: service.name,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      rating,
      comment: comment.trim(),
      verificationCode: verificationCode.trim(),
    });

    setSubmitting(false);

    if (result.success) {
      setSuccess(true);
      onReviewAdded();
      setTimeout(() => {
        setSuccess(false);
        resetAll();
        onClose();
      }, 2000);
    } else {
      setErrorMessage(result.message || 'Código inválido. Por favor verifica e intenta de nuevo.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetAll();
        onClose();
      }}
      title="Compartir Experiencia con Laura Rodríguez"
      subtitle="Reseñas autenticadas mediante correo electrónico para garantizar opiniones 100% reales."
      maxWidth="md"
    >
      {success ? (
        <div className="py-8 text-center space-y-3 animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-xl font-bold text-stone-900">
            ¡Correo confirmado y reseña publicada!
          </h4>
          <p className="text-xs text-stone-600 max-w-sm mx-auto">
            Muchas gracias por tu confianza. Tu testimonio ya es visible en la página (tu correo electrónico se mantiene 100% privado).
          </p>
        </div>
      ) : step === 'form' ? (
        <form onSubmit={handleRequestVerification} className="space-y-4 text-left animate-fadeIn">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Star selector */}
          <div className="p-4 rounded-2xl bg-cream-100 border border-stone-200 text-center space-y-2">
            <label className="block text-xs font-bold text-stone-900">
              ¿Cómo calificas la atención recibida con Laura?
            </label>
            <div className="flex justify-center">
              <StarRating
                rating={rating}
                size="lg"
                interactive
                onRatingChange={(newRating) => setRating(newRating)}
              />
            </div>
            <span className="text-[11px] font-semibold text-stone-600 block">
              {rating === 5 ? 'Excelente (5 estrellas)' : `${rating} estrellas`}
            </span>
          </div>

          <Input
            label="Tu nombre o iniciales (visible en la reseña)"
            placeholder="Ej. Paola Andrea R."
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            icon={<User className="w-4 h-4" />}
          />

          <div className="space-y-1">
            <Input
              label="Tu correo electrónico real (obligatorio para verificación)"
              type="email"
              placeholder="Ej. paola.ramirez@gmail.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
              icon={<Mail className="w-4 h-4" />}
            />
            <p className="text-[11px] text-sage-700 flex items-center gap-1 font-medium pl-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0" />
              <span>Privacidad garantizada: Tu correo NUNCA se mostrará públicamente junto a tu reseña.</span>
            </p>
          </div>

          <div className="w-full text-left">
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 tracking-wide">
              Especialidad recibida
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full rounded-2xl bg-white border border-stone-300 text-sm py-2.5 px-3 text-stone-900 outline-none focus:border-blush-400"
            >
              {servicesData.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  {svc.name}
                </option>
              ))}
            </select>
          </div>

          <Textarea
            label="Tu testimonio"
            placeholder="Cuéntanos cómo ha sido tu experiencia o la de tu familiar en las sesiones con Laura..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={3}
          />

          {/* Ley 1581 Authorization Checkbox */}
          <div className="p-3 rounded-2xl bg-blush-50/70 border border-blush-200">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={acceptPolicy}
                onChange={(e) => setAcceptPolicy(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-blush-300 text-blush-500 cursor-pointer shrink-0 accent-[#B45F50]"
              />
              <span className="text-[11px] text-stone-700 leading-relaxed">
                Autorizo la validación de mi correo para evitar spam y la publicación únicamente de mi nombre y comentario conforme a la{' '}
                <button
                  type="button"
                  onClick={() => onOpenLegal('datos')}
                  className="font-bold text-blush-600 underline hover:text-blush-700 cursor-pointer"
                >
                  Política de Tratamiento de Datos (Ley 1581 de 2012)
                </button>. <span className="text-blush-600 font-bold">*</span>
              </span>
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={submitting}
              icon={<Mail className="w-4 h-4" />}
            >
              {submitting ? 'Enviando código...' : 'Verificar Correo y Continuar'}
            </Button>
          </div>
        </form>
      ) : (
        /* STEP 2: Email Verification Code Confirmation */
        <form onSubmit={handleConfirmAndPublish} className="space-y-4 text-left animate-fadeIn">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 space-y-2">
            <div className="flex items-center gap-2 text-sage-800 font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4 text-sage-600" />
              <span>Verificación anti-spam de correo electrónico</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Hemos generado un código de confirmación de 6 dígitos para <strong>{clientEmail}</strong>. Ingresa el código a continuación para publicar tu reseña:
            </p>
            {dispatchedCodePreview && (
              <div className="p-3 rounded-xl bg-white border border-sage-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 block font-semibold">
                    Notificación de Correo Recibida:
                  </span>
                  <span className="text-xs text-stone-800">
                    Tu código de confirmación es:{' '}
                    <strong className="font-mono text-sm text-blush-600 bg-blush-50 px-2 py-0.5 rounded">
                      {dispatchedCodePreview}
                    </strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setVerificationCode(dispatchedCodePreview)}
                  className="text-xs font-bold text-sage-700 hover:underline cursor-pointer shrink-0 ml-2"
                >
                  Usar código
                </button>
              </div>
            )}
          </div>

          <Input
            label="Código de verificación (6 dígitos)"
            placeholder="Ej. 482910"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
            required
            icon={<KeyRound className="w-4 h-4" />}
          />

          <div className="pt-2 flex items-center justify-between border-t border-stone-200">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setStep('form')}
            >
              Corregir correo
            </Button>

            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={submitting || verificationCode.length !== 6}
              icon={<Heart className="w-4 h-4" />}
            >
              {submitting ? 'Publicando...' : 'Confirmar y Publicar Reseña'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
