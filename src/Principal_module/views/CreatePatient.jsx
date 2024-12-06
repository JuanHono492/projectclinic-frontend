import React, { useState } from 'react';
import NavigationBar from '../components/navegation_bar';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const CreatePatient = ({ onSave }) => {
    const [formData, setFormData] = useState({
        DNI: '',
        Nombre: '',
        Apellido: '',
        FechaNacimiento: '',
        Genero: '',
        EstadoCivil: '',
        TipoSangre: '',
        Ocupacion: '',
        Direccion: '',
        Telefono: '',
        CorreoElectronico: '',
        Activo: true,
    });

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Buscar información por DNI usando fetch
    const handleBuscarPorDNI = async () => {
        const dni = formData.DNI.trim();
        if (!dni) {
            alert('Ingrese un DNI válido.');
            return;
        }

        try {
            const token =
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imhvbm9qdWFuOUBnbWFpbC5jb20ifQ.HHyPK1eIvEB9rIjgM6X3OEz9eLpAHALAytvN0aTpMaM';
            
            const response = await fetch(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=${token}`);
            
            if (!response.ok) {
                throw new Error('No se encontraron datos para este DNI.');
            }

            const data = await response.json();

            if (data) {
                const { nombres, apellidoPaterno, apellidoMaterno } = data;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    Nombre: nombres,
                    Apellido: `${apellidoPaterno} ${apellidoMaterno}`,
                }));
            } else {
                alert('No se encontraron datos para este DNI.');
            }
        } catch (error) {
            console.error('Error al buscar los datos del DNI:', error);
            alert('Hubo un error al buscar los datos del DNI.');
        }
    };

    // Enviar los datos del formulario al backend usando fetch
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiBaseUrl}/pacientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al crear el paciente');
            }

            const result = await response.json();
            console.log('Paciente creado:', result);
            alert('Paciente creado exitosamente');
            if (onSave) onSave(); // Callback para actualizar la vista
        } catch (error) {
            console.error('Error al crear el paciente:', error);
            alert('Hubo un problema al crear el paciente.');
        }
    };

    return (
        <div className="create-patient-form">
            <nav className="navbar">
                <NavigationBar />
            </nav>
            <h2>Registrar Paciente</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>DNI:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            name="DNI"
                            value={formData.DNI}
                            onChange={handleChange}
                            placeholder="Ingrese el DNI"
                            required
                        />
                        <button type="button" onClick={handleBuscarPorDNI}>
                            Buscar por DNI
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="Nombre"
                        value={formData.Nombre}
                        onChange={handleChange}
                        placeholder="Nombre del paciente"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="Apellido"
                        value={formData.Apellido}
                        onChange={handleChange}
                        placeholder="Apellido del paciente"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="FechaNacimiento"
                        value={formData.FechaNacimiento}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Género:</label>
                    <select name="Genero" value={formData.Genero} onChange={handleChange}>
                        <option value="">Seleccione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Estado Civil:</label>
                    <select name="EstadoCivil" value={formData.EstadoCivil} onChange={handleChange}>
                        <option value="">Seleccione</option>
                        <option value="Soltero">Soltero</option>
                        <option value="Casado">Casado</option>
                        <option value="Divorciado">Divorciado</option>
                        <option value="Viudo">Viudo</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Tipo de Sangre:</label>
                    <input
                        type="text"
                        name="TipoSangre"
                        value={formData.TipoSangre}
                        onChange={handleChange}
                        placeholder="Ejemplo: O+"
                    />
                </div>

                <div className="form-group">
                    <label>Ocupación:</label>
                    <input
                        type="text"
                        name="Ocupacion"
                        value={formData.Ocupacion}
                        onChange={handleChange}
                        placeholder="Ocupación del paciente"
                    />
                </div>

                <div className="form-group">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="Direccion"
                        value={formData.Direccion}
                        onChange={handleChange}
                        placeholder="Dirección del paciente"
                    />
                </div>

                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="Telefono"
                        value={formData.Telefono}
                        onChange={handleChange}
                        placeholder="Teléfono del paciente"
                    />
                </div>

                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        name="CorreoElectronico"
                        value={formData.CorreoElectronico}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit">Registrar Paciente</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePatient;
