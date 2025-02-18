import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../componentprincipale/accuiel";

export default function TableFournisseur() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  // Charger les fournisseurs depuis l'API
  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const fetchFournisseurs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/projet de stage/api/tabfourniseur.php?search=${searchQuery}`
      );
      if (response.data.status === "success") {
        setFournisseurs(response.data.fournisseurs);
      } else {
        setError("Aucun fournisseur trouvé");
      }
    } catch (err) {
      setError("Erreur lors de la récupération des fournisseurs");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce fournisseur ?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8888/projet de stage/api/tabfourniseur.php?id=${id}`
        );
        if (response.data.status === "success") {
          alert("Fournisseur supprimé avec succès !");
          fetchFournisseurs(); // Recharger les données après suppression
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-10 bg-white p-4 rounded">
              {/* Titre */}
              <h2 className="text-center mb-4">Recherche dans la table des fournisseurs</h2>
              {/* Barre de recherche */}
              <div className="input-group mb-3">
                <span className="input-group-text">Nom du fournisseur :</span>
                <input
                  type="text"
                  placeholder="Entrez le nom du fournisseur"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                />
                <button
                  type="button"
                  className="btn btn-primary ms-2"
                  onClick={fetchFournisseurs}
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
              {/* Tableau des fournisseurs */}
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Code Fournisseur</th>
                    <th>Nom Complet</th>
                    <th>Adresse</th>
                    <th>Téléphone</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseurs.length > 0 ? (
                    fournisseurs.map((fournisseur) => (
                      <tr key={fournisseur.id}>
                        <td>{fournisseur.code_fournisseur}</td>
                        <td>{fournisseur.nom_complet}</td>
                        <td>{fournisseur.adresse}</td>
                        <td>{fournisseur.telephone}</td>
                        <td>
                          <Link
                            to={`/modifier-fournisseur/${fournisseur.id}`}
                            className="btn btn-warning btn-sm"
                          >
                            Modifier
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(fournisseur.id)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Aucun fournisseur trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}