import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './accuiel';
import Btn from '../componentForm/button';

export default function AjouterProduit() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        code_fournisseur: '',
        type_produit: '',
        date_reception: '',
        quantite: '',
        code_produit: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.code_fournisseur || !formData.type_produit || !formData.date_reception || !formData.quantite || !formData.code_produit) {
            setMessage('Tous les champs sont requis');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8888/projet de stage/api/produits.php', formData);
            if (response.data.status === 'success') {
                setMessage('Produit ajouté avec succès !');
                setFormData({ code_fournisseur: '', type_produit: '', date_reception: '', quantite: '', code_produit: '' });
                navigate('/home'); // Redirection après succès
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage('Erreur lors de l\'ajout du produit');
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <Header />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 bg-white p-4 rounded">
                        <h2 className="text-center mb-4">Ajouter un Produit</h2>
                        {message && (
                            <div className={`alert ${message.includes('succès') ? 'alert-success' : 'alert-danger'} text-center`} role="alert">
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            {/* Code Fournisseur */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Code fournisseur :</span>
                                <input
                                    type="text"
                                    name="code_fournisseur"
                                    value={formData.code_fournisseur}
                                    onChange={handleChange}
                                    placeholder="Entrez le code fournisseur"
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Type de Produit */}
                            <div className="input-group mb-3">
                                <label className="input-group-text">Type de produit :</label>
                                <select
                                    name="type_produit"
                                    value={formData.type_produit}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="">Sélectionnez un type</option>
                                    <option value="Branchées">Branchées</option>
                                    <option value="VAC">VAC</option>
                                    <option value="Sèches">Sèches</option>
                                </select>
                            </div>

                            {/* Date de Réception */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Date de réception :</span>
                                <input
                                    type="date"
                                    name="date_reception"
                                    value={formData.date_reception}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            {/* Quantité */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Quantité (KG) :</span>
                                <input
                                    type="number"
                                    name="quantite"
                                    value={formData.quantite}
                                    onChange={handleChange}
                                    placeholder="Entrez la quantité en KG"
                                    required
                                    className="form-control"
                                />
                            </div>

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

                            {/* Boutons */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Btn name="Ajouter"  className="btn btn-primary me-md-2">
                                    
                                </Btn>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}