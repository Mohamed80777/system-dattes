import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentLogin/PageLogin';
import SignUp from './componentLogin/PageSIngUp';


import Footer from './footer';

import Ajouter from './componentprincipale/ajouterProduit';
import Funmigation from './componentprincipale/funmigation';
import Stockage from './componentprincipale/stockage';
import StockageEntre from './componentprincipale/stockage entree';
import Triage from './componentprincipale/triage';
import Fiche from './componentprincipale/fiche de produit';
import FicheFinale from './componentprincipale/ficheFinale';
import Home from './consulter de produit/home';
import TableProduit from './consulter de produit/table produit';
import TableFumigation from './consulter de produit/tableFumigation';
import TableChambre1 from './consulter de produit/table chambre 1';
import TableTriage from './consulter de produit/table de triage';
import TableFiche from './consulter de produit/table de fiche';
import Fournisseur from './componentprincipale/fournisseurs';
import TableFournisseur from './consulter de produit/table fournisseur';
import StockageSortie from './componentprincipale/stockage sortie';
import Tablechambre2 from './consulter de produit/tablechambre2';
import Tablechambre3 from './consulter de produit/table chambre3';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/ajouter" element={<Ajouter />} />
        <Route path="/fumigation" element={<Funmigation />} />
        <Route path="/stockage" element={<Stockage />} />
        <Route path="/stockageEntre" element={<StockageEntre />} />
        <Route path="/triage" element={<Triage />} />
        <Route path="/fiche" element={<Fiche />} />
        <Route path="/ficheFinale" element={<FicheFinale />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tabletriage" element={<TableTriage />} />
        <Route path="/tableproduit" element={<TableProduit />} />
        <Route path="/tablefumigation" element={<TableFumigation />} />
        <Route path="/tablechambre1" element={<TableChambre1 />} />
        <Route path="/tablefiche" element={<TableFiche />} />
        <Route path="/fournisseurs" element={<Fournisseur />} />
        <Route path="/tablefournisseur" element={<TableFournisseur />} />
        <Route path="/stockagesortie" element={<StockageSortie />} />
        <Route path="/tablechambre2" element={<Tablechambre2 />} />
        <Route path="/tablechambre3" element={<Tablechambre3 />} />
      </Routes>
      
    </Router>
  );
}

export default App;