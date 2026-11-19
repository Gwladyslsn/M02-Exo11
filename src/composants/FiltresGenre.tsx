import { GENRES } from '../data/genres';
import type { Genre } from '../types/mediatheque';
import './FiltresGenre.css';

type Props = {
  valeur: Genre | null;
  onChange: (genre: Genre | null) => void;
};

// Boutons de genre : null = tous les genres. Le bouton actif est enfoncé (aria-pressed)
export function FiltresGenre({ valeur, onChange }: Props) {
  return (
    <fieldset className="filtres-genre">
      <legend className="champ__libelle">Genre</legend>
      <div className="filtres-genre__liste">
        <button
          type="button"
          className="filtres-genre__bouton"
          aria-pressed={valeur === null}
          onClick={() => onChange(null)}
        >
          Tous
        </button>
        {GENRES.map((genre) => (
          <button
            key={genre.code}
            type="button"
            className="filtres-genre__bouton"
            aria-pressed={valeur === genre.code}
            onClick={() => onChange(genre.code)}
          >
            {genre.libelle}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
