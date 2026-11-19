import type { ErreurChamp, ProblemDetails } from '../types/mediatheque';

// Adresse du backend : VITE_API_URL dans un fichier .env, sinon le serveur local du cours.
// Le « ?. » : hors Vite (Exo.7, exécuté sous Node avec tsx), import.meta.env est undefined.
const BASE_URL = import.meta.env?.VITE_API_URL ?? 'http://localhost:8080';
const PREFIXE = '/api/mediatheque';

// Seule classe du projet : c'est l'idiome JavaScript pour une erreur personnalisée (instanceof)
export class ErreurApi extends Error {
  readonly status: number;
  readonly title: string;
  readonly detail: string;
  readonly errors: ErreurChamp[];

  constructor(probleme: ProblemDetails) {
    super(probleme.detail);
    this.name = 'ErreurApi';
    this.status = probleme.status;
    this.title = probleme.title;
    this.detail = probleme.detail;
    this.errors = probleme.errors ?? [];
  }
}

export type OptionsRequete = {
  method?: 'GET' | 'POST';
  body?: unknown;
  jeton?: string | null;
  signal?: AbortSignal;
};

// Lit le corps problem+json d'une réponse en erreur (ou fabrique un problème si le corps n'en est pas un)
async function lireProbleme(reponse: Response): Promise<ProblemDetails> {
  const generique: ProblemDetails = {
    type: 'about:blank',
    title: reponse.statusText || 'Erreur',
    status: reponse.status,
    detail: `Le serveur a répondu ${reponse.status}.`,
  };
  try {
    const corps: unknown = await reponse.json();
    if (typeof corps === 'object' && corps !== null && 'status' in corps && 'title' in corps) {
      return corps as ProblemDetails;
    }
  } catch {
    // corps vide ou non JSON : on garde le problème générique
  }
  return generique;
}

// Envoie une requête à l'API et renvoie la réponse JSON typée, ou lève une ErreurApi
export async function requete<T>(chemin: string, options: OptionsRequete = {}): Promise<T> {
  const { method = 'GET', body, jeton, signal } = options;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (jeton) headers['Authorization'] = `Bearer ${jeton}`;

  const reponse = await fetch(`${BASE_URL}${PREFIXE}${chemin}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (!reponse.ok) throw new ErreurApi(await lireProbleme(reponse));
  return (await reponse.json()) as T;
}
