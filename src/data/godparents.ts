export interface Godparent {
  role: string;
  names: string;
}

// Set to true if placeholder names are ever put back (triggers the build warning).
export const godparentsArePlaceholder = false;

export const godparents: Godparent[] = [
  { role: 'Padrinos de Honor', names: 'Jorge Cardoso e Itzel Cardoso' },
  // To add more groups, just append objects here:
  // { role: 'Padrinos de Vals',  names: '...' },
  // { role: 'Padrinos de Ramo',  names: '...' },
];
