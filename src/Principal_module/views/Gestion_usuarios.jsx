import React, { useState } from 'react';
import NavigationBar from '../components/navegation_bar';
import './Gestion_usuarios.css';
import axios from 'axios';

const GestionUsuarios = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        nombreUsuario: '',
        rol: '',
        correoElectronico: '',
        telefono: '',
        estado: true,
        contrasena: '',
        repetirContrasena: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'contrasena' || name === 'repetirContrasena') {
            setPasswordMatch(
                name === 'contrasena'
                    ? value === formData.repetirContrasena
                    : formData.contrasena === value
            );
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que las contraseñas coinciden
        if (!passwordMatch) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Crear un objeto con los datos del formulario
        const userData = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            dni: formData.dni,
            nombreUsuario: formData.nombreUsuario,
            rol: formData.rol,
            correoElectronico: formData.correoElectronico,
            telefono: formData.telefono,
            estado: formData.estado, // Mantener como booleano
            contrasena: formData.contrasena
        };

        console.log('Datos enviados:', userData); // Verifica los datos antes de enviar

        try {
            // Enviar la solicitud POST con los datos del formulario
            const response = await axios.post('http://localhost:5000/api/usuarios', userData);
            console.log("Usuario creado:", response.data);
            alert("Usuario creado exitosamente");
        } catch (error) {
            console.error("Error al crear usuario:", error);
            alert(`Error al crear usuario: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <NavigationBar />
            </nav>
            <main className="main-content">
                <div className="card">
                    <h1>Registro de Usuario</h1>
                    <form onSubmit={handleSubmit} className="user-form">
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Apellido:</label>
                            <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>DNI:</label>
                            <input type="text" name="dni" value={formData.dni} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Nombre de Usuario:</label>
                            <input type="text" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Rol:</label>
                            <input type="text" name="rol" value={formData.rol} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Correo Electrónico:</label>
                            <input type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Teléfono:</label>
                            <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="contrasena"
                                value={formData.contrasena}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="button" onClick={toggleShowPassword} className="toggle-password-button">
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                        <div className="form-group">
                            <label>Repetir Contraseña:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="repetirContrasena"
                                value={formData.repetirContrasena}
                                onChange={handleInputChange}
                                required
                            />
                            {!passwordMatch && <p className="error-message">Las contraseñas no coinciden</p>}
                        </div>
                        <div className="form-group">
                            <label>Estado:</label>
                            <input
                                type="checkbox"
                                name="estado"
                                checked={formData.estado}
                                onChange={(e) => setFormData({ ...formData, estado: e.target.checked })}
                            />
                        </div>
                        <button type="submit" className="submit-button">Guardar Usuario</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default GestionUsuarios;
