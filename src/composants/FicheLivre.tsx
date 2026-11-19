import { Link, useParams } from 'react-router';
import { useLivre } from '../hooks/useLivres';
import './FicheLivre.css';

export function FicheLivre() {
    const { id } = useParams();
    const livreId = Number(id);
    const { data: livre, isPending, isError } = useLivre(livreId);

    if (isPending) return <p role="status">Chargement…</p>;
    if (isError) return <p role="alert">Erreur : livre introuvable..</p>;

    return (
        <article className="fiche-livre">
        <div
            className="fiche-livre__couverture"
            style={{ backgroundColor: livre.couvertureCouleur }}
        >
            <p className="fiche-livre__couverture-titre">{livre.titre}</p>
        </div>

        <div className="fiche-livre__corps">
            <p className="fiche-livre__retour">
            <Link to="/">← Retour au catalogue</Link>
            </p>

            <h1>{livre.titre}</h1>
            <p className="fiche-livre__auteur">{livre.auteur}</p>

            <dl className="fiche-livre__details">
            <dt>Genre</dt>
            <dd>{livre.genre}</dd>
            <dt>Année</dt>
            <dd>{livre.annee}</dd>
            </dl>

            <p>{livre.resume}</p>
        </div>
        </article>
    );
    }