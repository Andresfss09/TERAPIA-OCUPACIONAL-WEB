import { EducationMilestone } from '../types';

export const therapistProfile = {
  name: 'Laura Rodríguez',
  shortName: 'Laura',
  title: 'Terapeuta Ocupacional',
  subtitle:
    'Especialista en Neurodesarrollo, Integración Sensorial, Enfoque ABA, Inclusión Educativa, Neurorehabilitación y Rehabilitación Funcional',
  city: 'Cali, Colombia',
  neighborhood: 'San Fernando / Tequendama',
  address: 'Carrera 42 # 5B - 28, Consultorio 402, Cali, Valle del Cauca',
  phone: '+57 318 575 3889',
  whatsappNumber: '573185753889',
  domain: 'https://laurarodriguezto.com.co',
  email: 'contacto@laurarodriguezto.com.co',
  registryNumber: 'Rethus T.O. 76-104928',
  yearsOfExperience: 7,
  patientsTreated: 'familias caleñas',
  satisfactionRate: 'Atención 1 a 1',

  quote:
    '«Creo en una terapia sin batas frías ni afanes: donde cada sesión es atendida directamente por mí, combinando evidencia clínica y calidez humana para lograr verdadera independencia.»',

  shortBio:
    'Soy Laura Rodríguez, Terapeuta Ocupacional en Cali. Atiendo personalmente cada consulta en Neurodesarrollo, Integración Sensorial, Enfoque ABA, Inclusión Educativa, Neurorehabilitación y Rehabilitación Funcional.',

  fullBio: `Desde mi formación en la Universidad del Valle comprendí que los mayores logros terapéuticos ocurren cuando el paciente y su familia se sienten escuchados, seguros y acompañados por una misma profesional de principio a fin. Por eso fundé mi consultorio privado en Cali lejos del ambiente frío hospitalario.

Como única profesional a cargo del consultorio, te garantizo un seguimiento clínico 100% personalizado y continuo en seis áreas fundamentales: Neurodesarrollo infantil, Enfoque de Integración Sensorial, Enfoque ABA respetuoso, Asesoramiento y Acompañamiento en Inclusión Educativa, Neurorehabilitación y Rehabilitación Funcional.

Trabajo siempre en equipo con los padres, cuidadores y docentes, entregándote pautas claras y sencillas para que cada avance logrado en el consultorio se refleje en la vida diaria en casa, en el colegio o en el trabajo.`,

  littleThings: [
    'Atención 100% directa con Laura en todas tus sesiones (sin rotación de terapeutas)',
    'Comunicación directa y articulación con colegios en Cali (ajustes razonables y PIAR)',
    'Espacio sensorial y funcional diseñado para dar calma, seguridad y confianza',
    'Explicaciones claras sin tecnicismos confusos y plan práctico para aplicar en casa',
  ],

  philosophyPoints: [
    {
      title: 'A tu propio ritmo, sin presiones',
      description:
        'Respetamos los tiempos individuales de cada niño, joven y adulto, construyendo confianza antes que exigencia.',
      icon: 'HeartHandshake',
    },
    {
      title: 'Rigor clínico con calidez',
      description:
        'Integramos metodologías basadas en evidencia (Integración Sensorial, ABA, Neuroplasticidad) con un trato profundamente humano.',
      icon: 'Sparkles',
    },
    {
      title: 'Puente con el colegio y la casa',
      description:
        'Asesoramos a docentes y familias para que los ajustes razonables y rutinas funcionen en la vida real.',
      icon: 'Award',
    },
    {
      title: 'Objetivos funcionales medibles',
      description:
        'Trazamos metas claras desde la valoración inicial para que veas avances reales en autonomía y participación.',
      icon: 'Users',
    },
  ],

  educationTimeline: [
    {
      year: '2018',
      title: 'Profesional en Terapia Ocupacional',
      institution: 'Universidad del Valle • Cali, Colombia',
      description:
        'Formación clínica integral en neurodesarrollo, rehabilitación funcional, salud comunitaria y desempeño ocupacional.',
      badge: 'Pregrado Universitario',
    },
    {
      year: '2020',
      title: 'Formación en Enfoque de Integración Sensorial',
      institution: 'Collaborative for Leadership in Ayres Sensory Integration (CLASI)',
      description:
        'Especialización en evaluación y tratamiento de desafíos del procesamiento sensorial en la infancia.',
      badge: 'Integración Sensorial',
    },
    {
      year: '2021',
      title: 'Certificación en Enfoque ABA y Conducta Adaptativa',
      institution: 'Instituto de Neurodesarrollo y Análisis Conductual',
      description:
        'Estrategias conductuales respetuosas aplicadas a la autonomía en AVD, juego funcional y regulación emocional.',
      badge: 'Enfoque ABA',
    },
    {
      year: '2023',
      title: 'Diplomado en Neurorehabilitación, Rehabilitación Funcional e Inclusión Educativa',
      institution: 'Asociación Colombiana de Terapia Ocupacional',
      description:
        'Actualización en plasticidad cerebral, rehabilitación funcional motora y diseño de Planes Individuales de Ajustes Razonables (PIAR).',
      badge: 'Especialización Clínica',
    },
    {
      year: 'Actualidad',
      title: 'Directora Clínica • Consultorio Privado en Cali',
      institution: 'Consultorio Laura Rodríguez • Sector Salud San Fernando',
      description:
        'Atención personalizada en consultorio y acompañamiento escolar para niños, jóvenes y adultos en Cali.',
      badge: 'Práctica Privada',
    },
  ] as EducationMilestone[],

  officeHours: [
    { day: 'Lunes a Viernes', hours: '8:00 AM – 5:00 PM' },
    { day: 'Sábados, Domingos y Festivos', hours: 'Cerrado' },
  ],
};
