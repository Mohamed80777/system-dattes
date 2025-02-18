import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import Btn from '../componentForm/button';
import Lab from '../componentForm/label';
import Text from '../componentForm/inputText';

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
            const response = await axios.get(`http://localhost:8888/projet de stage/api/chambre3.php?search=${search}`);
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
                const response = await axios.delete(`http://localhost:8888/projet de stage/api/chambre3.php?id=${id}`);
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
        <div className="tableChambre1">
            <div className="recherche">
                <h2>Recherche dans la chambre 1</h2>
                <Lab lab="Numéro de lot :" />
                <Text 
                    placeholder="Entrez le numéro du lot" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <Btn name="Recherche" className="btn" onClick={fetchData} />
                <Link to="/home">
                    <Btn name="Retour" className="btn" />
                </Link>
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <h3>Suivi du Stockage</h3>
            <table>
                <thead>
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
                    {entreData.map((entree, index) => {
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
                                    <Btn name="Supprimer" className="btn9" onClick={() => handleDelete(entree.id)} />
                                </td>
                            </tr>
                        );
                    })}
                    <tr className="total-row">
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
    );
}