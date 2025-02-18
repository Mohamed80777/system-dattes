import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './accuiel';
import Btn from '../componentForm/button';
import Lab from '../componentForm/label';
import Text from '../componentForm/inputText';
import Date from '../componentForm/inputDate';

export default function Fumigation() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        code_produit: '',
        numero_lot: '',
        quantite_utilisee: '',
        date_debut_fumigation: '',
        date_fin_fumigation: ''
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
                'http://localhost:8888/projet de stage/api/fumigation.php',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.status === 'success') {
                alert('Fumigation enregistrée avec succès !');
                navigate('/stockage');
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
                        <h2 className="text-center mb-4">Fumigation</h2>
                        {error && (
                            <div className="alert alert-danger text-center" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            {/* Code Produit */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Code produit :</span>
                                <input
                                    type="text"
                                    name="code_produit"
                                    value={formData.code_produit}
                                    onChange={handleChange}
                                    placeholder="Entrez le code produit"
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Numéro du Lot */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">N° du lot du fumigant :</span>
                                <input
                                    type="text"
                                    name="numero_lot"
                                    value={formData.numero_lot}
                                    onChange={handleChange}
                                    placeholder="Entrez le numéro du lot"
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Quantité Utilisée */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Quantité utilisée (Kg) :</span>
                                <input
                                    type="number"
                                    name="quantite_utilisee"
                                    value={formData.quantite_utilisee}
                                    onChange={handleChange}
                                    placeholder="Entrez la quantité utilisée"
                                    min="0.1"
                                    step="0.1"
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Date Début Fumigation */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Date début fumigation :</span>
                                <input
                                    type="date"
                                    name="date_debut_fumigation"
                                    value={formData.date_debut_fumigation}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Date Fin Fumigation */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Date fin fumigation :</span>
                                <input
                                    type="date"
                                    name="date_fin_fumigation"
                                    value={formData.date_fin_fumigation}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Boutons */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="submit" className="btn btn-primary me-md-2" disabled={loading}>
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