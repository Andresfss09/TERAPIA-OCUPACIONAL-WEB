import { Review } from '../types';

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    serviceId: 'integracion-sensorial',
    serviceName: 'Enfoque de Integración Sensorial',
    clientName: 'Carolina Méndez',
    emailVerified: true,
    rating: 5,
    comment:
      'Laura tiene una paciencia y un carisma admirables. Mi hijo de 4 años tenía terror a ciertas texturas de ropa y al ruido del secador. En dos meses de terapia de integración sensorial la diferencia es enorme. El consultorio es hermoso y transmite mucha paz.',
    date: '15 de Octubre, 2026',
    verifiedPatient: true,
  },
  {
    id: 'rev-2',
    serviceId: 'neurodesarrollo',
    serviceName: 'Neurodesarrollo',
    clientName: 'Alejandra & David V.',
    emailVerified: true,
    rating: 5,
    comment:
      'Llegamos preocupados porque nuestro bebé tenía rezago motor y dificultad en el agarre fino. Con el acompañamiento en neurodesarrollo de Laura no solo avanzó rapidísimo, sino que nosotros aprendimos cómo estimularlo en casa todos los días.',
    date: '28 de Septiembre, 2026',
    verifiedPatient: true,
  },
  {
    id: 'rev-3',
    serviceId: 'inclusion-educativa',
    serviceName: 'Asesoramiento y Acompañamiento en Inclusión Educativa',
    clientName: 'Marcela Holguín',
    emailVerified: true,
    rating: 5,
    comment:
      'El acompañamiento de Laura con el colegio de nuestra hija fue clave. Nos ayudó a estructurar el PIAR y dio estrategias tan claras a las profesoras que el cambio en su adaptación y escritura en el aula fue inmediato.',
    date: '04 de Noviembre, 2026',
    verifiedPatient: true,
  },
  {
    id: 'rev-4',
    serviceId: 'enfoque-aba',
    serviceName: 'Enfoque ABA',
    clientName: 'Familia Ramírez',
    emailVerified: true,
    rating: 5,
    comment:
      'Nos encantó que su enfoque ABA desde Terapia Ocupacional es súper amoroso y respetuoso. Nuestro niño logró vestirse solo y organizar su rutina de la mañana sin crisis. Infinitas gracias, Laura.',
    date: '12 de Octubre, 2026',
    verifiedPatient: true,
  },
  {
    id: 'rev-5',
    serviceId: 'neurorehabilitacion',
    serviceName: 'Neurorehabilitación',
    clientName: 'Carlos Mario Ospina',
    emailVerified: true,
    rating: 5,
    comment:
      'Tras el ACV de mi padre, Laura nos guió en toda su neurorehabilitación y en cómo adaptar su entorno para que volviera a alimentarse y vestirse por sí mismo. Su calidad humana y profesionalismo no tienen comparación en Cali.',
    date: '21 de Septiembre, 2026',
    verifiedPatient: true,
  },
  {
    id: 'rev-6',
    serviceId: 'rehabilitacion-funcional',
    serviceName: 'Rehabilitación Funcional',
    clientName: 'Jorge Enrique Tafur',
    emailVerified: true,
    rating: 5,
    comment:
      'Después de mi cirugía de muñeca pensé que no iba a recuperar la movilidad para trabajar. La rehabilitación funcional con Laura me devolvió la fuerza completa y la confianza sin dolor. 100% recomendada.',
    date: '02 de Noviembre, 2026',
    verifiedPatient: true,
  },
];
