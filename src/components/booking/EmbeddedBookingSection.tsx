import React, { useState, useEffect, useCallback } from 'react';
import { User, Phone, CheckCircle2, AlertCircle, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
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
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { LegalTabType } from '../legal/LegalModals';

interface EmbeddedBookingSectionProps {
  onBookingSuccess: (appointment: Appointment) => void;
  onOpenLegal: (tab: LegalTabType) => void;
}

export const EmbeddedBookingSection: React.FC<EmbeddedBookingSectionProps> = ({
  onBookingSuccess,
  onOpenLegal,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(servicesData[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(() => getInitialBookingDate(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [allDaySlots, setAllDaySlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Live Clock State (Cali, Colombia)
  const [now, setNow] = useState<Date>(() => new Date());

  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [acceptDataPolicy, setAcceptDataPolicy] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Tick live clock every second so date & time in Cali are 100% live
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadSlots = useCallback(async () => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    try {
      const [daySlots, freeSlots] = await Promise.all([
        BookingManager.getDaySlots(selectedDate),
        BookingManager.getAvailableDaySlots(selectedDate),
      ]);
      setAllDaySlots(daySlots);
      setAvailableSlots(freeSlots);

      setSelectedTime((prevTime) => {
        if (prevTime && freeSlots.some((s) => s.time === prevTime)) {
          return prevTime;
        }
        return freeSlots[0]?.time || '';
      });
    } finally {
      setLoadingSlots(false);
    }
  }, [selectedDate]);

  // Load slots on date change, on real-time booking events, and every 30s for live hour transitions
  useEffect(() => {
    loadSlots();
    const unsubscribe = BookingManager.subscribe(loadSlots);
    const interval = setInterval(loadSlots, 30000);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [loadSlots]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedDate || !selectedTime) {
      setErrorMessage('Por favor selecciona una fecha y un horario disponible.');
      return;
    }

    if (isWeekendDate(selectedDate)) {
      setErrorMessage('Laura atiende de lunes a viernes de 8:00 AM a 5:00 PM. Elige un día hábil.');
      return;
    }

    const cleanPhone = clientPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Ingresa un número de WhatsApp válido (mínimo 10 dígitos).');
      return;
    }

    if (!clientName || clientName.trim().length < 3) {
      setErrorMessage('Por favor ingresa el nombre completo del paciente o acudiente.');
      return;
    }

    if (!acceptDataPolicy) {
      setErrorMessage('Debes autorizar el tratamiento de datos personales (Ley 1581 de 2012) para agendar.');
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
      notes: notes.trim() || undefined,
      status: 'confirmada',
      source: 'web',
    };

    const result = await BookingManager.bookAppointment(appointment);
    setSubmitting(false);

    if (result.success) {
      // Immediately refresh slots so the booked time is locked on screen
      await loadSlots();
      const whatsappUrl = BookingManager.generateWhatsAppUrl(appointment);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      onBookingSuccess(appointment);
      setClientName('');
      setClientPhone('');
      setNotes('');
      setAcceptDataPolicy(false);
    } else {
      setErrorMessage(result.message || 'Este horario ya no está disponible.');
      await loadSlots();
    }
  };

  const occupiedCount = allDaySlots.filter((s) => !s.available && !s.isPast).length;

  return (
    <section id="agenda-directa" className="py-20 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle Radial Warm Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blush-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-sage-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header + Real-Time Cali Clock Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-blush-300">
              <span className="w-2 h-2 rounded-full bg-sage-400 animate-pulse" />
              Sistema Anti-Cruces en Tiempo Real • WhatsApp 318 575 3889
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-semibold text-white tracking-tight leading-[1.1]">
              Separa tu cita con Laura en menos de{' '}
              <span className="text-blush-300 underline decoration-blush-400/50 decoration-2 underline-offset-8">
                un minuto.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              Laura trabaja de <strong className="text-white">lunes a viernes de 8:00 AM a 5:00 PM</strong>. Apenas confirmas tu cita, el horario elegido queda <strong className="text-white">bloqueado al instante</strong> para que ningún otro paciente pueda cruzarlo.
            </p>
          </div>

          {/* Live Clock & Schedule Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-stone-800/90 border border-stone-700 shadow-lg space-y-1.5 shrink-0">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-sage-300">
              <Clock className="w-4 h-4 text-sage-400 animate-pulse" />
              <span>Hora en Vivo • Cali, Colombia</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white capitalize">
              {liveDateLabel}
            </p>
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-stone-700 text-xs">
              <span className="font-mono font-bold text-blush-300 text-sm">
                {liveTimeLabel}
              </span>
              <span className="text-stone-300 font-semibold">
                Lun – Vie: 8:00 AM – 5:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Main Interactive Booking Console */}
        <form
          onSubmit={handleSubmit}
          className="rounded-4xl bg-white text-stone-900 p-5 sm:p-10 lg:p-12 shadow-2xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 text-left"
        >
          {/* Left Column: Step 1 (Specialty) & Step 2 (Date & Available Hours) — 7 cols */}
          <div className="lg:col-span-7 space-y-8 lg:pr-6 lg:border-r lg:border-stone-200">
            
            {/* 1. Select Specialty */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
                  1. Selecciona la especialidad clínica
                </label>
                <span className="text-xs font-bold text-blush-600 bg-blush-50 px-3 py-1 rounded-full border border-blush-200">
                  {selectedService.durationMinutes} min • {selectedService.priceEstimated}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {servicesData.map((svc) => {
                  const isSelected = selectedServiceId === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setSelectedServiceId(svc.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-blush-500 text-white border-blush-500 shadow-md'
                          : 'bg-cream-50 hover:bg-cream-100 text-stone-800 border-stone-300 hover:border-blush-400'
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-sm font-bold leading-snug ${
                          isSelected ? 'text-white' : 'text-stone-800'
                        }`}
                      >
                        {svc.name}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Select Day (Starting from TODAY, Mon-Fri) & Available Slot (8:00 AM - 5:00 PM) */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <label className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 block">
                    2. Elige fecha y horario libre ({availableSlots.length} disponibles)
                  </label>
                  <p className="text-xs text-stone-600 font-medium mt-0.5 capitalize">
                    Fecha seleccionada: <strong className="text-stone-900">{selectedDateHuman}</strong>
                    {selectedDate === todayYMD ? ' (Hoy)' : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-stone-600">Otra fecha:</span>
                  <input
                    type="date"
                    min={todayYMD}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime('');
                    }}
                    className="text-xs border border-stone-300 rounded-full px-3.5 py-1.5 bg-cream-50 text-stone-900 font-bold focus:outline-none focus:border-blush-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Quick 6 Workdays (Starts with TODAY if today is Mon-Fri) */}
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
                      className={`py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blush-500 text-white border-blush-500 shadow-md scale-[1.02]'
                          : 'bg-cream-50 hover:bg-cream-100 text-stone-800 border-stone-300'
                      }`}
                    >
                      <span
                        className={`block text-[10px] uppercase tracking-wider font-extrabold ${
                          isSelected ? 'text-white' : d.isToday ? 'text-blush-600' : 'text-stone-600'
                        }`}
                      >
                        {d.dayName}
                      </span>
                      <span
                        className={`block text-lg font-serif font-bold my-0.5 ${
                          isSelected ? 'text-white' : 'text-stone-900'
                        }`}
                      >
                        {d.dayNum}
                      </span>
                      <span
                        className={`block text-[10px] font-semibold ${
                          isSelected ? 'text-white/90' : 'text-stone-600'
                        }`}
                      >
                        {d.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Strictly Available Slots Grid (8:00 AM to 5:00 PM) */}
              <div className="pt-2 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sage-600" />
                    Horarios libres de Laura (Jornada: 8:00 AM a 5:00 PM):
                  </span>
                  {occupiedCount > 0 && (
                    <span className="text-[11px] font-semibold text-stone-500">
                      {occupiedCount} {occupiedCount === 1 ? 'horario ya reservado y oculto' : 'horarios ya reservados y ocultos'}
                    </span>
                  )}
                </div>

                {loadingSlots ? (
                  <p className="text-xs text-stone-600 py-4">Consultando disponibilidad en vivo...</p>
                ) : isWeekendSelected ? (
                  <div className="p-4 rounded-2xl bg-blush-50 border border-blush-200 text-xs text-stone-800 space-y-2">
                    <p className="font-bold text-blush-700">
                      Consultorio cerrado los fines de semana (sábados y domingos).
                    </p>
                    <p>
                      Laura Rodríguez atiende exclusivamente de <strong>lunes a viernes de 8:00 AM a 5:00 PM</strong>. Por favor selecciona un día hábil.
                    </p>
                    {upcomingDays[0] && (
                      <button
                        type="button"
                        onClick={() => setSelectedDate(upcomingDays[0].dateStr)}
                        className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blush-500 text-white font-bold text-xs cursor-pointer"
                      >
                        Ir a {upcomingDays[0].fullLabel}
                      </button>
                    )}
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-blush-50 border border-blush-200 text-xs text-stone-800 space-y-2">
                    <p className="font-bold text-blush-700">
                      {selectedDate === todayYMD
                        ? 'Los horarios de hoy (8:00 AM a 5:00 PM) ya finalizaron o están reservados.'
                        : 'Todos los horarios de este día ya fueron reservados.'}
                    </p>
                    {upcomingDays[1] && (
                      <button
                        type="button"
                        onClick={() => setSelectedDate(upcomingDays[1].dateStr)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blush-500 text-white font-bold text-xs cursor-pointer"
                      >
                        Ver horarios libres de mañana ({upcomingDays[1].dayName} {upcomingDays[1].dayNum} {upcomingDays[1].monthName})
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
                          className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-sage-600 text-white border-sage-600 font-bold shadow-md scale-[1.02]'
                              : 'bg-cream-50 hover:border-blush-400 text-stone-800 border-stone-300 font-bold'
                          }`}
                        >
                          <span
                            className={`text-xs sm:text-sm block ${
                              isSelected ? 'text-white' : 'text-stone-900'
                            }`}
                          >
                            {slot.time}
                          </span>
                          <span
                            className={`text-[10px] block mt-0.5 ${
                              isSelected ? 'text-white/95' : 'text-sage-700'
                            }`}
                          >
                            {isSelected ? '✓ Seleccionado' : '● Libre en vivo'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Step 3 (Patient Data & Instant Lock + WhatsApp Confirmation) — 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <label className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 block">
                3. Tus datos para bloquear el horario
              </label>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Input
                label="Nombre completo"
                placeholder="Ej. Carolina Méndez"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                icon={<User className="w-4 h-4" />}
              />

              <Input
                label="Tu WhatsApp de contacto"
                placeholder="Ej. 315 642 9815"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
                icon={<Phone className="w-4 h-4" />}
              />

              <Textarea
                label="Motivo general de consulta (opcional)"
                placeholder="Cuéntame brevemente la edad del paciente o el motivo de la valoración..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />

              {/* Ley 1581 Habeas Data Checkbox */}
              <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptDataPolicy}
                  onChange={(e) => setAcceptDataPolicy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-stone-400 text-blush-500 cursor-pointer shrink-0 accent-[#B45F50]"
                />
                <span className="text-[11px] text-stone-700 leading-relaxed">
                  Autorizo a <strong className="text-stone-900">Laura Rodríguez</strong> para el tratamiento de mis datos personales según la{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegal('datos')}
                    className="font-bold text-blush-600 underline hover:text-blush-700 cursor-pointer"
                  >
                    Política de Datos (Ley 1581 de 2012)
                  </button>
                  . El suministro de datos sensibles o de menores es facultativo. <span className="text-blush-600 font-bold">*</span>
                </span>
              </label>
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="p-3 rounded-2xl bg-cream-100 border border-stone-200 space-y-1 text-xs">
                <div className="flex items-center justify-between text-stone-700">
                  <span className="font-semibold">Fecha elegida:</span>
                  <span className="font-bold text-stone-900 capitalize">
                    {selectedDateHuman}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-700">
                  <span className="font-semibold">Hora a bloquear:</span>
                  <span className="font-extrabold text-sage-700">
                    {selectedTime || 'Selecciona una hora libre'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-600 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                  <span>Al confirmar, este horario queda bloqueado al instante para ti.</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                fullWidth
                disabled={submitting || !selectedTime || isWeekendSelected}
                icon={<MessageCircle className="w-4 h-4" />}
              >
                {submitting ? 'Bloqueando horario...' : 'Confirmar y Bloquear Cita por WhatsApp'}
              </Button>
            </div>
          </div>

        </form>

      </div>
    </section>
  );
};
