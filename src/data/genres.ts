import type { Genre } from '../types/mediatheque';

// Les six genres de GET /genres, en dur : la liste est stable, inutile de la charger à chaque visite
export const GENRES: { code: Genre; libelle: string }[] = [
  { code: 'ROMAN', libelle: 'Roman' },
  { code: 'SCIENCE_FICTION', libelle: 'Science-fiction' },
  { code: 'JEUNESSE', libelle: 'Jeunesse' },
  { code: 'BANDE_DESSINEE', libelle: 'Bande dessinée' },
  { code: 'DOCUMENTAIRE', libelle: 'Documentaire' },
  { code: 'POESIE', libelle: 'Poésie' },
];

// Libellé à afficher pour un code de genre (« SCIENCE_FICTION » → « Science-fiction »)
export function libelleGenre(code: Genre): string {
  return GENRES.find((genre) => genre.code === code)?.libelle ?? code;
}
