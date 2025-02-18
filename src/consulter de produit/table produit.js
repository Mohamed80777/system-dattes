import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../componentprincipale/accuiel";

export default function TableProduit() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Charger les produits au chargement du composant
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fonction pour récupérer les produits depuis l'API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8888/projet de stage/api/product.php");
      setProducts(response.data.products);
    } catch (err) {
      setError("Erreur lors du chargement des données");
    }
  };

  // Fonction pour rechercher un produit par code
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/projet de stage/api/product.php?search=${searchQuery}`
      );
      setProducts(response.data.products);
    } catch (err) {
      setError("Erreur lors de la recherche");
    }
  };

  // Fonction pour supprimer un produit
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/projet de stage/api/product.php?id=${id}`);
      fetchProducts(); // Recharger les données après suppression
    } catch (err) {
      setError("Erreur lors de la suppression");
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
              <h2 className="text-center mb-4">Recherche dans la table des produits</h2>

              {/* Barre de recherche */}
              <div className="input-group mb-3">
                <span className="input-group-text">Code produit :</span>
                <input
                  type="text"
                  placeholder="Entrez le code produit"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                />
                <button
                  type="button"
                  className="btn btn-primary ms-2"
                  onClick={handleSearch}
                >
                  Rechercher
                </button>
              </div>

              {/* Bouton Retour */}
              

              {/* Message d'erreur */}
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              {/* Tableau des produits */}
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Code Fournisseur</th>
                    <th>Type de Produit</th>
                    <th>Date de Réception</th>
                    <th>Quantité (kg)</th>
                    <th>Code Produit</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.code_fournisseur}</td>
                        <td>{product.type_produit}</td>
                        <td>{product.date_reception}</td>
                        <td>{product.quantite}</td>
                        <td>{product.code_produit}</td>
                        <td>
                          <Link
                            to={`/modifier-produit/${product.id}`}
                            className="btn btn-warning btn-sm"
                          >
                            Modifier
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        Aucun produit trouvé
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