import { useEffect, useState } from 'react';
import { listerLivres } from '../api/livres';
import type { FiltresLivres, Livre } from '../types/mediatheque';
import {obtenirLivre} from '../api/livres'
import { useQuery } from '@tanstack/react-query';

// Les trois états d'un chargement, dans une union discriminée : impossible d'avoir des livres ET une erreur
export type EtatLivres =
  | { statut: 'chargement' }
  | { statut: 'erreur'; message: string }
  | { statut: 'pret'; livres: Livre[] };


  export function useLivre( id:number){
    return useQuery({
    queryKey:['livres', id],
    queryFn: ({signal}) => obtenirLivre(id, signal)
  })
}
// Charge le catalogue depuis l'API à chaque changement de filtre, en annulant la requête précédente
export function useLivres(filtres: FiltresLivres): EtatLivres {
  const [etat, setEtat] = useState<EtatLivres>({ statut: 'chargement' });
  // On dépend des valeurs, pas de l'objet filtres (recréé à chaque rendu : l'effet tournerait en boucle)
  const { q, genre } = filtres;

  useEffect(() => {
    const controleur = new AbortController();
    // taille 50 (le maximum de l'API) : les 24 livres tiennent sur une page, pas de pagination ici
    listerLivres({ q, genre, taille: 50 }, controleur.signal)
      .then((page) => setEtat({ statut: 'pret', livres: page.contenu }))
      .catch((erreur: unknown) => {
        if (controleur.signal.aborted) return; // requête annulée par le nettoyage : rien à afficher
        const message = erreur instanceof Error ? erreur.message : 'Erreur inconnue';
        setEtat({ statut: 'erreur', message });
      });
    // Nettoyage : si q ou genre change avant la réponse, on annule la requête devenue inutile
    return () => controleur.abort();
  }, [q, genre]);

  return etat;
}
