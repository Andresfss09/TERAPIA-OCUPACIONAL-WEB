import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Calendar, Clock, CheckCircle2, XCircle, User, ShieldCheck, RefreshCw } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { BookingManager, getInitialBookingDate, isWeekendDate } from '../../lib/bookingStore';
import { servicesData } from '../../data/servicesData';
import { Appointment, TimeSlot } from '../../types';

interface AdminAgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAgendaModal: React.FC<AdminAgendaModalProps> = ({ isOpen, onClose }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>(servicesData[0].id);
  const [patientLabel, setPatientLabel] = useState<string>('');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [dayAppointments, setDayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize date to today (or Monday if Sat/Sun) in local Colombia time
  useEffect(() => {
    setSelectedDate(getInitialBookingDate(new Date()));
  }, []);

  const loadDayData = async () => {
    if (!selectedDate) return;
    setLoading(true);
    try {
      const [daySlots, allBookings] = await Promise.all([
        BookingManager.getDaySlots(selectedDate),
        BookingManager.getBookings(),
      ]);
      setSlots(daySlots);
      setDayAppointments(
        allBookings.filter((b) => b.date === selectedDate && b.status !== 'cancelada')
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated && isOpen) {
      loadDayData();
      const unsub = BookingManager.subscribe(loadDayData);
      return () => unsub();
    }
  }, [authenticated, selectedDate, isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (BookingManager.verifyAdminPassword(passwordInput)) {
      setAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Contraseña incorrecta. Intenta nuevamente.');
    }
  };

  const handleToggleSlot = async (time: string) => {
    const svc = servicesData.find((s) => s.id === selectedSpecialtyId) || servicesData[0];
    const label = patientLabel.trim() || 'Confirmada por WhatsApp';
    await BookingManager.adminToggleSlot(selectedDate, time, svc.id, svc.name, label);
    await loadDayData();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Panel de Administración de Agenda • Laura Rodríguez"
      subtitle="Gestión manual de disponibilidad y bloqueo de horarios confirmados por WhatsApp"
      maxWidth="2xl"
    >
      {!authenticated ? (
        <form onSubmit={handleLogin} className="space-y-4 py-2 text-left max-w-md mx-auto">
          <div className="p-4 rounded-2xl bg-cream-100 border border-stone-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-blush-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif text-base font-bold text-stone-900">
                Acceso exclusivo para Laura
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ingresa la contraseña única de administración para marcar horarios como ocupados o liberar espacios en tiempo real.
              </p>
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {authError}
            </div>
          )}

          <Input
            label="Contraseña de administración"
            type="password"
            placeholder="Ingresa tu clave..."
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
            icon={<Lock className="w-4 h-4" />}
          />

          <div className="flex items-center justify-end pt-2">
            <Button variant="primary" size="md" type="submit" icon={<Unlock className="w-4 h-4" />}>
              Ingresar
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6 text-left animate-fadeIn">
          {/* Top Status Bar */}
          <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-sage-800">
              <ShieldCheck className="w-4 h-4 text-sage-600" />
              <span>Sesión activa • Profesionales activas: 1 (Laura Rodríguez)</span>
            </div>
            <button
              type="button"
              onClick={() => setAuthenticated(false)}
              className="text-xs font-bold text-stone-600 hover:text-stone-900 underline cursor-pointer"
            >
              Cerrar sesión segura
            </button>
          </div>

          {/* Step 1: Date & Specialty Context for Manual Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-cream-100 border border-stone-200">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                1. Fecha a gestionar
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-xl bg-white border border-stone-300 px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:border-blush-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                2. Especialidad (al ocupar)
              </label>
              <select
                value={selectedSpecialtyId}
                onChange={(e) => setSelectedSpecialtyId(e.target.value)}
                className="w-full rounded-xl bg-white border border-stone-300 px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:border-blush-500"
              >
                {servicesData.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                3. Nota / Paciente (opcional)
              </label>
              <input
                type="text"
                placeholder="Ej. María G. (WhatsApp)"
                value={patientLabel}
                onChange={(e) => setPatientLabel(e.target.value)}
                className="w-full rounded-xl bg-white border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-blush-500"
              />
            </div>
          </div>

          {/* Interactive Slot Grid to Toggle Free / Occupied */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blush-500" />
                <span>Haz clic en un horario para marcarlo como Ocupado o Libre:</span>
              </h4>
              <button
                type="button"
                onClick={loadDayData}
                className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Actualizar</span>
              </button>
            </div>

            {loading ? (
              <p className="text-xs text-stone-500 py-4">Cargando horarios...</p>
            ) : slots.length === 0 || isWeekendDate(selectedDate) ? (
              <div className="p-4 rounded-2xl bg-blush-50 border border-blush-200 text-xs text-stone-800">
                La fecha seleccionada corresponde a sábado o domingo (días de descanso). Laura atiende de <strong>lunes a viernes de 8:00 AM a 5:00 PM</strong>.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {slots.map((slot) => {
                  const isOccupied = Boolean(slot.bookedBySpecialty);
                  const isFree = !isOccupied;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => handleToggleSlot(slot.time)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                        isFree
                          ? 'bg-white border-sage-300 hover:border-sage-600 text-stone-900'
                          : 'bg-stone-900 border-stone-900 text-white shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">{slot.time}</span>
                        {isFree ? (
                          <CheckCircle2 className="w-4 h-4 text-sage-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-blush-400" />
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit ${
                          isFree
                            ? 'bg-sage-100 text-sage-800'
                            : 'bg-blush-500/30 text-blush-200'
                        }`}
                      >
                        {isFree
                          ? slot.isPast
                            ? 'Hora pasada hoy'
                            : 'Libre (Clic para ocupar)'
                          : 'Ocupado (Clic para liberar)'}
                      </span>

                      {!isFree && slot.bookedBySpecialty && (
                        <span className="text-[10px] text-stone-300 line-clamp-1">
                          {slot.bookedBySpecialty}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* List of Active Reservations for Selected Date */}
          <div className="space-y-2 pt-3 border-t border-stone-200">
            <h5 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sage-600" />
              <span>Horarios ocupados en esta fecha ({dayAppointments.length})</span>
            </h5>

            {dayAppointments.length === 0 ? (
              <p className="text-xs text-stone-500 italic">
                Todos los horarios de este día están libres para recibir pacientes.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {dayAppointments.map((appt) => (
                  <div
                    key={appt.id || appt.time}
                    className="p-3 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-stone-900 bg-cream-200 px-2.5 py-1 rounded-lg">
                        {appt.time}
                      </span>
                      <div>
                        <p className="font-bold text-stone-900 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-stone-500" />
                          <span>{appt.clientName}</span>
                        </p>
                        <p className="text-[11px] text-blush-600 font-medium">
                          {appt.serviceName} • {appt.clientPhone}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleSlot(appt.time)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      Liberar horario
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
