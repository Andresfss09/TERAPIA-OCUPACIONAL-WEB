import React from 'react';

export const TrustSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      duration: 'Primeros 15 min',
      title: 'Escucha sin prisas ni juicios',
      description:
        'Conversamos con calma frente a una taza de café sobre tu motivo de consulta, la rutina familiar o escolar y las metas que deseas alcanzar.',
    },
    {
      number: '02',
      duration: 'Siguientes 30 min',
      title: 'Observación clínica y práctica',
      description:
        'Realizamos pruebas sensoriales, de neurodesarrollo y motrices mediante el juego (en niños) o evaluación neurológica y funcional (en jóvenes, adultos y personas mayores).',
    },
    {
      number: '03',
      duration: 'Últimos 15 min',
      title: 'Diagnóstico ocupacional y plan para casa',
      description:
        'Te explico en lenguaje claro qué encontramos, cuántas sesiones se recomiendan y te llevas estrategias aplicables en tu hogar o colegio desde el primer día.',
    },
  ];

  return (
    <section className="py-24 bg-cream-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Asymmetric Editorial Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Dark Stone Editorial Feature Card (5 cols) - High Contrast */}
          <div className="lg:col-span-5 rounded-4xl bg-stone-900 text-white p-8 sm:p-10 flex flex-col justify-between text-left relative overflow-hidden shadow-polaroid">
            <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-blush-500/20 blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-blush-300 block">
                La Experiencia en Consulta
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white leading-[1.15]">
                ¿Qué sucede exactamente en tu{' '}
                <span className="italic text-blush-300">primera cita</span> de valoración?
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                Sabemos que dar el primer paso genera preguntas. Por eso hemos diseñado una sesión inicial de 60 minutos estructurada para darte claridad, tranquilidad y respuestas concretas desde el día uno.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-stone-700 grid grid-cols-2 gap-4">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-blush-300 block">
                  60 min
                </span>
                <span className="text-xs text-stone-300">
                  Dedicación exclusiva por paciente
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-sage-300 block">
                  1 a 1
                </span>
                <span className="text-xs text-stone-300">
                  Sin pacientes simultáneos
                </span>
              </div>
            </div>
          </div>

          {/* Right 3-Step Numbered Journey (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 hover:border-blush-400 transition-all duration-300 shadow-soft flex flex-col sm:flex-row items-start gap-5 text-left group"
              >
                <div className="flex items-center justify-between w-full sm:w-auto">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-blush-500 group-hover:text-blush-600 transition-colors leading-none">
                    {step.number}
                  </span>
                  <span className="sm:hidden text-[11px] font-semibold uppercase tracking-wider bg-cream-200 text-stone-800 px-2.5 py-1 rounded-full">
                    {step.duration}
                  </span>
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
                      {step.title}
                    </h4>
                    <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider bg-cream-200 text-stone-800 px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
