import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns'; // Importamos la librería date-fns
import './CloseAppointmentModal.css';

const CloseAppointmentModal = ({ cita, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        ...cita,
        Diagnostico: '',
        Tratamiento: '',
        Notas: '',
        Estado: 'Cerrada', // Estado actualizado a 'Cerrada'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Obtener la fecha actual y formatearla con date-fns
            const fechaConsulta = new Date();
            
            // Usamos format() para formatear la fecha a 'DD-MM-YYYY HH:MM:SS'
            const fechaConsultaString = format(fechaConsulta, 'dd-MM-yyyy HH:mm:ss');

            // Datos que se enviarán al backend
            const historiaData = {
                PacienteID: formData.PacienteID, // Se debe pasar el ID del paciente
                CitaID: formData.CitaID, // ID de la cita
                FechaConsulta: fechaConsultaString, // Fecha de la consulta formateada
                DoctorID: formData.DoctorID, // ID del doctor
                Diagnostico: formData.Diagnostico, // Diagnóstico
                Tratamiento: formData.Tratamiento, // Tratamiento
                NotasAdicionales: formData.Notas // Notas adicionales
            };

            // Verificar en consola que los datos estén correctos antes de enviarlos
            console.log('Enviando datos al backend:', historiaData);

            const response = await axios.post('http://localhost:5000/api/historias/crear', historiaData);
        
            // Procesar la respuesta y cerrar la cita
            alert('Historial clínico guardado');
            onSave(response.data); // Actualiza la cita en la vista
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Hubo un error al guardar en el historial clínico:', error);
            alert('Hubo un error al guardar en el historial clínico');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Cerrar Cita</h2>
                <form onSubmit={handleSubmit} className="appointment-form">
                    <div className="form-group">
                        <label>Paciente:</label>
                        <input type="text" value={`${cita.PacienteNombre} ${cita.PacienteApellido}`} disabled />
                    </div>

                    <div className="form-group">
                        <label>Doctor:</label>
                        <input type="text" value={`${cita.DoctorNombre} ${cita.DoctorApellido}`} disabled />
                    </div>

                    <div className="form-group">
                        <label>Motivo:</label>
                        <input type="text" value={cita.MotivoCita} disabled />
                    </div>

                    <div className="form-group">
                        <label>Diagnóstico:</label>
                        <input
                            type="text"
                            name="Diagnostico"
                            value={formData.Diagnostico}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tratamiento:</label>
                        <input
                            type="text"
                            name="Tratamiento"
                            value={formData.Tratamiento}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Notas:</label>
                        <textarea name="Notas" value={formData.Notas} onChange={handleChange}></textarea>
                    </div>

                    <div className="form-buttons">
                        <button type="submit">Cerrar Cita</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CloseAppointmentModal;
