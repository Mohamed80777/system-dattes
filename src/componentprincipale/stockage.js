import React from 'react';
import { Link } from 'react-router-dom';
import Header from './accuiel';

export default function Verification() {
    return (
        <div className="bg-light min-vh-100">
            <Header />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-white p-4 rounded text-center">
                        <h2 className="mb-4"></h2>
                        <div className="d-grid gap-3">
                            {/* Bouton pour Stockage Entrée */}
                            <Link to="/stockageEntre" className="btn btn-primary btn-lg">
                                Stockage Entrée
                            </Link>

                            {/* Bouton pour Stockage Sortie */}
                            <Link to="/stockageSortie" className="btn btn-secondary btn-lg">
                                 Stockage Sortie
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}