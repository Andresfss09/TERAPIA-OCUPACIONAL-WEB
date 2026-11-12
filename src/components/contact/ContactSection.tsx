import React, { useState } from 'react';
import { Phone, Mail, Send, ChevronDown, Calendar } from 'lucide-react';
import { therapistProfile } from '../../data/therapistData';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { LegalTabType } from '../legal/LegalModals';

interface ContactSectionProps {
  onOpenBooking: () => void;
  onOpenLegal: (tab: LegalTabType) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking, onOpenLegal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Necesito orden médica para agendar la primera cita de valoración?',
      answer:
        'No es obligatoria. Puedes agendar directamente como consulta particular para Neurodesarrollo, Integración Sensorial, Enfoque ABA, Inclusión Educativa, Neurorehabilitación o Rehabilitación Funcional. Si cuentas con exámenes médicos o informes del colegio, puedes traerlos el día de la cita.',
    },
    {
      question: '¿Todas las sesiones son atendidas directamente por Laura?',
      answer:
        'Sí. Laura Rodríguez es la única profesional a cargo del consultorio, lo que garantiza que tú o tu hijo siempre serán atendidos por la misma especialista, sin rotación de practicantes ni cambios de terapeuta.',
    },
    {
      question: '¿Cómo funciona la reserva sin cruces de horarios?',
      answer:
        'Nuestra página muestra en tiempo real únicamente los horarios libres. Al seleccionar tu hora, el sistema la bloquea y te redirige automáticamente al WhatsApp de Laura (318 575 3889) con el mensaje prellenado para confirmar tu asistencia.',
    },
    {
      question: '¿Es fácil llegar y parquear cerca al consultorio en San Fernando?',
      answer:
        'Sí. Estamos ubicados en el sector salud de San Fernando / Tequendama (Carrera 42 # 5B - 28), a pocas cuadras del Centro Médico Imbanaco y la estación Tequendama del MIO. El edificio cuenta con zonas de parqueo cercanas y acceso con ascensor.',
    },
  ];

  const handleQuickQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptPolicy) return;
    const formatted = `Hola Laura, soy ${name} (${phone}). Te escribo desde tu página web: ${message}`;
    const url = `https://wa.me/${therapistProfile.whatsappNumber}?text=${encodeURIComponent(formatted)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto" className="py-24 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* PART 1: Objection-Handling FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 text-left space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-blush-600 block">
              Resolvemos Tus Inquietudes
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.08]">
              Preguntas frecuentes antes de tu{' '}
              <span className="italic font-normal text-blush-600">primera visita.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Si tienes alguna pregunta adicional sobre un caso específico, puedes escribirnos directamente por WhatsApp al <strong>{therapistProfile.phone}</strong> y Laura te orientará personalmente.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                icon={<Calendar className="w-4 h-4" />}
                onClick={onOpenBooking}
              >
                Reservar Valoración Inicial
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-stone-200 border-t border-b border-stone-200">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5 text-left">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="font-serif text-xl sm:text-2xl font-medium text-stone-900 group-hover:text-blush-600 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blush-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-stone-700 leading-relaxed pr-8 animate-fadeIn">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* PART 2: Location in Cali & Direct Inquiry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch pt-8 border-t border-stone-200">
          
          {/* Left Column: Address, Hours & Map (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 text-left">
            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-blush-600">
                  Ubicación en Cali, Valle del Cauca
                </span>
                <h3 className="font-serif text-3xl font-semibold text-stone-900">
                  Consultorio Laura Rodríguez
                </h3>
                <p className="text-sm text-stone-700 font-medium">
                  {therapistProfile.address} • Sector Salud San Fernando / Tequendama
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200 text-xs text-stone-700">
                <div className="space-y-1.5">
                  <span className="font-bold text-stone-900 uppercase tracking-wider block text-[10px]">
                    Contacto Directo
                  </span>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-sage-600" />
                    <span>{therapistProfile.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blush-500" />
                    <span>{therapistProfile.email}</span>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-stone-900 uppercase tracking-wider block text-[10px]">
                    Horario Clínico
                  </span>
                  <p className="font-semibold text-stone-900">Lun a Vie: 8:00 AM – 5:00 PM</p>
                  <p className="text-stone-500">Sábados, Domingos y Festivos: Cerrado</p>
                </div>
              </div>
            </div>

            {/* Interactive Google Map */}
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-soft aspect-[16/10] bg-stone-200">
              <iframe
                title="Ubicación Consultorio Laura Rodríguez en Cali"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.721458925409!2d-76.54589712411933!3d3.418294796556157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6c0ea6fa815%3A0x7d6a4c281df697c1!2sSan%20Fernando%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses-419!2sco!4v1710000000000!5m2!1ses-419!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right Column: Direct Consultation Form (6 cols) */}
          <div className="lg:col-span-6">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-soft flex flex-col justify-between text-left space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-sage-700">
                  Orientación Sin Costo
                </span>
                <h3 className="font-serif text-3xl font-semibold text-stone-900">
                  ¿Deseas comentarle tu caso a Laura antes de agendar?
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  Escríbenos tu inquietud y te responderemos directamente a tu WhatsApp para indicarte cuál de nuestras 6 especialidades se adapta mejor a tu necesidad.
                </p>
              </div>

              <form onSubmit={handleQuickQuestion} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Tu Nombre Completo"
                    placeholder="Ej. Camila Gómez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Tu WhatsApp"
                    placeholder="Ej. 315 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <Textarea
                  label="¿En qué podemos ayudarte?"
                  placeholder="Cuéntanos brevemente tu consulta o la edad del paciente..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  required
                />

                {/* Ley 1581 Checkbox */}
                <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={acceptPolicy}
                    onChange={(e) => setAcceptPolicy(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-stone-400 text-blush-500 cursor-pointer shrink-0 accent-[#B45F50]"
                  />
                  <span className="text-[11px] text-stone-700 leading-relaxed">
                    Autorizo el tratamiento de mis datos personales para ser contactado(a) vía WhatsApp conforme a la{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal('datos')}
                      className="font-bold text-blush-600 underline hover:text-blush-700 cursor-pointer"
                    >
                      Política de Tratamiento de Datos (Ley 1581 de 2012)
                    </button>. <span className="text-blush-600 font-bold">*</span>
                  </span>
                </label>

                <div className="pt-2">
                  <Button
                    variant="dark"
                    size="lg"
                    type="submit"
                    fullWidth
                    disabled={!acceptPolicy}
                    icon={<Send className="w-4 h-4" />}
                  >
                    Enviar Consulta Directa a WhatsApp (318 575 3889)
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
