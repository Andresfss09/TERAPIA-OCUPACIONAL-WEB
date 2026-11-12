import React, { useState, useEffect, useCallback } from 'react';
import { Clock, User, Phone, Mail, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle, MessageCircle } from 'lucide-react';
import { Appointment, TimeSlot } from '../../types';
import { servicesData } from '../../data/servicesData';
import {
  BookingManager,
  formatLocalYMD,
  getInitialBookingDate,
  getUpcomingWorkDays,
  isWeekendDate,
  parseLocalYMD,
} from '../../lib/bookingStore';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { LegalTabType } from '../legal/LegalModals';

interface BookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  onBookingSuccess: (appointment: Appointment) => void;
  onOpenLegal: (tab: LegalTabType) => void;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  onBookingSuccess,
  onOpenLegal,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(() => getInitialBookingDate(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  const [now, setNow] = useState<Date>(() => new Date());

  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [acceptDataPolicy, setAcceptDataPolicy] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Live clock while modal is open
  useEffect(() => {
    if (!isOpen) return;
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
      setCurrentStep(2);
    } else {
      setSelectedServiceId(servicesData[0].id);
      setCurrentStep(1);
    }
  }, [preselectedServiceId, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(getInitialBookingDate(new Date()));
    }
  }, [isOpen]);

  const loadSlots = useCallback(async () => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    setErrorMessage('');
    try {
      const freeSlots = await BookingManager.getAvailableDaySlots(selectedDate);
      setAvailableSlots(freeSlots);
      setSelectedTime((prevTime) => {
        if (prevTime && freeSlots.some((s) => s.time === prevTime)) {
          return prevTime;
        }
        return freeSlots[0]?.time || '';
      });
    } catch (e) {
      console.error('Error loading slots:', e);
    } finally {
      setLoadingSlots(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!isOpen) return;
    loadSlots();
    const unsubscribe = BookingManager.subscribe(loadSlots);
    const interval = setInterval(loadSlots, 30000);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [loadSlots, isOpen]);

  const selectedService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];
  const upcomingDays = getUpcomingWorkDays(6, now);
  const todayYMD = formatLocalYMD(now);
  const isWeekendSelected = isWeekendDate(selectedDate);

  const liveDateLabel = now.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const liveTimeLabel = now.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const selectedDateHuman = selectedDate
    ? parseLocalYMD(selectedDate).toLocaleDateString('es-CO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const handleNextFromStep1 = () => {
    if (!selectedServiceId) {
      setErrorMessage('Por favor selecciona una especialidad.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    if (!selectedDate || isWeekendSelected) {
      setErrorMessage('Por favor selecciona un día hábil de lunes a viernes.');
      return;
    }
    if (!selectedTime) {
      setErrorMessage('Por favor selecciona un horario disponible.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(3);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanPhone = clientPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Por favor ingresa un número de WhatsApp válido (mínimo 10 dígitos).');
      return;
    }

    if (!clientName || clientName.trim().length < 3) {
      setErrorMessage('Por favor ingresa tu nombre completo.');
      return;
    }

    if (!acceptDataPolicy) {
      setErrorMessage('Debes autorizar el tratamiento de tus datos personales conforme a la Ley 1581 de 2012 para continuar.');
      return;
    }

    setSubmitting(true);

    const appointment: Appointment = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || undefined,
      notes: notes.trim() || undefined,
      status: 'confirmada',
      source: 'web',
    };

    const result = await BookingManager.bookAppointment(appointment);
    setSubmitting(false);

    if (result.success) {
      await loadSlots();
      const whatsappUrl = BookingManager.generateWhatsAppUrl(appointment);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      onBookingSuccess(appointment);
      onClose();
      setCurrentStep(1);
      setSelectedTime('');
      setClientName('');
      setClientPhone('');
      setClientEmail('');
      setNotes('');
      setAcceptDataPolicy(false);
    } else {
      setErrorMessage(result.message || 'Error al agendar la cita. Por favor intenta de nuevo.');
      await loadSlots();
      setSelectedTime('');
      setCurrentStep(2);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reservar Cita con Laura Rodríguez"
      subtitle="Lunes a Viernes de 8:00 AM a 5:00 PM • Bloqueo inmediato sin cruces"
      maxWidth="2xl"
    >
      <div className="space-y-5">
        
        {/* Live Clock Banner inside Modal */}
        <div className="p-3 rounded-2xl bg-cream-100 border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-stone-800">
            <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
            <span className="capitalize">Hoy en Cali: {liveDateLabel}</span>
          </div>
          <span className="font-mono font-bold text-blush-600">
            {liveTimeLabel} • Lun a Vie (8:00 AM – 5:00 PM)
          </span>
        </div>

        {/* Step Indicator Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep === 1
                ? 'bg-blush-500 text-white'
                : currentStep > 1
                ? 'bg-sage-600 text-white'
                : 'bg-stone-200 text-stone-700'
            }`}>
              {currentStep > 1 ? '✓' : '1'}
            </span>
            <span className={`text-xs font-bold ${currentStep === 1 ? 'text-stone-900' : 'text-stone-500'}`}>
              Especialidad
            </span>
          </div>

          <div className="w-8 h-0.5 bg-stone-200"></div>

          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep === 2
                ? 'bg-blush-500 text-white'
                : currentStep > 2
                ? 'bg-sage-600 text-white'
                : 'bg-stone-200 text-stone-700'
            }`}>
              {currentStep > 2 ? '✓' : '2'}
            </span>
            <span className={`text-xs font-bold ${currentStep === 2 ? 'text-stone-900' : 'text-stone-500'}`}>
              Horario Libre
            </span>
          </div>

          <div className="w-8 h-0.5 bg-stone-200"></div>

          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep === 3
                ? 'bg-blush-500 text-white'
                : 'bg-stone-200 text-stone-700'
            }`}>
              3
            </span>
            <span className={`text-xs font-bold ${currentStep === 3 ? 'text-stone-900' : 'text-stone-500'}`}>
              Confirmar en WhatsApp
            </span>
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Select Service */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1 text-left">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                1. Elige la especialidad que necesitas
              </h4>
              <p className="text-xs text-stone-600">
                Todas las especialidades son atendidas directamente por Laura Rodríguez.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
              {servicesData.map((svc) => {
                const isSelected = selectedServiceId === svc.id;

                return (
                  <div
                    key={svc.id}
                    onClick={() => setSelectedServiceId(svc.id)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 text-left ${
                      isSelected
                        ? 'border-blush-500 bg-blush-50/70 shadow-sm'
                        : 'border-stone-200 hover:border-blush-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-serif text-sm font-bold text-stone-900 leading-tight">
                        {svc.name}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-blush-600 shrink-0 mt-0.5" />
                      )}
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2">
                      {svc.shortDescription}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-stone-200">
                      <span>{svc.durationMinutes} min</span>
                      <span className="font-bold text-sage-700">{svc.priceEstimated || 'Consultar'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 flex justify-end">
              <Button
                variant="primary"
                size="md"
                icon={<ChevronRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={handleNextFromStep1}
              >
                Ver Horarios Libres
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Choose Date & Available Slot */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  2. Elige el día hábil y un horario libre
                </h4>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-bold text-blush-600 hover:underline cursor-pointer"
                >
                  Cambiar especialidad
                </button>
              </div>
              <p className="text-xs text-stone-600">
                Especialidad: <strong className="text-stone-900">{selectedService.name}</strong> ({selectedService.durationMinutes} min)
              </p>
            </div>

            {/* Quick Date Selector Chips (Starts with TODAY if Mon-Fri) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700">
                Días hábiles de atención (Lunes a Viernes):
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {upcomingDays.map((d) => {
                  const isSelected = selectedDate === d.dateStr;

                  return (
                    <button
                      key={d.dateStr}
                      type="button"
                      onClick={() => {
                        setSelectedDate(d.dateStr);
                        setSelectedTime('');
                      }}
                      className={`p-2 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blush-500 bg-blush-500 text-white shadow-soft scale-102'
                          : 'border-stone-200 hover:border-blush-300 bg-white text-stone-800'
                      }`}
                    >
                      <span className={`block text-[10px] uppercase font-extrabold ${isSelected ? 'text-white' : d.isToday ? 'text-blush-600' : 'text-stone-600'}`}>
                        {d.dayName}
                      </span>
                      <span className={`block text-base font-extrabold my-0.5 ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                        {d.dayNum}
                      </span>
                      <span className={`block text-[10px] ${isSelected ? 'text-white/90' : 'text-stone-600'}`}>
                        {d.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Date Input Fallback */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-xs font-semibold text-stone-700 capitalize">
                Fecha elegida: <strong className="text-stone-900">{selectedDateHuman}</strong>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-600">Calendario:</span>
                <input
                  type="date"
                  min={todayYMD}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime('');
                  }}
                  className="text-xs border-2 border-stone-300 rounded-xl px-3 py-1.5 bg-white text-stone-900 font-bold focus:outline-none focus:border-blush-400"
                />
              </div>
            </div>

            {/* Strictly Available Time Slots Grid */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blush-500" />
                  Horarios libres en vivo (8:00 AM a 5:00 PM):
                </span>
                <span className="text-[11px] text-sage-700 font-bold">
                  {availableSlots.length} disponibles
                </span>
              </div>

              {loadingSlots ? (
                <div className="py-8 text-center text-xs text-stone-600 animate-pulse">
                  Consultando disponibilidad en tiempo real...
                </div>
              ) : isWeekendSelected ? (
                <div className="p-4 rounded-2xl bg-blush-50 border border-blush-200 text-stone-800 text-xs text-center space-y-2">
                  <p className="font-bold text-blush-700">
                    Laura atiende únicamente de lunes a viernes de 8:00 AM a 5:00 PM.
                  </p>
                  <p>Los sábados, domingos y festivos el consultorio permanece cerrado.</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="p-4 rounded-2xl bg-blush-50 border border-blush-200 text-stone-800 text-xs text-center space-y-2">
                  <p className="font-bold text-blush-700">
                    {selectedDate === todayYMD
                      ? 'Los horarios de hoy ya finalizaron o están reservados.'
                      : 'Todos los horarios de este día ya fueron ocupados.'}
                  </p>
                  {upcomingDays[1] && (
                    <button
                      type="button"
                      onClick={() => setSelectedDate(upcomingDays[1].dateStr)}
                      className="px-3.5 py-1.5 rounded-full bg-blush-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Ver horarios libres de {upcomingDays[1].dayName} {upcomingDays[1].dayNum} {upcomingDays[1].monthName}
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedTime === slot.time;

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-3 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-sage-600 text-white border-sage-600 shadow-soft scale-102 font-bold'
                            : 'bg-white hover:bg-blush-50 border-stone-200 text-stone-800 hover:border-blush-300 font-bold'
                        }`}
                      >
                        <span className={`text-xs block ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                          {slot.time}
                        </span>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-white/95' : 'text-sage-700'}`}>
                          {isSelected ? '✓ Seleccionado' : '● Libre en vivo'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-stone-200">
              <Button
                variant="ghost"
                size="sm"
                icon={<ChevronLeft className="w-4 h-4" />}
                onClick={() => setCurrentStep(1)}
              >
                Volver
              </Button>

              <Button
                variant="primary"
                size="md"
                disabled={!selectedTime || availableSlots.length === 0 || isWeekendSelected}
                icon={<ChevronRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={handleNextFromStep2}
              >
                Continuar a Confirmación
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Client Details + WhatsApp Redirect */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmitBooking} className="space-y-4 animate-fadeIn text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  3. Tus datos para bloquear el horario y confirmar
                </h4>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-bold text-blush-600 hover:underline cursor-pointer"
                >
                  Cambiar fecha/hora
                </button>
              </div>
              <p className="text-xs text-stone-600 capitalize">
                Reserva para: <strong className="text-stone-900">{selectedDateHuman}</strong> a las <strong className="text-stone-900">{selectedTime}</strong> ({selectedService.name}).
              </p>
            </div>

            <div className="space-y-3">
              <Input
                label="Nombre completo del paciente o acudiente"
                placeholder="Ej. María Fernanda Gómez"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                icon={<User className="w-4 h-4" />}
              />

              <Input
                label="Número de WhatsApp"
                placeholder="Ej. 315 642 9815"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
                helperText="Al confirmar, el horario queda bloqueado y se abre el WhatsApp de Laura (318 575 3889)."
                icon={<Phone className="w-4 h-4" />}
              />

              <Input
                label="Correo electrónico (opcional)"
                type="email"
                placeholder="ejemplo@correo.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
              />

              <Textarea
                label="Motivo general de consulta o notas (opcional / facultativo)"
                placeholder="Si deseas, cuéntame brevemente qué te gustaría trabajar en sesión..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>

            {/* Mandatory Colombian Habeas Data Authorization (Ley 1581 de 2012) */}
            <div className="p-3.5 rounded-2xl bg-blush-50/70 border border-blush-200 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptDataPolicy}
                  onChange={(e) => setAcceptDataPolicy(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-blush-300 text-blush-500 focus:ring-blush-400 cursor-pointer shrink-0 accent-[#B45F50]"
                />
                <span className="text-xs text-stone-700 leading-relaxed">
                  Autorizo de manera previa, expresa e informada a <strong className="text-stone-900">Laura Rodríguez</strong> para el tratamiento de mis datos personales con el fin de gestionar esta cita, conforme a la{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegal('datos')}
                    className="font-bold text-blush-600 underline hover:text-blush-700 cursor-pointer"
                  >
                    Política de Tratamiento de Datos (Ley 1581 de 2012)
                  </button>
                  . Comprendo que suministrar datos sensibles de salud o de menores de edad es facultativo (Art. 6 y 7 Ley 1581). <span className="text-blush-600 font-bold">*</span>
                </span>
              </label>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-stone-200">
              <Button
                variant="ghost"
                size="sm"
                type="button"
                icon={<ChevronLeft className="w-4 h-4" />}
                onClick={() => setCurrentStep(2)}
              >
                Volver
              </Button>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={submitting}
                icon={<MessageCircle className="w-5 h-5" />}
              >
                {submitting ? 'Bloqueando horario...' : 'Confirmar y Bloquear por WhatsApp'}
              </Button>
            </div>
          </form>
        )}

      </div>
    </Modal>
  );
};
