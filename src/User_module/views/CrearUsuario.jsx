import React, { useState } from 'react';

const CrearUsuario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        nombreUsuario: '',
        rol: '',
        password: '',
        estado: 1 // Activo por defecto
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setError('');
                setFormData({
                    nombre: '',
                    apellido: '',
                    dni: '',
                    nombreUsuario: '',
                    rol: '',
                    password: '',
                    estado: 1
                });
            } else {
                setError(data.error || 'Error al crear el usuario');
                setMessage('');
            }
        } catch (err) {
            console.error("Error:", err);
            setError('Error de conexión o del servidor');
            setMessage('');
        }
    };

    return (
        <div className="crear-usuario-container">
            <h2>Crear Nuevo Usuario</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </label>
                <label>
                    Apellido:
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                </label>
                <label>
                    DNI:
                    <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
                </label>
                <label>
                    Nombre de Usuario:
                    <input type="text" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange} required />
                </label>
                <label>
                    Rol:
                    <select name="rol" value={formData.rol} onChange={handleChange} required>
                        <option value="">Seleccione un rol</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </label>
                <label>
                    Contraseña:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <label>
                    Estado:
                    <select name="estado" value={formData.estado} onChange={handleChange} required>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </label>
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};

export default CrearUsuario;
