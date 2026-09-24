import { event } from '../data/event';

// Keep in sync with public/event.ics (times in UTC; Michoacán is UTC−6 year-round).
const start = '20261206T000000Z';
const end = '20261206T060000Z';

const details = `Ceremonia ${event.ceremony.time} · ${event.ceremony.venue}, ${event.ceremony.address}\nRecepción ${event.reception.time} · ${event.reception.venue}, ${event.reception.address}`;

export const icsHref = '/event.ics';

export const googleCalendarHref =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(`XV Años de ${event.celebrant}`)}` +
  `&dates=${start}/${end}` +
  `&details=${encodeURIComponent(details)}` +
  `&location=${encodeURIComponent(`${event.ceremony.venue}, ${event.ceremony.address}`)}`;
