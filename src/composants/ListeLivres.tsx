import type { Livre } from '../types/mediatheque';
import { CarteLivre } from './CarteLivre';
import './ListeLivres.css';

type Props = {
  livres: Livre[];
  onEmprunter: (livre: Livre) => void;
};

// Grille de cartes, ou un message quand la liste est vide (rendu conditionnel par retour anticipé)
export function ListeLivres({ livres, onEmprunter }: Props) {
  if (livres.length === 0) {
    return <p className="message message--info">Aucun livre ne correspond à votre recherche.</p>;
  }

  return (
    <ul className="liste-livres">
      {livres.map((livre) => (
        <li key={livre.id}>
          <CarteLivre livre={livre} onEmprunter={onEmprunter} />
        </li>
      ))}
    </ul>
  );
}
