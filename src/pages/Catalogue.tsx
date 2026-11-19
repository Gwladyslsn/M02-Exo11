import { useState } from 'react';
import { Section } from '../composants/Section';
import { Recherche } from '../composants/Recherche';
import { FiltresGenre } from '../composants/FiltresGenre';
import { ListeLivres } from '../composants/ListeLivres';
import { Panier } from '../composants/Panier';
import { useLivres } from '../hooks/useLivres';
import type { Genre, Livre } from '../types/mediatheque';

const PANIER_MAX = 5;

// Page catalogue : l'état vit ici, au plus bas niveau commun des composants qui le partagent
export function Catalogue() {
  const [q, setQ] = useState('');
  const [genre, setGenre] = useState<Genre | null>(null);
  const [panier, setPanier] = useState<Livre[]>([]);
  const [messagePanier, setMessagePanier] = useState<string | null>(null);

  // genre ?? undefined : l'API attend « pas de filtre », pas la valeur null
  const livres = useLivres({ q, genre: genre ?? undefined });

  // État dérivé, calculé au rendu : pas de useState pour ce qui se déduit d'un autre état
  const nombreResultats = livres.statut === 'pret' ? livres.livres.length : 0;

  function ajouterAuPanier(livre: Livre) {
    if (panier.some((l) => l.id === livre.id)) {
      setMessagePanier(`« ${livre.titre} » est déjà dans le panier.`);
      return;
    }
    if (panier.length >= PANIER_MAX) {
      setMessagePanier(`Le panier est limité à ${PANIER_MAX} livres.`);
      return;
    }
    // Immutabilité : un nouveau tableau, jamais panier.push()
    setPanier([...panier, livre]);
    setMessagePanier(null);
  }

  function retirerDuPanier(livreId: number) {
    setPanier(panier.filter((livre) => livre.id !== livreId));
    setMessagePanier(null);
  }

  return (
    <>
      <h1>Catalogue</h1>
      <Section titre="Rechercher et filtrer">
        <Recherche valeur={q} onChange={setQ} />
        <FiltresGenre valeur={genre} onChange={setGenre} />
      </Section>
      <Panier livres={panier} message={messagePanier} onRetirer={retirerDuPanier} />

      {livres.statut === 'chargement' && (
        <p className="message message--info" role="status">
          Chargement du catalogue…
        </p>
      )}
      {livres.statut === 'erreur' && (
        <p className="message message--erreur" role="alert">
          Le catalogue n'a pas pu être chargé : {livres.message}
        </p>
      )}
      {livres.statut === 'pret' && (
        <>
          <p className="page__compteur">
            {nombreResultats} {nombreResultats > 1 ? 'livres' : 'livre'}
          </p>
          <ListeLivres livres={livres.livres} onEmprunter={ajouterAuPanier} />
        </>
      )}
    </>
  );
}
