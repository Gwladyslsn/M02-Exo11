import { useEffect, useRef, type ChangeEvent, type FormEvent } from 'react';
import './Recherche.css';

type Props = {
  valeur: string;
  onChange: (valeur: string) => void;
};

// Champ de recherche contrôlé : la valeur vit dans le parent, le composant remonte chaque frappe
export function Recherche({ valeur, onChange }: Props) {
  const champ = useRef<HTMLInputElement>(null);

  // Au montage, le focus va dans le champ : une interaction avec le DOM, donc un effet
  useEffect(() => {
    champ.current?.focus();
  }, []);

  function surSaisie(evenement: ChangeEvent<HTMLInputElement>) {
    onChange(evenement.target.value);
  }

  // La recherche est déjà faite à chaque frappe : la soumission ne doit pas recharger la page
  function surSoumission(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
  }

  return (
    <form className="recherche" role="search" onSubmit={surSoumission}>
      <label className="champ__libelle" htmlFor="recherche">
        Recherche
      </label>
      <div className="recherche__ligne">
        <input
          ref={champ}
          className="champ__saisie recherche__saisie"
          id="recherche"
          type="search"
          placeholder="Rechercher un titre ou un auteur"
          value={valeur}
          onChange={surSaisie}
        />
        <button type="submit" className="bouton bouton--secondaire">
          Rechercher
        </button>
      </div>
    </form>
  );
}
