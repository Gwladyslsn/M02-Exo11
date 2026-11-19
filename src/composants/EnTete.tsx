import './EnTete.css';
import { NavLink} from 'react-router';


// En-tête commun : logo, navigation entre les écrans (des boutons tant qu'il n'y a pas de routeur)
export function EnTete() {
  return (
    <header className="en-tete">
      <div className="en-tete__contenu">
        <a className="en-tete__logo" href="/">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="28" height="28">
            <path
              d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          Médiathèque Jules-Verne
        </a>
        <nav className="en-tete__nav" aria-label="Navigation principale">
          <NavLink to="/" className="en-tete__lien">
            Catalogue
          </NavLink>
          <NavLink to="/inscription" className="en-tete__lien">
            Inscription
          </NavLink>
          <NavLink to="/mesEmprunts" className="en-tete__lien">
            Mes emprunts
          </NavLink>
        </nav>
        <NavLink to="/connexion" className="bouton bouton--primaire">
          Connexion
        </NavLink>
      </div>
    </header>
  );
}
