import { requete } from './http';
import type { Emprunt, StatutEmprunt } from '../types/mediatheque';

// GET /emprunts : les emprunts de l'adhérent connecté (tous pour un bibliothécaire, filtrables par statut)
export function listerEmprunts(jeton: string, statut?: StatutEmprunt): Promise<Emprunt[]> {
  const suffixe = statut ? `?statut=${statut}` : '';
  return requete<Emprunt[]>(`/emprunts${suffixe}`, { jeton });
}

// POST /emprunts : emprunte un livre (409 si indisponible ou si 5 emprunts sont déjà en cours)
export function emprunter(livreId: number, jeton: string): Promise<Emprunt> {
  return requete<Emprunt>('/emprunts', { method: 'POST', body: { livreId }, jeton });
}

// POST /emprunts/{id}/retour : rend un livre emprunté
export function rendre(empruntId: number, jeton: string): Promise<Emprunt> {
  return requete<Emprunt>(`/emprunts/${empruntId}/retour`, { method: 'POST', jeton });
}
