import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Btn from '../componentForm/button';
import Header from './accuiel';

export default function AjoutFournisseur() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        code_fournisseur: '',
        nom_complet: '',
        adresse: '',
        telephone: ''
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
                'http://localhost:8888/projet de stage/api/fournisseur.php',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.status === 'success') {
                alert('Fournisseur ajouté avec succès !');
                navigate('/accueil');
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
                        <h2 className="text-center mb-4">Ajouter un Fournisseur</h2>
                        {error && (
                            <div className="alert alert-danger text-center" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            {/* Nom Complet */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nom complet :</span>
                                <input
                                    type="text"
                                    placeholder="Entrez le nom complet"
                                    name="nom_complet"
                                    value={formData.nom_complet}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Adresse */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Adresse :</span>
                                <input
                                    type="text"
                                    placeholder="Entrez l'adresse"
                                    name="adresse"
                                    value={formData.adresse}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Téléphone */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Téléphone :</span>
                                <input
                                    type="number"
                                    placeholder="Entrez le téléphone"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Code Fournisseur */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Code du fournisseur :</span>
                                <input
                                    type="text"
                                    placeholder="Entrez le code fournisseur"
                                    name="code_fournisseur"
                                    value={formData.code_fournisseur}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Bouton Valider */}
                            <div className="d-grid">
                                <Btn
                                    name={loading ? "Traitement..." : "Valider"}
                                    className="btn btn-success bg-gardient"
                                    disabled={loading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}