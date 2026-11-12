import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Scale } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { therapistProfile } from '../../data/therapistData';

export type LegalTabType = 'datos' | 'cookies' | 'terminos';

interface LegalModalsProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTabType;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  isOpen,
  onClose,
  initialTab = 'datos',
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Marco Legal, Privacidad y Protección de Datos"
      subtitle="En cumplimiento de la legislación colombiana vigente (Ley 1581 de 2012 y normas concordantes)"
      maxWidth="3xl"
    >
      <div className="space-y-5 text-left text-stone-800">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-3 border-b border-stone-200">
          <button
            type="button"
            onClick={() => setActiveTab('datos')}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-all cursor-pointer border ${
              activeTab === 'datos'
                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Política de Datos (Ley 1581)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cookies')}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-all cursor-pointer border ${
              activeTab === 'cookies'
                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Política de Cookies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terminos')}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-all cursor-pointer border ${
              activeTab === 'terminos'
                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Términos de Agendamiento</span>
          </button>
        </div>

        {/* TAB 1: POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES (LEY 1581 DE 2012) */}
        {activeTab === 'datos' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed max-h-[55vh] overflow-y-auto pr-2">
            <div className="p-4 rounded-2xl bg-blush-50 border border-blush-200 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-blush-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Política de Tratamiento y Protección de Datos Personales
                </h4>
                <p className="text-xs text-stone-700 mt-0.5">
                  Adoptada en cumplimiento de la <strong>Ley Estatutaria 1581 de 2012</strong>, el <strong>Decreto Reglamentario 1377 de 2013</strong> (compilado en el Decreto Único 1074 de 2015) y el artículo 15 de la Constitución Política de Colombia (Hábeas Data).
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                1. Identificación del Responsable del Tratamiento
              </h5>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Responsable:</strong> {therapistProfile.name} – Profesional en Terapia Ocupacional ({therapistProfile.registryNumber}).</li>
                <li><strong>Sitio Web Oficial:</strong> {therapistProfile.domain}</li>
                <li><strong>Domicilio y Dirección:</strong> {therapistProfile.address}, {therapistProfile.city}.</li>
                <li><strong>Correo electrónico corporativo:</strong> {therapistProfile.email}</li>
                <li><strong>Teléfono / WhatsApp de contacto:</strong> {therapistProfile.phone}</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                2. Datos Personales Recolectados y Finalidades del Tratamiento
              </h5>
              <p>
                Los datos suministrados voluntariamente por los usuarios y pacientes en este sitio web (nombre completo, número de teléfono/WhatsApp, correo electrónico para verificación anti-spam de reseñas, motivo general de consulta y comentarios) serán recolectados, almacenados y utilizados exclusivamente para las siguientes finalidades:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Gestionar, reservar, confirmar, reprogramar o cancelar citas de Terapia Ocupacional en el consultorio de Laura Rodríguez.</li>
                <li>Bloquear el horario seleccionado en el calendario digital para evitar cruces de agenda con otros pacientes.</li>
                <li>Establecer comunicación directa a través de WhatsApp ({therapistProfile.phone}), llamada telefónica o correo electrónico para brindar indicaciones de llegada y preparación para la consulta.</li>
                <li>Verificar la autenticidad de las reseñas mediante correo electrónico sin exponer jamás la dirección de correo al público.</li>
                <li>Dar cumplimiento a obligaciones legales, clínicas y regulatorias exigidas por las autoridades de salud en Colombia.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                3. Tratamiento de Datos Sensibles (Salud) y de Menores de Edad
              </h5>
              <p>
                De conformidad con los <strong>artículos 5, 6 y 7 de la Ley 1581 de 2012</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Datos relativos a la salud:</strong> Se informa al Titular que por tratarse de datos sensibles no está obligado a autorizar su tratamiento en el formulario web, y el campo de <em>"motivo de consulta"</em> es de carácter facultativo. La información clínica detallada será recabada directamente en consulta bajo estricto <strong>secreto profesional y reserva legal de la Historia Clínica (Ley 23 de 1981 y Resolución 1995 de 1999 del Ministerio de Salud)</strong>.</li>
                <li><strong>Datos de niños, niñas y adolescentes:</strong> Cuando la cita sea agendada para un menor de edad, la autorización debe ser otorgada por su padre, madre, representante legal o acudiente, garantizando siempre el interés superior del menor y el respeto de sus derechos fundamentales.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                4. Derechos de los Titulares (Derechos ARCO - Art. 8 Ley 1581 de 2012)
              </h5>
              <p>Como Titular de tus datos personales tienes derecho en todo momento y de forma gratuita a:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Conocer, actualizar y rectificar</strong> tus datos personales frente al Responsable del Tratamiento.</li>
                <li><strong>Solicitar prueba</strong> de la autorización otorgada.</li>
                <li><strong>Ser informado</strong> respecto del uso que se le ha dado a tus datos personales.</li>
                <li><strong>Revocar la autorización y/o solicitar la supresión</strong> del dato cuando no exista un deber legal o contractual de permanecer en la base de datos.</li>
                <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) por infracciones a lo dispuesto en la Ley 1581 de 2012.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                5. Procedimiento para Ejercer tus Derechos de Hábeas Data
              </h5>
              <p>
                Para realizar consultas, reclamos, correcciones o solicitar la eliminación de tus datos o reseñas, puedes enviar una solicitud al correo <strong>{therapistProfile.email}</strong> o escribir al WhatsApp <strong>{therapistProfile.phone}</strong> indicando tu nombre completo y petición. Las consultas serán atendidas en un término máximo de diez (10) días hábiles y los reclamos en quince (15) días hábiles conforme a los artículos 14 y 15 de la Ley 1581 de 2012.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: POLÍTICA DE COOKIES Y ALMACENAMIENTO LOCAL */}
        {activeTab === 'cookies' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed max-h-[55vh] overflow-y-auto pr-2">
            <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 flex items-start gap-3">
              <Cookie className="w-6 h-6 text-sage-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Política de Uso de Cookies y Almacenamiento Local
                </h4>
                <p className="text-xs text-stone-700 mt-0.5">
                  En cumplimiento de los lineamientos de la Superintendencia de Industria y Comercio (SIC) de Colombia sobre transparencia en tecnologías de rastreo y almacenamiento.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                1. ¿Qué son las cookies y el almacenamiento local?
              </h5>
              <p>
                Las cookies y el almacenamiento local (<em>LocalStorage</em>) son pequeños archivos de datos que tu navegador guarda en tu dispositivo (celular o computador) cuando visitas nuestra página web para recordar acciones básicas y garantizar que la agenda funcione correctamente.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                2. ¿Qué tipos de tecnologías utilizamos en este sitio?
              </h5>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Cookies y Almacenamiento Estrictamente Necesarios (Técnicos):</strong> Son indispensables para sincronizar los horarios ocupados de la agenda en tiempo real, recordar que ya aceptaste o configuraste el aviso de privacidad y evitar que dos personas reserven la misma hora.
                </li>
                <li>
                  <strong>Cookies de Funcionalidad y Multimedia:</strong> Permiten mostrar correctamente los videos educativos embebidos de cada especialidad, las reseñas verificadas y el mapa interactivo de ubicación en Cali.
                </li>
                <li>
                  <strong>Sin Cookies Publicitarias Invasivas:</strong> En el consultorio de Laura Rodríguez <strong>no vendemos ni cedemos tus datos a terceros</strong> con fines de publicidad comercial o spam.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: TÉRMINOS Y CONDICIONES DEL AGENDAMIENTO */}
        {activeTab === 'terminos' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed max-h-[55vh] overflow-y-auto pr-2">
            <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200 flex items-start gap-3">
              <Scale className="w-6 h-6 text-lavender-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Condiciones del Servicio de Agendamiento en Línea
                </h4>
                <p className="text-xs text-stone-700 mt-0.5">
                  Reglas claras y amables para cuidar el tiempo de todos los pacientes en el consultorio.
                </p>
              </div>
            </div>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Atención exclusiva con Laura Rodríguez:</strong> Todas las valoraciones y sesiones son realizadas directamente por Laura Rodríguez como única profesional a cargo, por lo que cada horario bloqueado aplica para toda la agenda del consultorio.
              </li>
              <li>
                <strong>Confirmación vía WhatsApp ({therapistProfile.phone}):</strong> Al seleccionar un horario libre, el sistema bloqueará tu espacio y te redirigirá a WhatsApp con el mensaje prellenado para confirmar tu cita directamente con nosotros.
              </li>
              <li>
                <strong>Puntualidad y Reprogramación:</strong> Cada sesión reserva entre 50 y 60 minutos exclusivos para ti. Si no puedes asistir, te pedimos avisar por WhatsApp con al menos <strong>12 horas de anticipación</strong> para liberar el espacio a otro paciente que lo necesite.
              </li>
              <li>
                <strong>Ética y Secreto Profesional:</strong> Toda atención en Terapia Ocupacional se rige por la Ley 949 de 2005 (Ejercicio de la Terapia Ocupacional en Colombia) y la reserva legal de historia clínica.
              </li>
            </ul>
          </div>
        )}

        {/* Footer Button */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
          <span className="font-serif italic text-sm text-stone-600">
            Tu confianza y privacidad están protegidas en nuestro consultorio.
          </span>
          <Button variant="primary" size="sm" onClick={onClose}>
            Entendido
          </Button>
        </div>

      </div>
    </Modal>
  );
};
