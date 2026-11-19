import type { ChangeEvent } from 'react';
import './Champ.css';

type Props = {
  id: string;
  libelle: string;
  valeur: string;
  onChange: (valeur: string) => void;
  onBlur: () => void;
  type?: 'text' | 'email' | 'password' | 'date' | 'tel';
  aide?: string;
  erreur?: string;
  autoComplete?: string;
};

// Champ de formulaire accessible : label lié, aide et erreur annoncées par aria-describedby
export function Champ({
  id,
  libelle,
  valeur,
  onChange,
  onBlur,
  type = 'text',
  aide,
  erreur,
  autoComplete,
}: Props) {
  const idAide = `${id}-aide`;
  const idErreur = `${id}-erreur`;
  // aria-describedby liste les ids des textes qui décrivent le champ (aide, puis erreur)
  const describedBy = [aide ? idAide : null, erreur ? idErreur : null].filter(Boolean).join(' ');

  return (
    <div className="champ">
      <label className="champ__libelle" htmlFor={id}>
        {libelle}
      </label>
      {aide && (
        <p id={idAide} className="champ__aide">
          {aide}
        </p>
      )}
      <input
        id={id}
        className={`champ__saisie ${erreur ? 'champ__saisie--erreur' : ''}`}
        type={type}
        value={valeur}
        autoComplete={autoComplete}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={describedBy || undefined}
        onChange={(evenement: ChangeEvent<HTMLInputElement>) => onChange(evenement.target.value)}
        onBlur={onBlur}
      />
      {erreur && (
        <p id={idErreur} className="champ__erreur">
          {erreur}
        </p>
      )}
    </div>
  );
}
