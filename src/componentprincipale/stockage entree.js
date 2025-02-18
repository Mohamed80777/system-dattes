import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './accuiel';

export default function StockageEntre() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date_stockage: '',
    lot_number: '',
    categorie: '',
    pl: '',
    lm: '',
    gc: '',
    poids: '',
    chambre: 'chambre 1', // Valeur par défaut pour la chambre
    operation: 'entree'   // Valeur fixe "entree" pour ce formulaire
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8888/projet de stage/api/stockage.php', // Assurez-vous que l'URL est correcte
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.status === 'success') {
        alert("Stockage d'entrée enregistré avec succès !");
        navigate('/stockageSortie'); // Redirection après soumission réussie
      } else {
        setError(response.data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      if (error.response) {
        setError('Erreur serveur : ' + error.response.data.message);
      } else if (error.request) {
        setError('Erreur réseau : aucune réponse reçue');
      } else {
        setError('Erreur : ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 bg-white p-4 rounded">
            <h2 className="text-center mb-4">Stockage d'Entrée</h2>
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {/* Date de Stockage */}
              <div className="input-group mb-3">
                <span className="input-group-text">Date de stockage :</span>
                <input
                  type="date"
                  name="date_stockage"
                  value={formData.date_stockage}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* Lot N° */}
              <div className="input-group mb-3">
                <span className="input-group-text">Lot N° :</span>
                <input
                  type="text"
                  placeholder="Entrez le numéro du lot"
                  name="lot_number"
                  value={formData.lot_number}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* Catégorie */}
              <div className="input-group mb-3">
                <span className="input-group-text">Catégorie :</span>
                <input
                  type="text"
                  placeholder="Entrez la catégorie"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* PL */}
              <div className="input-group mb-3">
                <span className="input-group-text">PL :</span>
                <input
                  type="text"
                  placeholder="Entrez PL"
                  name="pl"
                  value={formData.pl}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* LM */}
              <div className="input-group mb-3">
                <span className="input-group-text">LM :</span>
                <input
                  type="text"
                  placeholder="Entrez LM"
                  name="lm"
                  value={formData.lm}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* GC */}
              <div className="input-group mb-3">
                <span className="input-group-text">GC :</span>
                <input
                  type="text"
                  placeholder="Entrez GC"
                  name="gc"
                  value={formData.gc}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* Poids */}
              <div className="input-group mb-3">
                <span className="input-group-text">Poids (kg) :</span>
                <input
                  type="number"
                  placeholder="Entrez le poids"
                  name="poids"
                  value={formData.poids}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* Chambre */}
              <div className="input-group mb-3">
                <label className="input-group-text">Chambre :</label>
                <select
                  name="chambre"
                  value={formData.chambre}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="chambre 1">Chambre 1</option>
                  <option value="chambre 2">Chambre 2</option>
                  <option value="chambre 3">Chambre 3</option>
                </select>
              </div>

              {/* Boutons */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="submit"
                  className="btn btn-primary me-md-2"
                  disabled={loading}
                >
                  {loading ? "Traitement..." : "Valider"}
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}