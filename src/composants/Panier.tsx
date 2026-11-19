import type { Livre } from '../types/mediatheque';
import './Panier.css';

type Props = {
  livres: Livre[];
  message: string | null;
  onRetirer: (livreId: number) => void;
};

// Panier d'emprunts : liste des livres choisis, retrait, et un bouton d'envoi branché à l'Exo.12
export function Panier({ livres, message, onRetirer }: Props) {
  return (
    <aside className="panier" aria-labelledby="panier-titre">
      <h2 id="panier-titre" className="panier__titre">
        Panier ({livres.length}/5)
      </h2>
      {livres.length === 0 ? (
        <p className="panier__vide">Choisissez des livres avec le bouton « Emprunter ».</p>
      ) : (
        <ul className="panier__liste">
          {livres.map((livre) => (
            <li key={livre.id} className="panier__ligne">
              <span>{livre.titre}</span>
              <button
                type="button"
                className="panier__retirer"
                onClick={() => onRetirer(livre.id)}
                aria-label={`Retirer ${livre.titre} du panier`}
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}
      {message && (
        <p className="message message--erreur" role="alert">
          {message}
        </p>
      )}
      <button type="button" className="bouton bouton--primaire" disabled>
        Emprunter ces livres
      </button>
    </aside>
  );
}
