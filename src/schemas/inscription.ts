import { z } from 'zod';

// Même règle que le serveur (Swagger) : 0X XX XX XX XX ou +33X…, séparateurs facultatifs
const TELEPHONE_FRANCAIS = /^(?:\+33|0)[1-9](?:[ .-]?\d{2}){4}$/;

// Âge en années révolues à la date du jour
function age(dateNaissance: string): number {
  const naissance = new Date(dateNaissance);
  const aujourdHui = new Date();
  let annees = aujourdHui.getFullYear() - naissance.getFullYear();
  const anniversairePasse =
    aujourdHui.getMonth() > naissance.getMonth() ||
    (aujourdHui.getMonth() === naissance.getMonth() && aujourdHui.getDate() >= naissance.getDate());
  if (!anniversairePasse) annees -= 1;
  return annees;
}

// Règles du formulaire d'inscription : messages utiles, pas « invalide »
export const inscriptionSchema = z
  .object({
    nom: z.string().trim().min(2, { error: 'Le nom doit contenir au moins 2 caractères.' }),
    email: z.email({ error: 'Saisissez une adresse e-mail valide (prenom.nom@exemple.fr).' }),
    motDePasse: z
      .string()
      .min(8, { error: 'Le mot de passe doit contenir au moins 8 caractères.' })
      .regex(/\d/, { error: 'Le mot de passe doit contenir au moins un chiffre.' }),
    confirmation: z.string(),
    dateNaissance: z.iso
      .date({ error: 'Saisissez votre date de naissance.' })
      .refine((date) => age(date) >= 12, {
        error: 'Il faut avoir au moins 12 ans pour s’inscrire.',
      }),
    // Facultatif : vide, ou un numéro français
    telephone: z.union([
      z.literal(''),
      z
        .string()
        .regex(TELEPHONE_FRANCAIS, { error: 'Saisissez un numéro français (06 12 34 56 78).' }),
    ]),
    reglement: z.literal(true, { error: 'Vous devez accepter le règlement.' }),
  })
  // La confirmation est comparée au mot de passe : une règle qui porte sur deux champs
  .refine((valeurs) => valeurs.motDePasse === valeurs.confirmation, {
    error: 'La confirmation ne correspond pas au mot de passe.',
    path: ['confirmation'],
    when: () => true, // vérifiée même si un autre champ est encore invalide
  });

// Le type est déduit du schéma : une seule source de vérité
export type Inscription = z.infer<typeof inscriptionSchema>;

// Ce que contiennent les champs pendant la saisie (le règlement peut encore être décoché)
export type ValeursInscription = Omit<Inscription, 'reglement'> & { reglement: boolean };

export const VALEURS_INITIALES: ValeursInscription = {
  nom: '',
  email: '',
  motDePasse: '',
  confirmation: '',
  dateNaissance: '',
  telephone: '',
  reglement: false,
};

export const CHAMPS_INSCRIPTION = [
  'nom',
  'email',
  'motDePasse',
  'confirmation',
  'dateNaissance',
  'telephone',
  'reglement',
] as const;

export type ChampInscription = (typeof CHAMPS_INSCRIPTION)[number];

// Un message par champ en erreur (le premier), vide si tout est valide
export type ErreursInscription = Partial<Record<ChampInscription, string>>;

export function validerInscription(valeurs: ValeursInscription): ErreursInscription {
  const resultat = inscriptionSchema.safeParse(valeurs);
  if (resultat.success) return {};
  // flattenError convient à un formulaire plat : { fieldErrors: { nom: ['…'], email: ['…'] } }
  const { fieldErrors } = z.flattenError(resultat.error);
  const erreurs: ErreursInscription = {};
  for (const champ of CHAMPS_INSCRIPTION) {
    const premierMessage = fieldErrors[champ]?.[0];
    if (premierMessage) erreurs[champ] = premierMessage;
  }
  return erreurs;
}
