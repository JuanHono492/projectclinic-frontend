import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../components/Footer';
import './Inicio.css';

const Inicio = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Usar función de login desde el contexto
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // URL de autenticación desde .env
    const authApiUrl = process.env.REACT_APP_API_BASE_URL;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos
        setLoading(true);

        try {
            const response = await fetch(`${authApiUrl}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                login(data); // Guardar estado de autenticación
                navigate('/dashboard'); // Redirigir al dashboard
            } else {
                setError(data.error || 'Usuario o contraseña incorrectos.');
            }
        } catch (err) {
            console.error('Error de red o del servidor:', err);
            setError('Error de red o del servidor. Por favor, inténtelo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inicio-container">
            <div className="inicio-left">
                <div className="login-box">
                    <h2>Bienvenidos</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            placeholder="Usuario"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            placeholder="Contraseña"
                            required
                        />

                        {error && <p className="error-text">{error}</p>}

                        <div className="button-container">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="inicio-right">
                <div className="logo-container">
                    <img src="/ruta-al-logo.png" alt="Logo de la Clínica" className="logo-image" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Inicio;
