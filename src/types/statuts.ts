import type { StatutEmprunt } from '../types/mediatheque';

// Libellés affichés pour les statuts d'emprunt de l'API
export const LIBELLES_STATUT: Record<StatutEmprunt, string> = {
    EN_COURS: 'En cours',
    RENDU: 'Rendu',
    EN_RETARD: 'En retard',
};
