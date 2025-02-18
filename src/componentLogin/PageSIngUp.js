import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../componentForm/inputText';
import Pass from '../componentForm/inputModePasse';
import Btn from '../componentForm/button';
import Label from '../componentForm/label';
import axios from 'axios';

export default function PageSignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Le nom complet est requis');
      return false;
    }
    if (!formData.email.trim()) {
      setError('L\'email est requis');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('L\'email n\'est pas valide');
      return false;
    }
    if (!formData.password) {
      setError('Le mot de passe est requis');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères');
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8888/projet de stage/api/signup.php',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'success') {
        alert('Inscription réussie !');
        navigate('/');
      } else {
        setError(response.data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(
        error.response?.data?.message || 
        'Erreur de connexion au serveur. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <h1 className="title">Créer un compte</h1>
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSignUp}>
        <table>
          <tbody>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <Label className="label" lab="Nom complet :" />
              </td>
              <td>
                <Text
                  className="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Entrez votre nom complet"
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <Label className="label" lab="Email :" />
              </td>
              <td>
                <Text
                  className="text"
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
              <td style={{ textAlign: 'left' }}>
                <Label className="label" lab="Mot de passe :" />
              </td>
              <td>
                <Pass
                  className="pass"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Entrez votre mot de passe"
                  required
                  minLength={6}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Btn 
          name={loading ? "Inscription en cours..." : "S'inscrire"} 
          className="btn" 
          type="submit"
          disabled={loading}
        />
      </form>
      <h2 className="already">
        Déjà un compte ?{' '}
        <a href="/login" style={{ color: 'blue', textDecoration: 'none' }}>
          Connectez-vous
        </a>
      </h2>

      <style>{`
        .signup {
          max-width: 500px;
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .title {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
        }

        table {
          width: 100%;
          margin-bottom: 1.5rem;
        }

        td {
          padding: 0.5rem;
        }

        .btn {
          width: 100%;
          padding: 0.75rem;
          background: #4F46E5;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }

        .btn:hover {
          background: #4338CA;
        }

        .btn:disabled {
          background: #9CA3AF;
          cursor: not-allowed;
        }

        .already {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #666;
        }

        .error-message {
          padding: 0.75rem;
          background: #FEE2E2;
          border: 1px solid #EF4444;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}