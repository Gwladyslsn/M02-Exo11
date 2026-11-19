import { requete } from './http';
import type {
  Connexion,
  DemandeInscription,
  Identifiants,
  Utilisateur,
} from '../types/mediatheque';

// POST /auth/login : renvoie le jeton et l'utilisateur (401 si les identifiants sont incorrects)
export function connecter(identifiants: Identifiants): Promise<Connexion> {
  return requete<Connexion>('/auth/login', { method: 'POST', body: identifiants });
}

// POST /auth/inscription : crée un compte ADHERENT (400 validation, 409 email déjà pris)
export function inscrire(demande: DemandeInscription): Promise<Utilisateur> {
  return requete<Utilisateur>('/auth/inscription', { method: 'POST', body: demande });
}

// GET /auth/moi : l'utilisateur à qui appartient le jeton (401 si le jeton est invalide ou expiré)
export function moi(jeton: string): Promise<Utilisateur> {
  return requete<Utilisateur>('/auth/moi', { jeton });
}
