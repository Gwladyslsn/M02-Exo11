// Types métier de la Médiathèque Jules-Verne, calqués sur le Swagger (/openapi/mediatheque.json)

export type Genre =
  'ROMAN' | 'SCIENCE_FICTION' | 'JEUNESSE' | 'BANDE_DESSINEE' | 'DOCUMENTAIRE' | 'POESIE';

export type Livre = {
  id: number;
  titre: string;
  auteur: string;
  annee: number;
  genre: Genre;
  isbn: string;
  resume: string;
  exemplaires: number;
  disponibles: number;
  couvertureCouleur: string;
};

export type StatutEmprunt = 'EN_COURS' | 'RENDU' | 'EN_RETARD';

export type Emprunt = {
  id: number;
  livreId: number;
  livreTitre: string;
  adherentId: number;
  adherentNom: string;
  empruntLe: string;
  retourPrevuLe: string;
  renduLe: string | null;
  statut: StatutEmprunt;
};

export type Role = 'ADHERENT' | 'BIBLIOTHECAIRE';

export type Utilisateur = {
  id: number;
  nom: string;
  email: string;
  role: Role;
};

// Réponse paginée générique : Page<Livre> pour GET /livres
export type Page<T> = {
  contenu: T[];
  page: number;
  taille: number;
  total: number;
  totalPages: number;
};

// Filtres acceptés par GET /livres (tous facultatifs)
export type FiltresLivres = {
  q?: string;
  genre?: Genre;
  disponible?: boolean;
  tri?: 'titre' | 'annee';
  page?: number;
  taille?: number;
};

// Corps de POST /auth/login et sa réponse
export type Identifiants = {
  email: string;
  motDePasse: string;
};

export type Connexion = {
  token: string;
  utilisateur: Utilisateur;
};

// Corps de POST /auth/inscription
export type DemandeInscription = {
  nom: string;
  email: string;
  motDePasse: string;
  dateNaissance: string;
  telephone?: string;
};

// Erreur au format RFC 9457 (application/problem+json)
export type ErreurChamp = {
  champ: string;
  message: string;
};

export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  errors?: ErreurChamp[];
};
