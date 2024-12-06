import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../components/navegation_bar';
import CloseAppointmentModal from './CloseAppointmentModal'; // Componente del modal
import CreateAppointment from './CreateAppointment'; // Componente de crear cita
import './CalendarView.css'; // Asegúrate de que el archivo CSS esté importado

const CalendarView = () => {
    const [citas, setCitas] = useState([]); // Todas las citas
    const [filteredCitas, setFilteredCitas] = useState([]); // Citas filtradas
    const [showModal, setShowModal] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null); // Para almacenar la cita seleccionada
    const [showCreateAppointment, setShowCreateAppointment] = useState(false); // Estado para mostrar el modal de crear cita

    const [search, setSearch] = useState({
        motivo: '',
        doctor: '',
        paciente: '',
        fecha: ''
    }); // Estado para los filtros

    // Función para obtener las citas desde el backend
    const fetchCitas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/citas');
            console.log('Citas obtenidas del backend:', response.data);

            // Mapeo de las citas a formato compatible para listado
            const citasOrdenadas = response.data.sort((a, b) => {
                const dateA = new Date(`${a.FechaCita}T${a.HoraCita}`); // Uso del formato correcto para fecha y hora
                const dateB = new Date(`${b.FechaCita}T${b.HoraCita}`);
                return dateA - dateB; // Ordenar las citas por fecha y hora
            });

            setCitas(citasOrdenadas);
            setFilteredCitas(citasOrdenadas); // Inicialmente mostrar todas las citas
        } catch (error) {
            console.error('Error al cargar citas:', error);
        }
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    // Filtrar las citas según los filtros aplicados
    const filterCitas = () => {
        const { motivo, doctor, paciente, fecha } = search;

        const filtered = citas.filter((cita) => {
            const matchMotivo = motivo ? cita.MotivoCita.toLowerCase().includes(motivo.toLowerCase()) : true;
            const matchDoctor = doctor ? cita.DoctorNombre.toLowerCase().includes(doctor.toLowerCase()) : true;
            const matchPaciente = paciente ? `${cita.PacienteNombre} ${cita.PacienteApellido}`.toLowerCase().includes(paciente.toLowerCase()) : true;
            const matchFecha = fecha ? new Date(cita.FechaCita).toLocaleDateString() === new Date(fecha).toLocaleDateString() : true;

            return matchMotivo && matchDoctor && matchPaciente && matchFecha;
        });

        setFilteredCitas(filtered);
    };

    // Manejar cambios en los filtros
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch((prevSearch) => {
            const newSearch = { ...prevSearch, [name]: value };
            filterCitas(newSearch); // Filtrar cada vez que el usuario cambia un filtro
            return newSearch;
        });
    };

    // Función para abrir el modal de cierre de cita
    const handleCloseCita = (cita) => {
        setSelectedCita(cita);
        setShowModal(true); // Abre el modal
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedCita(null);
    };

    // Función para mostrar el modal de creación de cita
    const handleCreateAppointment = () => {
        setShowCreateAppointment(true);
    };

    // Función para cerrar el modal de creación de cita
    const closeCreateAppointmentModal = () => {
        setShowCreateAppointment(false);
    };

    return (
        <div className="calendar-wrapper">
            <NavigationBar />
            
            {/* Filtros de búsqueda */}
            <div className="search-filters">
                <input
                    type="text"
                    name="motivo"
                    placeholder="Buscar por motivo"
                    value={search.motivo}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    name="doctor"
                    placeholder="Buscar por doctor"
                    value={search.doctor}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    name="paciente"
                    placeholder="Buscar por paciente"
                    value={search.paciente}
                    onChange={handleSearchChange}
                />
                <input
                    type="date"
                    name="fecha"
                    value={search.fecha}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="appointments-list">
                <h2>Lista de Citas</h2>
                <ul>
                    {filteredCitas.map((cita, index) => {
                        const fechaCita = new Date(cita.FechaCita); // Asegurarse de que esté correctamente formateado
                        const horaCita = new Date(`1970-01-01T${cita.HoraCita}Z`).toLocaleTimeString(); // Formato adecuado para la hora

                        return (
                            <li key={index}>
                                <div className="appointment-details">
                                    <div className="detail-item"><strong>Motivo:</strong> {cita.MotivoCita}</div>
                                    <div className="detail-item"><strong>Doctor:</strong> {cita.DoctorNombre}</div>
                                    <div className="detail-item"><strong>Paciente:</strong> {cita.PacienteNombre} {cita.PacienteApellido}</div>
                                    <div className="detail-item"><strong>Fecha:</strong> {fechaCita.toLocaleDateString()}</div>
                                    <div className="detail-item"><strong>Hora:</strong> {horaCita}</div>
                                    {/* Botón para cerrar la cita */}
                                    <button onClick={() => handleCloseCita(cita)} className="close-appointment-button">Cerrar Cita</button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {showModal && selectedCita && (
                <CloseAppointmentModal
                    cita={selectedCita}
                    onClose={closeModal}
                    onSave={(updatedCita) => {
                        closeModal();
                        setCitas((prevCitas) =>
                            prevCitas.map((cita) =>
                                cita.id === updatedCita.id ? updatedCita : cita
                            )
                        );
                    }}
                />
            )}

            {/* Botón flotante para crear cita */}
            <button
                className="floating-create-button"
                onClick={handleCreateAppointment}
            >
                +
            </button>

            {/* Mostrar CreateAppointment solo cuando el estado showCreateAppointment sea true */}
            {showCreateAppointment && (
                <CreateAppointment closeModal={closeCreateAppointmentModal} />
            )}
        </div>
    );
};

export default CalendarView;
