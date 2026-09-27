export const event = {
  celebrant: 'Areli Edith',
  title: 'Mis XV Años',
  quote:
    'Hay momentos que pasan en un instante y recuerdos que permanecen eternamente. Quiero que formes parte de este.',
  parents: {
    lead: 'De la mano de mis papás, que me han acompañado en cada paso',
    // the section is hidden while this is empty
    names: 'Eliseo Mendoza y Reina Hernández',
  },
  date: {
    weekday: 'Sábado',
    day: '05',
    month: 'Diciembre',
    year: '2026',
    // countdown target — see docs/spec-project.md section 8.1
    iso: '2026-12-05T18:00:00-06:00',
    // end of the celebration; after this the countdown shows the thank-you line
    endIso: '2026-12-06T00:00:00-06:00',
  },
  countdown: {
    heading: 'Faltan',
    today: '¡Hoy es el gran día!',
    after: 'Gracias por acompañarme en este gran día.',
  },
  ceremony: {
    time: '6:00 PM',
    venue: 'San Antonio de Padua',
    address: 'Fray Sebastián de Aparicio 301, Col. Virrey Antonio de Mendoza, Morelia, Mich.',
    mapsQuery: 'San Antonio de Padua Fray Sebastián de Aparicio 301 Morelia Michoacán',
  },
  reception: {
    time: '7:00 PM',
    venue: 'Salón Sol y Luna',
    address: 'Benito Muñoz 471, Col. Unión, Morelia, Mich.',
    mapsQuery: 'Salón Sol y Luna Benito Muñoz 471 Unión 58226 Morelia Michoacán',
  },
  dressCode: {
    // set to false to hide the section
    enabled: true,
    style: 'Libre',
    note: 'Con cariño, te pedimos dejar el rosa para la quinceañera.',
  },
  closing: 'Te espero para celebrar juntos este gran día.',
  // ⚠️ PLACEHOLDER — replace with the real number before publishing
  whatsapp: '524431234567', // format: 52 + area code + number, no symbols
  // set to false once the real number above is in place (silences the build warning)
  whatsappIsPlaceholder: true,
  // Contact section hidden: the invitation is shared over WhatsApp, so guests
  // already have a way to ask. Set to true to show it again.
  whatsappEnabled: false,
};
