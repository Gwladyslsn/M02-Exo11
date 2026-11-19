# Médiathèque Jules-Verne – Exo.10, corrigé (formulaire validé)

- Lancer : `npm install` puis `npm run dev` (http://localhost:5173, backend sur `http://localhost:8080`). Vérifier : `npm run typecheck`, `npm run lint`, `npm run build`.
- Comptes de test : `nora.benali@exemple.fr` / `adherent` (utile pour provoquer le 409 « email déjà pris »), `lucas.martin@exemple.fr` / `adherent`, `biblio@mediatheque-montvert.fr` / `biblio`.
- Contenu : page « Inscription » (formulaire contrôlé : nom, e-mail, mot de passe, confirmation, date de naissance, téléphone facultatif, case règlement), schéma Zod 4 `inscriptionSchema` et type `Inscription = z.infer<…>`, validation à la soumission puis à la saisie des champs touchés, erreurs sous les champs (`aria-invalid`, `aria-describedby`), résumé en `role="alert"` et focus sur le premier champ en erreur, envoi `POST /auth/inscription`, 409 affiché sur l'e-mail, 400 serveur mappé via `errors[]`, réinitialisation et message de bienvenue. Les écrans sont choisis par un état `ecran` dans `App` (routeur à l'Exo.11).
- Ajouté depuis `exo9-corrige` : dépendance `zod`, `src/schemas/inscription.ts`, `src/pages/Inscription.tsx` (+ `.css`), `src/pages/Catalogue.tsx` (l'ancien contenu de `App`), `src/composants/Champ.tsx` (+ `.css`).
- Modifié : `src/App.tsx` (état `ecran`), `src/composants/EnTete.tsx` (+ `.css`) : boutons « Catalogue » et « Inscription ».
