import { requete } from './http';
import type { FiltresLivres, Livre, Page } from '../types/mediatheque';

// Construit la chaîne de requête (?q=verne&genre=ROMAN) en ignorant les filtres vides
function versQueryString(filtres: FiltresLivres): string {
  const params = new URLSearchParams();
  for (const [cle, valeur] of Object.entries(filtres)) {
    if (valeur !== undefined && valeur !== '') params.set(cle, String(valeur));
  }
  const chaine = params.toString();
  return chaine ? `?${chaine}` : '';
}

// GET /livres : une page du catalogue, filtrée par q, genre, disponible, triée par titre ou année
export function listerLivres(
  filtres: FiltresLivres = {},
  signal?: AbortSignal,
): Promise<Page<Livre>> {
  return requete<Page<Livre>>(`/livres${versQueryString(filtres)}`, { signal });
}

// GET /livres/{id} : la fiche d'un livre (404 si inconnu)
export function obtenirLivre(id: number, signal?: AbortSignal): Promise<Livre> {
  return requete<Livre>(`/livres/${id}`, { signal });
}
