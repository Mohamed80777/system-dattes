import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../componentForm/inputText';
import Pass from '../componentForm/inputModePasse';
import Btn from '../componentForm/button';
import Label from '../componentForm/label';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PageLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("L'email est requis");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("L'email n'est pas valide");
      return false;
    }
    if (!formData.password) {
      setError("Le mot de passe est requis");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8888/projet de stage/api/login.php', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/fournisseurs');
      } else {
        setError(response.data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur de connexion au serveur. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(to right, #2ecc71, #27ae60)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow" style={{ borderRadius: '10px' }}>
              <h2 className="text-center text-success">Connexion</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <table className="table-borderless w-100">
                  <tbody>
                    <tr>
                      <td className="text-start">
                        <Label className="form-label" lab="Email :" />
                      </td>
                      <td>
                        <Text
                          className="form-control"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Entrez votre email"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        <Label className="form-label" lab="Mot de passe :" />
                      </td>
                      <td>
                        <Pass
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Entrez votre mot de passe"
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Btn 
                  name={loading ? "Connexion en cours..." : "Se connecter"} 
                  className="btn btn-success w-100 mt-3" 
                  type="submit"
                  disabled={loading}
                />
              </form>
              <div className="text-center mt-3">
                <p>Vous n'avez pas de compte ? <a href="/signup" className="text-success">S'inscrire</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
