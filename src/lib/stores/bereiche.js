import { writable } from 'svelte/store';

// Globaler Store für die Bereiche (client-seitig)
export const bereiche = writable([]);

// Standard-Bereiche beim ersten Start
export const defaultBereiche = [
  { name: 'Sport',    icon: '🏃', farbe: '#C75228', farbeHell: '#FAECE7', ziel: '5 Einheiten / Woche' },
  { name: 'Lernen',   icon: '📚', farbe: '#2272C0', farbeHell: '#E6F1FB', ziel: '16 Stunden / Monat'  },
  { name: 'Karriere', icon: '💼', farbe: '#0F8A62', farbeHell: '#E1F5EE', ziel: '10 Bewerbungen'       }
];
