import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Btn from '../componentForm/button';
import Lab from '../componentForm/label';
import Text from '../componentForm/inputText';

export default function TableTriage() {
    const [triages, setTriages] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    // Charger les triages depuis l'API
    useEffect(() => {
        fetchTriages();
    }, [search]);

    const fetchTriages = async () => {
        try {
            const response = await axios.get(`http://localhost:8888/projet de stage/api/tri.php?search=${search}`);
            if (response.data.status === 'success') {
                setTriages(response.data.triages);
            } else {
                setError('Aucun triage trouvé');
            }
        } catch (err) {
            setError('Erreur lors de la récupération des triages');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce triage ?")) {
            try {
                const response = await axios.delete(`http://localhost:8888/projet de stage/api/tri.php?id=${id}`);
                if (response.data.status === 'success') {
                    alert("Triage supprimé avec succès !");
                    fetchTriages();
                } else {
                    alert(response.data.message);
                }
            } catch (err) {
                alert('Erreur lors de la suppression');
            }
        }
    };

    return (
        <div className="tableTriage">
            <div className="recherche">
                <h2>Recherche dans la table de triage</h2>
                <Lab lab="Code de produit :" />
                <Text 
                    placeholder="Entrez le code du produit" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <Btn name="Recherche" className="btn" onClick={fetchTriages} />
                <Link to="/home">
                    <Btn name="Retour" className="btn" />
                </Link>
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <table>
                <thead>
                    <tr>
                        <th>Code produit</th>
                        <th>Date de triage</th>
                        <th>Quantité utilisée (Kg)</th>
                        <th>Quantité produit fini (Kg)</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {triages.map((triage) => (
                        <tr key={triage.id}>
                            <td>{triage.code_produit}</td>
                            <td>{triage.date_triage}</td>
                            <td>{triage.quantite_utilisee}</td>
                            <td>{triage.quantite_produit_fini}</td>
                            <td>
                                <Btn name="Supprimer" className="btn10" onClick={() => handleDelete(triage.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
