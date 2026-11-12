import React, { useEffect } from 'react';
import { CheckCircle2, Calendar, Clock, MessageSquare, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Appointment } from '../../types';
import { Modal } from '../ui/Modal';
import { BookingManager } from '../../lib/bookingStore';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  appointment,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen && appointment) {
      try {
        confetti({
          particleCount: 70,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#B45F50', '#4A6E58', '#CCA041', '#FAF6F0'],
        });
      } catch {
        // ignore confetti error
      }
    }
  }, [isOpen, appointment]);

  if (!appointment) return null;

  const whatsappUrl = BookingManager.generateWhatsAppUrl(appointment);

  const handleCopySummary = () => {
    const text = `Cita de Terapia Ocupacional con Laura Rodríguez\nEspecialidad: ${appointment.serviceName}\nFecha: ${appointment.date} a las ${appointment.time}\nPaciente: ${appointment.clientName}\nWhatsApp Consultorio: 318 575 3889`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="text-center space-y-5 py-2">
        <div className="mx-auto w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center border-2 border-sage-300 shadow-soft">
          <CheckCircle2 className="w-10 h-10 text-sage-600" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-sage-700 uppercase tracking-widest">
            ¡Horario Bloqueado y Redirigido a WhatsApp!
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Tu espacio con Laura ha sido separado
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Hemos bloqueado este horario en la agenda en línea para evitar cruces con otros pacientes.
          </p>
        </div>

        {/* Appointment Card Ticket */}
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-soft text-left space-y-3 relative overflow-hidden">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Comprobante de Reserva</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sage-700 bg-sage-50 px-2.5 py-0.5 rounded-full border border-sage-200">
              <Sparkles className="w-3 h-3 text-sage-600" />
              Horario Bloqueado
            </span>
          </div>

          <div className="space-y-2 text-sm text-stone-700">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-base">{appointment.serviceName}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-cream-50 flex items-center gap-2 border border-stone-200">
                <Calendar className="w-4 h-4 text-blush-600 shrink-0" />
                <div>
                  <span className="block text-[10px] text-stone-500">Fecha</span>
                  <span className="font-bold text-stone-900">{appointment.date}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-cream-50 flex items-center gap-2 border border-stone-200">
                <Clock className="w-4 h-4 text-sage-600 shrink-0" />
                <div>
                  <span className="block text-[10px] text-stone-500">Hora</span>
                  <span className="font-bold text-stone-900">{appointment.time}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-stone-700 space-y-1">
              <p><strong>Paciente:</strong> {appointment.clientName}</p>
              <p><strong>WhatsApp:</strong> {appointment.clientPhone}</p>
              {appointment.notes && (
                <p className="italic text-stone-600">«{appointment.notes}»</p>
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp Auto Action Callout */}
        <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 text-left space-y-1.5">
          <div className="flex items-center gap-2 text-sage-900 font-bold text-sm">
            <MessageSquare className="w-4 h-4 text-sage-700" />
            <span>Confirmación en WhatsApp (318 575 3889)</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            Si la ventana de WhatsApp no se abrió automáticamente en tu navegador, haz clic en el botón de abajo para enviar el mensaje prellenado a Laura.
          </p>
        </div>

        {/* Main Action Button */}
        <div className="space-y-2 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center font-bold text-sm py-3.5 px-6 rounded-full bg-sage-600 hover:bg-sage-700 text-white shadow-md hover:shadow-lg transition-all gap-2 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" />
            Enviar Confirmación por WhatsApp a Laura
          </a>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="text-xs text-stone-600 hover:text-stone-900 inline-flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-sage-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar resumen'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-xs text-stone-500 hover:text-stone-800 py-1 px-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Cerrar ventana
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
