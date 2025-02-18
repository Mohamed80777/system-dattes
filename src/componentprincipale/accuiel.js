import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';
import Btn from '../componentForm/button';

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav className="navbar navbar-expand-lg navbar-light container">
        {/* Logo et Nom de l'Entreprise */}
        <div className="d-flex align-items-center">
          <img
            src="https://via.placeholder.com/50" // Remplacez par le chemin de votre logo
            alt="Logo"
            style={{ height: '50px', marginRight: '10px' }}
          />
          <h1 className="navbar-brand mb-0" style={{ fontSize: '1.5rem', color: '#fff' }}>
            System Dattes
          </h1>
        </div>

       
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link active" href="/fournisseurs" style={{ color: '#fff' }}>
                Fournisseurs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/ajouter" style={{ color: '#fff' }}>
                Datte
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Fumigation" style={{ color: '#fff' }}>
                Fumigation
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/stockageEntre" style={{ color: '#fff' }}>
                Entre Stock
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/stockageSortie" style={{ color: '#fff' }}>
                Sortie Stock
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/triage" style={{ color: '#fff' }}>
                Triage
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/home" style={{ color: '#fff' }}>
                consulter
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

// Style avec gradient
const headerStyle = {
  background: 'linear-gradient(90deg,rgb(61, 236, 61),rgb(70, 137, 88))', // Dégradé orange
  padding: '10px 0',
};

export default Header;