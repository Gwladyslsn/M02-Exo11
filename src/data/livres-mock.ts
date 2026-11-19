import type { Livre } from '../types/mediatheque';

// Six livres du catalogue (données réelles de l'API), pour travailler sans réseau à l'Exo.8.
// Germinal et Frankenstein sont indisponibles pour voir le bouton « Emprunter » désactivé.
export const LIVRES_MOCK: Livre[] = [
  {
    id: 1,
    titre: 'Vingt mille lieues sous les mers',
    auteur: 'Jules Verne',
    annee: 1870,
    genre: 'SCIENCE_FICTION',
    isbn: '978-2-07-040850-4',
    resume:
      "Le professeur Aronnax, son domestique Conseil et le harponneur Ned Land, lancés à la poursuite d'un prétendu monstre marin, se retrouvent prisonniers du Nautilus, un sous-marin commandé par le mystérieux capitaine Nemo. Durant leur périple sous les océans, ils découvrent des merveilles, tandis que Ned Land n'a qu'une idée : s'évader.",
    exemplaires: 2,
    disponibles: 1,
    couvertureCouleur: '#1F5F7A',
  },
  {
    id: 2,
    titre: 'Les Misérables',
    auteur: 'Victor Hugo',
    annee: 1862,
    genre: 'ROMAN',
    isbn: '978-2-07-036822-8',
    resume:
      "Jean Valjean, ancien forçat, tente de refaire sa vie sous une nouvelle identité tout en étant traqué par l'inspecteur Javert. Sa route croise celles de Fantine, de sa fille Cosette et de Marius, dans le Paris de la première moitié du XIXe siècle.",
    exemplaires: 3,
    disponibles: 3,
    couvertureCouleur: '#7A2E3A',
  },
  {
    id: 3,
    titre: 'Germinal',
    auteur: 'Émile Zola',
    annee: 1885,
    genre: 'ROMAN',
    isbn: '978-2-07-036038-3',
    resume:
      "Étienne Lantier, ouvrier sans travail, est embauché dans une mine de charbon du nord de la France où il découvre la misère des mineurs. Il prend la tête d'une grève contre la compagnie minière, qui est violemment réprimée.",
    exemplaires: 2,
    disponibles: 0,
    couvertureCouleur: '#3B3B3B',
  },
  {
    id: 4,
    titre: 'Orgueil et préjugés',
    auteur: 'Jane Austen',
    annee: 1813,
    genre: 'ROMAN',
    isbn: '978-2-25-306584-5',
    resume:
      "Elizabeth Bennet, jeune femme vive et indépendante, juge d'abord avec sévérité le riche et fier M. Darcy. Au fil des malentendus et des révélations, tous deux apprennent à dépasser leur orgueil et leurs préjugés.",
    exemplaires: 2,
    disponibles: 2,
    couvertureCouleur: '#B5651D',
  },
  {
    id: 5,
    titre: 'Frankenstein',
    auteur: 'Mary Shelley',
    annee: 1818,
    genre: 'SCIENCE_FICTION',
    isbn: '978-2-07-041159-7',
    resume:
      "Le jeune savant Victor Frankenstein donne la vie à une créature assemblée à partir de corps morts, puis l'abandonne, horrifié par son apparence. Rejetée de tous, la créature se retourne contre son créateur et contre ceux qu'il aime.",
    exemplaires: 2,
    disponibles: 0,
    couvertureCouleur: '#2F4F4F',
  },
  {
    id: 6,
    titre: 'Le Tour du monde en quatre-vingts jours',
    auteur: 'Jules Verne',
    annee: 1872,
    genre: 'ROMAN',
    isbn: '978-2-01-322108-5',
    resume:
      "Pour gagner un pari lancé à ses amis du Reform Club, l'excentrique Phileas Fogg part faire le tour du monde en quatre-vingts jours avec son domestique Passepartout. Pendant tout le voyage, l'inspecteur Fix les suit, persuadé que Fogg est le voleur d'une banque.",
    exemplaires: 2,
    disponibles: 1,
    couvertureCouleur: '#C4862B',
  },
];
