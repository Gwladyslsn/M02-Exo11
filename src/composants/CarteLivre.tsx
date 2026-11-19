import type { Livre } from '../types/mediatheque';
import { libelleGenre } from '../data/genres';
import './CarteLivre.css';
import {Link} from 'react-router';

type Props = {
  livre: Livre;
  onEmprunter: (livre: Livre) => void;
};

// Texte de disponibilité : « 2 exemplaires disponibles », « 1 exemplaire disponible » ou « Indisponible »
function texteDisponibilite(disponibles: number): string {
  if (disponibles === 0) return 'Indisponible';
  return `${disponibles} exemplaire${disponibles > 1 ? 's' : ''} disponible${disponibles > 1 ? 's' : ''}`;
}

// Une carte du catalogue : couverture colorée, titre, auteur, année, genre, disponibilité et bouton
export function CarteLivre({ livre, onEmprunter }: Props) {
  const indisponible = livre.disponibles === 0;

  return (
    <article className="carte-livre">
      <div className="carte-livre__couverture" style={{ backgroundColor: livre.couvertureCouleur }}>
        <span className="carte-livre__couverture-titre">{livre.titre}</span>
      </div>
      <div className="carte-livre__corps">
        <h3 className="carte-livre__titre">
          <Link to={`/livres/${livre.id}`}>{livre.titre}</Link>
        </h3>
        <p className="carte-livre__auteur">{livre.auteur}</p>
        <p className="carte-livre__meta">
          {livre.annee} · <span className="carte-livre__genre">{libelleGenre(livre.genre)}</span>
        </p>
        <p
          className={`carte-livre__dispo ${indisponible ? 'carte-livre__dispo--non' : 'carte-livre__dispo--oui'}`}
        >
          {texteDisponibilite(livre.disponibles)}
        </p>
        <button
          type="button"
          className="bouton bouton--primaire"
          disabled={indisponible}
          onClick={() => onEmprunter(livre)}
        >
          Emprunter
        </button>
      </div>
    </article>
  );
}
