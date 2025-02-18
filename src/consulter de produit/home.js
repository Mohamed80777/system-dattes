import React from "react";
import { Link } from "react-router-dom";
import Head from "../componentprincipale/accuiel";

export default function Home() {
    return (
        <div className="bg-light min-vh-100">
            <Head />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-white p-4 rounded text-center">
                        <h2 className="mb-4">Tableaux Principaux</h2>
                        <div className="d-grid gap-3">
                            {/* Bouton pour Table de Produit */}
                            <Link to="/tableproduit" className="btn btn-primary btn-lg">
                                Table de Produit
                            </Link>

                            {/* Bouton pour Table de Fumigation */}
                            <Link to="/tablefumigation" className="btn btn-primary btn-lg">
                                Table de Fumigation
                            </Link>

                            {/* Bouton pour Table Chambre 1 */}
                            <Link to="/tablechambre1" className="btn btn-primary btn-lg">
                                Table Chambre 1
                            </Link>

                            {/* Bouton pour Table Chambre 2 */}
                            <Link to="/tablechambre2" className="btn btn-primary btn-lg">
                                Table Chambre 2
                            </Link>

                            {/* Bouton pour Table Chambre 3 */}
                            <Link to="/tablechambre3" className="btn btn-primary btn-lg">
                                Table Chambre 3
                            </Link>

                            {/* Bouton pour Table de Triage */}
                            <Link to="/tabletriage" className="btn btn-primary btn-lg">
                                Table de Triage
                            </Link>

                            {/* Bouton pour Table de Fournisseur */}
                            <Link to="/tablefournisseur" className="btn btn-primary btn-lg">
                                Table de Fournisseur
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}