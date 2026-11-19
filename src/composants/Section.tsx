import type { ReactNode } from 'react';
import './Section.css';

type Props = {
  titre: string;
  children: ReactNode;
};

// Carte avec un titre, qui accepte n'importe quel contenu (composition par children)
export function Section({ titre, children }: Props) {
  return (
    <section className="section">
      <h2 className="section__titre">{titre}</h2>
      {children}
    </section>
  );
}
