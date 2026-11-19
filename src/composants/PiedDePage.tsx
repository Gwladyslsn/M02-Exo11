import './PiedDePage.css';

// Pied de page commun à toutes les pages
export function PiedDePage() {
  return (
    <footer className="pied-de-page">
      <div className="pied-de-page__contenu">
        <span>Médiathèque Jules-Verne</span>
        <nav aria-label="Liens de bas de page">
          <a href="/accessibilite">Accessibilité</a>
          <a href="/mentions-legales">Mentions légales</a>
        </nav>
      </div>
    </footer>
  );
}
