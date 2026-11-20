import { Catalogue } from './pages/Catalogue';
import { Routes, Route} from 'react-router';
import { Racine } from './composants/Racine';
import { Inscription } from './pages/Inscription';
import { Connexion } from './pages/Connexion.tsx';
import { FicheLivre } from './composants/FicheLivre.tsx';
import { MesEmprunts } from './pages/MesEmprunts.tsx';
import {NotFound} from './pages/NotFound';
import './App.css';

export function App() {
  
  return (
    <Routes>
      <Route element={<Racine/>}>
        <Route index element={<Catalogue/>}/>
        <Route path="livres/:id" element={<FicheLivre/>}/>
        <Route path="inscription" element={<Inscription/>}/>
        <Route path="connexion" element={<Connexion/>}/>
        <Route path="mesEmprunts" element={<MesEmprunts/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}
