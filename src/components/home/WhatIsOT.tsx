import React, { useState } from 'react';
import { Calendar, Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface WhatIsOTProps {
  onExploreServices: () => void;
  onOpenBooking?: (serviceId?: string) => void;
}

export const WhatIsOT: React.FC<WhatIsOTProps> = ({ onExploreServices, onOpenBooking }) => {
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      id: 'neurodesarrollo',
      tabLabel: '01. Neurodesarrollo',
      quote: '«Busco estimular a tiempo los hitos motores, de coordinación y juego de mi bebé o niño pequeño.»',
      title: 'Neurodesarrollo e Intervención Temprana',
      subtitle: 'Primera infancia, bebés y etapa preescolar',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
      signs: [
        'Tardanza en el sostén cefálico, rolado, sentado, gateo o marcha.',
        'Dificultad para agarrar juguetes, usar ambas manos o coordinar ojo-mano.',
        'Tono muscular bajo (hipotonía) o rigidez al moverse.',
        'Retos para iniciar el juego autónomo o imitar gestos cotidianos.',
      ],
      outcome:
        'Acompañamos la maduración del sistema nervioso mediante juego clínico estructurado para potenciar las bases motoras, cognitivas y adaptativas en la etapa de mayor neuroplasticidad.',
      ctaText: 'Agendar Valoración de Neurodesarrollo',
    },
    {
      id: 'integracion-sensorial',
      tabLabel: '02. Integración Sensorial',
      quote: '«A mi hijo le incomodan las etiquetas de la ropa, los ruidos fuertes, las texturas de comida o está en constante movimiento.»',
      title: 'Enfoque de Integración Sensorial',
      subtitle: 'Regulación vestibular, propioceptiva y táctil',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80',
      signs: [
        'Rechazo intenso a etiquetas de ropa, corte de cabello, cepillado de dientes o ruidos.',
        'Selectividad alimentaria severa frente a ciertas texturas o temperaturas.',
        'Búsqueda constante de movimiento, giros, saltos o choques contra objetos.',
        'Torpeza motora, caídas frecuentes o dificultad para sostener el lápiz con fuerza adecuada.',
      ],
      outcome:
        'En nuestro espacio sensorial especializado ayudamos a que el cerebro procese y organice los estímulos sin sobrecargarse, logrando calma emocional, mejor atención y disfrute diario.',
      ctaText: 'Agendar Integración Sensorial',
    },
    {
      id: 'enfoque-aba',
      tabLabel: '03. Enfoque ABA',
      quote: '«Queremos fortalecer la regulación emocional, el seguimiento de rutinas y la independencia diaria con respeto y afecto.»',
      title: 'Intervención Ocupacional con Enfoque ABA',
      subtitle: 'Conductas adaptativas, rutinas y autonomía funcional',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
      signs: [
        'Frustración intensa ante cambios de rutina o transiciones entre actividades.',
        'Necesidad de apoyo constante para vestirse, comer, lavarse los dientes o ir al baño.',
        'Dificultad para sostener la atención en actividades estructuradas o escolares.',
        'Retos en habilidades sociales, turnos de juego y comunicación funcional.',
      ],
      outcome:
        'Aplicamos el Análisis Conductual Aplicado (ABA) contemporáneo y naturalista para enseñar habilidades paso a paso mediante refuerzo positivo y estrategias visuales para casa.',
      ctaText: 'Agendar Sesión Enfoque ABA',
    },
    {
      id: 'inclusion-educativa',
      tabLabel: '04. Inclusión Educativa',
      quote: '«Necesitamos que el colegio comprenda las necesidades de mi hijo y adapte el aula para que aprenda feliz.»',
      title: 'Asesoramiento y Acompañamiento en Inclusión Educativa',
      subtitle: 'Articulación familia, estudiante e institución educativa',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
      signs: [
        'Reportes frecuentes del colegio por fatiga visual, postura en el pupitre o desatención.',
        'Dificultad en el agarre del lápiz, velocidad de escritura o manejo de tijeras y cuadernos.',
        'Necesidad de diseñar o actualizar el PIAR y los ajustes razonables en el aula.',
        'Sobrecarga sensorial en el salón de clases, recreos o comedor escolar.',
      ],
      outcome:
        'Trabajamos en equipo con docentes y coordinadores para implementar ajustes sensoriales, ergonómicos y pedagógicos reales que permitan al estudiante brillar en su colegio.',
      ctaText: 'Agendar Asesoría en Inclusión',
    },
    {
      id: 'neurorehabilitacion',
      tabLabel: '05. Neurorehabilitación',
      quote: '«Después de un ACV o diagnóstico neurológico, buscamos recuperar el movimiento y la autonomía en el hogar.»',
      title: 'Neurorehabilitación Funcional y Cognitiva',
      subtitle: 'Reaprendizaje motor y neurológico en jóvenes y adultos',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80',
      signs: [
        'Secuelas motoras o sensitivas tras un Accidente Cerebrovascular (ACV) o trauma.',
        'Diagnóstico de enfermedad de Parkinson, esclerosis múltiple o lesión nerviosa.',
        'Pérdida de coordinación, memoria de trabajo o atención en tareas cotidianas.',
        'Necesidad de entrenar el vestido, baño y alimentación sin depender 100% de otros.',
      ],
      outcome:
        'Estimulamos la neuroplasticidad cerebral a través de tareas significativas y orientamos a los cuidadores para recuperar el mayor grado posible de independencia y calidad de vida.',
      ctaText: 'Agendar Neurorehabilitación',
    },
    {
      id: 'rehabilitacion-funcional',
      tabLabel: '06. Rehabilitación Funcional',
      quote: '«Tuve una lesión, cirugía o dolor al mover mis manos y brazos, y quiero volver a mis actividades sin dolor.»',
      title: 'Rehabilitación Funcional y Desempeño Ocupacional',
      subtitle: 'Recuperación física, miembro superior y ergonomía',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
      signs: [
        'Rigidez, dolor o falta de fuerza en mano, muñeca u hombro tras fractura o cirugía.',
        'Tendinitis, síndrome del túnel carpiano o fatiga por trabajo en computador.',
        'Limitación para abrir frascos, escribir, cocinar, vestirse o conducir.',
        'Necesidad de readaptar el puesto de trabajo o el hogar para proteger las articulaciones.',
      ],
      outcome:
        'Reentrenamos la fuerza, la destreza fina y la ergonomía postural con ejercicios funcionales personalizados para que retomes tu vida laboral y familiar con seguridad.',
      ctaText: 'Agendar Rehabilitación Funcional',
    },
  ];

  const current = cases[activeCase];

  return (
    <section id="que-es-to" className="py-16 sm:py-24 bg-cream-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-14">
          <div className="lg:col-span-7 text-left space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-blush-600 block">
              Diagnóstico de Necesidades • 6 Especialidades Clínicas
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-semibold text-stone-900 tracking-tight leading-[1.12]">
              ¿Con cuál de estas situaciones te identificas{' '}
              <span className="text-blush-600">hoy?</span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-left lg:pl-6 border-l-2 border-blush-300 pl-4">
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              Selecciona cualquiera de nuestras <strong className="text-stone-900 font-bold">6 áreas de especialidad</strong> para conocer las señales frecuentes de consulta y cómo las abordamos en el consultorio de Laura Rodríguez.
            </p>
          </div>
        </div>

        {/* Interactive Case Selector Tabs - Cute, Rounded & Ultra-Legible Sans-Serif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
          {cases.map((item, idx) => {
            const isSelected = activeCase === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCase(idx)}
                className={`p-4 sm:p-5 rounded-3xl text-left transition-all duration-300 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-blush-500 text-white border-blush-500 shadow-sticker scale-[1.01]'
                    : 'bg-white hover:bg-cream-100 text-stone-800 border-stone-200 hover:border-blush-300 shadow-2xs'
                }`}
              >
                <span
                  className={`text-xs font-extrabold tracking-wider uppercase block mb-2 ${
                    isSelected ? 'text-white/95' : 'text-blush-600'
                  }`}
                >
                  {item.tabLabel}
                </span>
                <p
                  className={`font-sans text-sm sm:text-[15px] font-semibold leading-relaxed ${
                    isSelected ? 'text-white' : 'text-stone-700'
                  }`}
                >
                  {item.quote}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Case Editorial Showcase Panel */}
        <div
          key={current.id}
          className="rounded-3xl sm:rounded-4xl bg-white border border-stone-200 p-5 sm:p-10 lg:p-12 shadow-soft animate-fadeIn"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Image + Quote Card (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-stone-200 relative shadow-sm">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/65 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider bg-white/95 text-stone-900 px-3 py-1 rounded-full shadow-2xs">
                    {current.subtitle}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-cream-100 border border-stone-200 text-left">
                <p className="font-sans text-sm sm:text-base font-semibold text-stone-800 leading-relaxed">
                  {current.quote}
                </p>
              </div>
            </div>

            {/* Right Clinical Breakdown & Direct Conversion CTA (7 cols) */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div>
                <h3 className="text-xl sm:text-3xl font-serif font-semibold text-stone-900 leading-snug">
                  {current.title}
                </h3>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-stone-600">
                  Señales frecuentes por las que nos consultan:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.signs.map((sign, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-cream-50 border border-stone-200 flex items-start gap-2.5 text-xs sm:text-sm text-stone-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-blush-100 text-blush-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="leading-relaxed font-semibold">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-sage-50 border border-sage-200 text-left space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-sage-800 block">
                  Cómo lo abordamos en el consultorio:
                </span>
                <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                  {current.outcome}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  icon={<Calendar className="w-4 h-4" />}
                  onClick={() =>
                    onOpenBooking ? onOpenBooking(current.id) : onExploreServices()
                  }
                >
                  {current.ctaText}
                </Button>

                <Button
                  variant="ghost"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  onClick={onExploreServices}
                >
                  Ver videos y detalles de las 6 especialidades
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
