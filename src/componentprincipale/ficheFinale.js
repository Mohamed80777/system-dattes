import React, { useEffect, useState } from 'react';
import Btn from "../componentForm/button";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FicheFinale() {
    const [ficheData, setFicheData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchFicheData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8888/projet de stage/api/fiche.php', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.data.status === 'success') {
                    setFicheData(response.data.data);
                    setError('');
                } else {
                    setError(response.data.message || 'Erreur lors de la récupération des données');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(
                    err.response?.data?.message || 
                    'Erreur de connexion au serveur. Veuillez vérifier que le serveur est en cours d\'exécution.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFicheData();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <div className="loading">Chargement des données...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
                <Link to="/accueil">
                    <Btn name="Retour accueil" className='btn' />
                </Link>
            </div>
        );
    }

    if (!ficheData) {
        return (
            <div className="no-data-container">
                <p>Aucune fiche produit trouvée.</p>
                <Link to="/accueil">
                    <Btn name="Retour accueil" className='btn' />
                </Link>
            </div>
        );
    }

    return (
        <div className="ficheFinale">
            <div className="print-content">
                <h2>Fiche de Produit</h2>
                <div className="fiche-details">
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Code Produit:</strong></td>
                                <td>{ficheData.code_produit}</td>
                            </tr>
                            <tr>
                                <td><strong>Nom Produit:</strong></td>
                                <td>{ficheData.nom_produit}</td>
                            </tr>
                            <tr>
                                <td><strong>Quantité:</strong></td>
                                <td>{ficheData.quantite} kg</td>
                            </tr>
                            <tr>
                                <td><strong>Date de Production:</strong></td>
                                <td>{new Date(ficheData.date_production).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td><strong>Date d'Expiration:</strong></td>
                                <td>{new Date(ficheData.date_expiration).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td><strong>Fournisseur:</strong></td>
                                <td>{ficheData.fournisseur}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="no-print">
                <Btn name="Imprimer" className='btn' onClick={handlePrint} />
                <Link to="/accueil">
                    <Btn name="Retour accueil" className='btn' />
                </Link>
            </div>

            <style>{`
                .ficheFinale {
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .fiche-details table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                
                .fiche-details td {
                    padding: 10px;
                    border: 1px solid #ddd;
                }
                
                .loading, .error-container, .no-data-container {
                    text-align: center;
                    padding: 20px;
                }
                
                .btn {
                    margin: 10px;
                }
                
                @media print {
                    .no-print {
                        display: none;
                    }
                    .print-content {
                        padding: 20px;
                    }
                }
            `}</style>
        </div>
    );
}