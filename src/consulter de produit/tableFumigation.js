import React, { useState, useEffect } from "react";
import Btn from "../componentForm/button";
import Text from "../componentForm/inputText";
import { Link } from "react-router-dom";
import Lab from "../componentForm/label";
import axios from "axios";

export default function TableFumigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fumigations, setFumigations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFumigations();
  }, []);

  const fetchFumigations = async () => {
    try {
      const response = await axios.get("http://localhost:8888/projet de stage/api/fum.php");
      setFumigations(response.data.fumigations);
    } catch (err) {
      setError("Erreur lors du chargement des données");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/projet de stage/api/fum.php?search=${searchQuery}`
      );
      setFumigations(response.data.fumigations);
    } catch (err) {
      setError("Erreur lors de la recherche");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/projet de stage/api/fum.php?id=${id}`);
      fetchFumigations();
    } catch (err) {
      setError("Erreur lors de la suppression");
    }
  };

  return (
    <div className="tableFumigation">
      <div className="recherche">
        <h2>Recherche dans la table des fumigations</h2>
        <Lab lab="Code produit :" />
        <Text
          placeholder="Entrez le code produit"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="btnRecherche">
        <Btn name="Recherche" className="btn" onClick={handleSearch} />
        <Link to="/home">
          <Btn name="Retour" className="btn" />
        </Link>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code Produit</th>
            <th>N° du Lot</th>
            <th>Quantité Utilisée</th>
            <th>Date Début Fumigation</th>
            <th>Date Fin Fumigation</th>
           
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {fumigations.length > 0 ? (
            fumigations.map((fumigation) => (
              <tr key={fumigation.id}>
                <td>{fumigation.id}</td>
                <td>{fumigation.code_produit}</td>
                <td>{fumigation.numero_lot}</td>
                <td>{fumigation.quantite_utilisee} Kg</td>
                <td>{fumigation.date_debut_fumigation}</td>
                <td>{fumigation.date_fin_fumigation}</td>
                
                <td>
                  <Btn name="Supprimer" className="btn8" onClick={() => handleDelete(fumigation.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Aucune fumigation trouvée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
