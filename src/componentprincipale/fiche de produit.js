import Button from "../componentForm/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Text from "../componentForm/inputText";
import Select from "../componentForm/select";
import Lab from "../componentForm/label";
import Date from "../componentForm/inputDate";
import axios from "axios";
import Number from "../componentForm/inputNumber";

export default function FicheProduit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code_produit: "",
    nom_produit: "",
    quantite: "",
    date_production: "",
    date_expiration: "",
    fournisseur: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation simple
    if (!formData.code_produit.trim()) {
      setError("Le code de produit est requis");
      return;
    }
    if (!formData.nom_produit.trim()) {
      setError("Le nom de produit est requis");
      return;
    }
    if (!formData.quantite || formData.quantite <= 0) {
      setError("La quantité doit être un nombre positif");
      return;
    }
    if (!formData.date_production) {
      setError("La date de production est requise");
      return;
    }
    if (!formData.date_expiration) {
      setError("La date d'expiration est requise");
      return;
    }
    if (!formData.fournisseur) {
      setError("Le nom de fournisseur est requis");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8888/projet de stage/api/fiche.php",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        alert("Fiche de produit ajoutée avec succès !");
        navigate("/ficheFinale");
      } else {
        setError(response.data.message || "Une erreur est survenue");
      }
    } catch (error) {
      if (error.response) {
        setError("Erreur serveur : " + error.response.data.message);
      } else {
        setError("Erreur réseau : impossible d'envoyer la requête");
      }
    }
  };

  return (
    <div className="ficheProduit">
      <h2>Fiche de produit</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <Lab lab="Code de produit :" />
              </td>
              <td>
                <Text
                  name="code_produit"
                  value={formData.code_produit}
                  onChange={handleChange}
                  placeholder="Entre le code de produit"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Lab lab="Nom de produit :" />
              </td>
              <td>
                <Text
                  name="nom_produit"
                  value={formData.nom_produit}
                  onChange={handleChange}
                  placeholder="Entre le nom de produit"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Lab lab="Quantité en kg :" />
              </td>
              <td>
                <Number
                  name="quantite"
                  type="number"
                  value={formData.quantite}
                  onChange={handleChange}
                  placeholder="Entre la quantité"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Lab lab="Date de production :" />
              </td>
              <td>
                <Date
                  name="date_production"
                  value={formData.date_production}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Lab lab="Date d'expiration :" />
              </td>
              <td>
                <Date
                  name="date_expiration"
                  value={formData.date_expiration}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Lab lab="Nom de fournisseur :" />
              </td>
              <td>
                <Text
                    placeholder="Nom de fournisseur"
                  name="fournisseur"
                  value={formData.fournisseur}
                  onChange={handleChange}
                  
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button name="Valider" type="submit" />
      </form>
    </div>
  );
}
