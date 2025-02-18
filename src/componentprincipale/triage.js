import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './accuiel';

export default function Triage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        code_produit: '',
        date_triage: '',
        quantite_utilisee: '',
        quantite_produit_fini: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Form validation
    const validateForm = () => {
        if (!formData.code_produit.trim()) return "Le code de produit est requis";
        if (!formData.date_triage) return "La date de triage est requise";
        if (!formData.quantite_utilisee || formData.quantite_utilisee <= 0) return "La quantité utilisée doit être un nombre positif";
        if (!formData.quantite_produit_fini || formData.quantite_produit_fini <= 0) return "La quantité de produit fini doit être un nombre positif";
        return null;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate form before submission
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        try {
            // Send POST request to the backend API
            const response = await axios.post(
                'http://localhost:8888/projet de stage/api/triage.php',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Handle successful response
            if (response.data.status === 'success') {
                alert('Triage ajouté avec succès !');
                navigate('/fiche'); // Redirect to another page after successful submission
            } else {
                setError(response.data.message || 'Une erreur est survenue');
            }
        } catch (error) {
            // Handle error responses
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
                        <h2 className="text-center mb-4">Phase de Triage</h2>
                        {error && (
                            <div className="alert alert-danger text-center" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            {/* Date de Triage */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Date de triage :</span>
                                <input
                                    type="date"
                                    name="date_triage"
                                    value={formData.date_triage}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Code Produit */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Code de produit :</span>
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

                            {/* Quantité Produit Fini */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Quantité produit fini (Kg) :</span>
                                <input
                                    type="number"
                                    name="quantite_produit_fini"
                                    value={formData.quantite_produit_fini}
                                    onChange={handleChange}
                                    placeholder="Entrez la quantité de produit fini"
                                    min="0.1"
                                    step="0.1"
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