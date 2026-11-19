import { useId, useState, type FormEvent } from 'react';
import { Champ } from '../composants/Champ';
import { inscrire } from '../api/auth';
import { ErreurApi } from '../api/http';
import {
  CHAMPS_INSCRIPTION,
  VALEURS_INITIALES,
  inscriptionSchema,
  validerInscription,
  type ChampInscription,
  type ErreursInscription,
  type ValeursInscription,
} from '../schemas/inscription';
import './Inscription.css';

const LIBELLES: Record<ChampInscription, string> = {
  nom: 'Nom',
  email: 'Adresse e-mail',
  motDePasse: 'Mot de passe',
  confirmation: 'Confirmation du mot de passe',
  dateNaissance: 'Date de naissance',
  telephone: 'Téléphone',
  reglement: 'Règlement',
};

type Envoi =
  | { statut: 'inactif' }
  | { statut: 'envoi' }
  | { statut: 'succes'; nom: string }
  | { statut: 'erreur'; message: string };

// Page d'inscription : formulaire contrôlé, validé par Zod, envoyé à POST /auth/inscription
export function Inscription() {
  const idBase = useId();
  const [valeurs, setValeurs] = useState<ValeursInscription>(VALEURS_INITIALES);
  const [champsTouches, setChampsTouches] = useState<ChampInscription[]>([]);
  const [soumis, setSoumis] = useState(false);
  const [erreursServeur, setErreursServeur] = useState<ErreursInscription>({});
  const [envoi, setEnvoi] = useState<Envoi>({ statut: 'inactif' });

  // Les erreurs de validation se déduisent des valeurs : calculées au rendu, pas stockées
  const erreursClient = validerInscription(valeurs);

  // Une erreur s'affiche si elle vient du serveur, ou si le champ a été touché ou le formulaire soumis
  function erreurDe(champ: ChampInscription): string | undefined {
    if (erreursServeur[champ]) return erreursServeur[champ];
    if (soumis || champsTouches.includes(champ)) return erreursClient[champ];
    return undefined;
  }

  const champsEnErreur = CHAMPS_INSCRIPTION.filter((champ) => erreurDe(champ));
  const idDe = (champ: ChampInscription) => `${idBase}-${champ}`;

  function changer(champ: ChampInscription, valeur: string | boolean) {
    setValeurs({ ...valeurs, [champ]: valeur });
    // Une nouvelle saisie efface l'erreur renvoyée par le serveur pour ce champ
    if (erreursServeur[champ]) setErreursServeur({ ...erreursServeur, [champ]: undefined });
  }

  function toucher(champ: ChampInscription) {
    if (!champsTouches.includes(champ)) setChampsTouches([...champsTouches, champ]);
  }

  async function soumettre(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    setSoumis(true);
    setEnvoi({ statut: 'inactif' });
    const resultat = inscriptionSchema.safeParse(valeurs);
    if (!resultat.success) {
      // Le focus va sur le premier champ en erreur (après le rendu qui affiche les messages)
      const premier = CHAMPS_INSCRIPTION.find((champ) => erreursClient[champ]);
      if (premier) document.getElementById(idDe(premier))?.focus();
      return;
    }

    setEnvoi({ statut: 'envoi' });
    const { nom, email, motDePasse, dateNaissance, telephone } = resultat.data;
    try {
      const utilisateur = await inscrire({
        nom,
        email,
        motDePasse,
        dateNaissance,
        telephone: telephone || undefined, // champ facultatif : on n'envoie pas une chaîne vide
      });
      setEnvoi({ statut: 'succes', nom: utilisateur.nom });
      setValeurs(VALEURS_INITIALES);
      setChampsTouches([]);
      setSoumis(false);
    } catch (erreur) {
      if (erreur instanceof ErreurApi && erreur.status === 409) {
        // Adresse déjà prise : l'erreur porte sur le champ email
        setErreursServeur({ email: erreur.detail });
        setEnvoi({ statut: 'inactif' });
        document.getElementById(idDe('email'))?.focus();
      } else if (erreur instanceof ErreurApi && erreur.status === 400) {
        // Le serveur reste juge : ses erreurs sont mappées sur les champs via errors[]
        const erreurs: ErreursInscription = {};
        for (const { champ, message } of erreur.errors) {
          const champConnu = CHAMPS_INSCRIPTION.find((c) => c === champ);
          if (champConnu) erreurs[champConnu] = message;
        }
        setErreursServeur(erreurs);
        setEnvoi({ statut: 'inactif' });
      } else {
        const message = erreur instanceof Error ? erreur.message : 'Erreur inconnue';
        setEnvoi({ statut: 'erreur', message });
      }
    }
  }

  const champTexte = (
    champ: Exclude<ChampInscription, 'reglement'>,
    type: 'text' | 'email' | 'password' | 'date' | 'tel',
    options: { aide?: string; autoComplete?: string } = {},
  ) => (
    <Champ
      id={idDe(champ)}
      libelle={LIBELLES[champ]}
      type={type}
      valeur={valeurs[champ]}
      erreur={erreurDe(champ)}
      aide={options.aide}
      autoComplete={options.autoComplete}
      onChange={(valeur) => changer(champ, valeur)}
      onBlur={() => toucher(champ)}
    />
  );

  return (
    <div className="inscription">
      <h1>Inscription</h1>
      <p>Créez votre compte d'adhérent pour emprunter des livres.</p>

      {envoi.statut === 'succes' && (
        <p className="message message--succes" role="status">
          Bienvenue {envoi.nom} ! Votre compte est créé, vous pouvez maintenant vous connecter.
        </p>
      )}
      {envoi.statut === 'erreur' && (
        <p className="message message--erreur" role="alert">
          L'inscription a échoué : {envoi.message}
        </p>
      )}

      <form className="inscription__formulaire" onSubmit={soumettre} noValidate>
        {champsEnErreur.length > 0 && (
          <div className="message message--erreur" role="alert">
            <p>Le formulaire contient {champsEnErreur.length} erreur(s) :</p>
            <ul>
              {champsEnErreur.map((champ) => (
                <li key={champ}>
                  <a href={`#${idDe(champ)}`}>{LIBELLES[champ]}</a> : {erreurDe(champ)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {champTexte('nom', 'text', { autoComplete: 'name' })}
        {champTexte('email', 'email', { autoComplete: 'email' })}
        {champTexte('motDePasse', 'password', {
          aide: '8 caractères au moins, dont un chiffre.',
          autoComplete: 'new-password',
        })}
        {champTexte('confirmation', 'password', { autoComplete: 'new-password' })}
        {champTexte('dateNaissance', 'date', { aide: 'Il faut avoir 12 ans ou plus.' })}
        {champTexte('telephone', 'tel', { aide: 'Facultatif.', autoComplete: 'tel' })}

        <div className="inscription__case">
          <input
            id={idDe('reglement')}
            type="checkbox"
            checked={valeurs.reglement}
            aria-invalid={erreurDe('reglement') ? true : undefined}
            aria-describedby={erreurDe('reglement') ? `${idDe('reglement')}-erreur` : undefined}
            onChange={(evenement) => changer('reglement', evenement.target.checked)}
            onBlur={() => toucher('reglement')}
          />
          <label htmlFor={idDe('reglement')}>J'accepte le règlement de la médiathèque</label>
          {erreurDe('reglement') && (
            <p id={`${idDe('reglement')}-erreur`} className="champ__erreur">
              {erreurDe('reglement')}
            </p>
          )}
        </div>

        {/* Jamais désactivé « pour cacher les erreurs » : seulement pendant l'envoi */}
        <button
          type="submit"
          className="bouton bouton--primaire"
          disabled={envoi.statut === 'envoi'}
        >
          {envoi.statut === 'envoi' ? 'Création du compte…' : 'Créer mon compte'}
        </button>
      </form>
    </div>
  );
}
