import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../componentprincipale/accuiel';

export default function TableChambre1() {
    const [entreData, setEntreData] = useState([]);
    const [sortieData, setSortieData] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8888/projet de stage/api/chambre2.php?search=${search}`);
            if (response.data.status === 'success') {
                setEntreData(response.data.entre);
                setSortieData(response.data.sortie);
                setError('');
            } else {
                setEntreData([]);
                setSortieData([]);
                setError('Aucun lot trouvé dans la chambre 1');
            }
        } catch (err) {
            setError('Erreur lors de la récupération des lots');
            setEntreData([]);
            setSortieData([]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce lot ?")) {
            try {
                const response = await axios.delete(`http://localhost:8888/projet de stage/api/chambre2.php?id=${id}`);
                if (response.data.status === 'success') {
                    alert("Lot supprimé avec succès !");
                    fetchData();
                } else {
                    alert(response.data.message);
                }
            } catch (err) {
                alert('Erreur lors de la suppression');
            }
        }
    };

    // Calculate totals
    const calculateTotals = () => {
        const entreTotals = entreData.reduce((acc, curr) => ({
            pl: (acc.pl || 0) + (parseFloat(curr.pl) || 0),
            lm: (acc.lm || 0) + (parseFloat(curr.lm) || 0),
            gc: (acc.gc || 0) + (parseFloat(curr.gc) || 0),
            poids: (acc.poids || 0) + (parseFloat(curr.poids) || 0)
        }), {});
        const sortieTotals = sortieData.reduce((acc, curr) => ({
            pl: (acc.pl || 0) + (parseFloat(curr.pl) || 0),
            lm: (acc.lm || 0) + (parseFloat(curr.lm) || 0),
            gc: (acc.gc || 0) + (parseFloat(curr.gc) || 0),
            poids: (acc.poids || 0) + (parseFloat(curr.poids) || 0)
        }), {});
        return {
            entre: entreTotals,
            sortie: sortieTotals,
            restant: {
                pl: entreTotals.pl - sortieTotals.pl,
                lm: entreTotals.lm - sortieTotals.lm,
                gc: entreTotals.gc - sortieTotals.gc,
                poids: entreTotals.poids - sortieTotals.poids
            }
        };
    };

    const totals = calculateTotals();

    return (
        <div>
            <Header />
            <div className="bg-light min-vh-100">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-12 bg-white p-4 rounded">
                            {/* Titre */}
                            <h2 className="text-center mb-4">Recherche dans la chambre 1</h2>

                            {/* Barre de recherche */}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Numéro de lot :</span>
                                <input
                                    type="text"
                                    placeholder="Entrez le numéro du lot"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="form-control"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary ms-2"
                                    onClick={fetchData}
                                >
                                    Rechercher
                                </button>
                            </div>

                            {/* Bouton Retour */}
                            <Link to="/home" className="btn btn-secondary mb-3">
                                Retour
                            </Link>

                            {/* Message d'erreur */}
                            {error && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {error}
                                </div>
                            )}

                            {/* Tableau */}
                            <h3 className="mb-3">Suivi du Stockage</h3>
                            <table className="table table-bordered table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th colSpan="7">Entrée</th>
                                        <th colSpan="7">Sortie</th>
                                        <th colSpan="4">Total</th>
                                        <th rowSpan="2">Supprimer</th>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <th>Lot N°</th>
                                        <th>Catégorie</th>
                                        <th>PL</th>
                                        <th>LM</th>
                                        <th>GC</th>
                                        <th>Poids (Kg)</th>
                                        <th>Date</th>
                                        <th>Lot N°</th>
                                        <th>Catégorie</th>
                                        <th>PL</th>
                                        <th>LM</th>
                                        <th>GC</th>
                                        <th>Poids (Kg)</th>
                                        <th>PL</th>
                                        <th>LM</th>
                                        <th>GC</th>
                                        <th>Poids (Kg)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entreData.length > 0 ? (
                                        entreData.map((entree, index) => {
                                            const sortie = sortieData[index] || {};
                                            return (
                                                <tr key={index}>
                                                    <td>{entree.date_stockage || ''}</td>
                                                    <td>{entree.lot_number || ''}</td>
                                                    <td>{entree.categorie || ''}</td>
                                                    <td>{entree.pl || ''}</td>
                                                    <td>{entree.lm || ''}</td>
                                                    <td>{entree.gc || ''}</td>
                                                    <td>{entree.poids || ''}</td>
                                                    <td>{sortie.date_stockage || ''}</td>
                                                    <td>{sortie.lot_number || ''}</td>
                                                    <td>{sortie.categorie || ''}</td>
                                                    <td>{sortie.pl || ''}</td>
                                                    <td>{sortie.lm || ''}</td>
                                                    <td>{sortie.gc || ''}</td>
                                                    <td>{sortie.poids || ''}</td>
                                                    <td>{entree.pl - (sortie.pl || 0)}</td>
                                                    <td>{entree.lm - (sortie.lm || 0)}</td>
                                                    <td>{entree.gc - (sortie.gc || 0)}</td>
                                                    <td>{entree.poids - (sortie.poids || 0)}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(entree.id)}
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="18" className="text-center">
                                                Aucun lot trouvé
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="table-secondary">
                                        <td colSpan="3">Total entrée</td>
                                        <td>{totals.entre.pl}</td>
                                        <td>{totals.entre.lm}</td>
                                        <td>{totals.entre.gc}</td>
                                        <td>{totals.entre.poids}</td>
                                        <td colSpan="3">Tot. sortie</td>
                                        <td>{totals.sortie.pl}</td>
                                        <td>{totals.sortie.lm}</td>
                                        <td>{totals.sortie.gc}</td>
                                        <td>{totals.sortie.poids}</td>
                                        <td>{totals.restant.pl}</td>
                                        <td>{totals.restant.lm}</td>
                                        <td>{totals.restant.gc}</td>
                                        <td>{totals.restant.poids}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}