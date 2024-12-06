import React, { useState, useEffect } from 'react';
import './MedicalHistoryTable.css';
import { Modal, Box, Button, Typography } from '@mui/material';

const MedicalHistoryTable = () => {
    const [historialData, setHistorialData] = useState([]);
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Asegúrate de tener este env configurado

    useEffect(() => {
        const fetchHistorialData = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/historias`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Para verificar los datos recibidos
                    setHistorialData(data);
                } else {
                    setError('Error al obtener el historial médico');
                }
            } catch (err) {
                console.error('Error al obtener datos:', err);
                setError('Error al obtener el historial médico');
            }
        };

        fetchHistorialData();
    }, [apiBaseUrl]);

    const handleGenerateReport = (entry) => {
        try {
            // Acceder a 'Citum' dentro de 'Cita' si existe
            const citum = entry.Citum || {};
                 // Acceder a 'Citum'

            const reportData = {
                Paciente: `${entry.Paciente?.Nombre} ${entry.Paciente?.Apellido}`,
                DNI: entry.Paciente?.DNI,
                Genero: entry.Paciente?.Genero,
                TipoSangre: entry.Paciente?.TipoSangre,
                Medico: `${entry.Medico?.Nombre} ${entry.Medico?.Apellido}`,
                FechaCita: new Date(citum?.FechaCita || entry.FechaConsulta).toLocaleDateString(),
                MotivoCita: `${entry.Citum?.MotivoCita}` || 'N/A', // Acceder a 'MotivoCita' desde 'citum'
                EstadoCita: citum?.Estado || 'N/A', // Acceder a 'Estado' desde 'citum'
                DescripcionCita: citum?.DescripcionCita || 'N/A', // Acceder a 'DescripcionCita' desde 'citum'
                Diagnostico: entry.Diagnostico,
                Tratamiento: entry.Tratamiento,
            };

            setSelectedReport(reportData);
            setOpenModal(true); // Abre el modal
        } catch (error) {
            console.error('Error al preparar el reporte:', error);
            alert('Error al preparar el reporte');
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setSelectedReport(null);
    };

    return (
        <div className="table-container" style={{ width: '100%', maxWidth: '1400px' }}>
            {/* Tabla principal */}
            <table className="medical-history-table">
                <thead>
                    <tr>
                        <th>Fecha de Cita</th>
                        <th>Paciente</th>
                        <th>DNI</th>
                        <th>Género</th>
                        <th>Tipo de Sangre</th>
                        <th>Diagnóstico</th>
                        <th>Tratamiento</th>
                        <th>Motivo de Cita</th>
                        <th>Estado de Cita</th>
                        <th>Descripción de Cita</th>
                        <th>Doctor</th>
                        <th>Reporte</th>
                    </tr>
                </thead>
                <tbody>
                    {historialData.length > 0 ? (
                        historialData.map((entry, index) => {
                            const cita = entry.Cita || {}; // Asegurarse que 'Cita' sea un objeto
                            const citum = cita.Citum || {}; // Acceder a 'Citum'
                            return (
                                <tr key={index}>
                                    <td>{new Date(cita?.FechaCita || entry.FechaConsulta).toLocaleDateString()}</td>
                                    <td>{entry.Paciente ? `${entry.Paciente.Nombre} ${entry.Paciente.Apellido}` : 'N/A'}</td>
                                    <td>{entry.Paciente?.DNI || 'N/A'}</td>
                                    <td>{entry.Paciente?.Genero || 'N/A'}</td>
                                    <td>{entry.Paciente?.TipoSangre || 'N/A'}</td>
                                    <td>{entry.Diagnostico || 'N/A'}</td>
                                    <td>{entry.Tratamiento || 'N/A'}</td>
                                    <td>{citum?.MotivoCita || 'N/A'}</td> {/* Acceder a 'MotivoCita' */}
                                    <td>{citum?.Estado || 'N/A'}</td> {/* Acceder a 'Estado' */}
                                    <td>{citum?.DescripcionCita || 'N/A'}</td> {/* Acceder a 'DescripcionCita' */}
                                    <td>{entry.Medico ? `Dr. ${entry.Medico.Nombre} ${entry.Medico.Apellido}` : 'N/A'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleGenerateReport(entry)}
                                            className="generate-report-button"
                                        >
                                            Generar Reporte
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="12">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            <Modal
                open={openModal}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        maxWidth: '600px',
                        width: '90%',
                    }}
                >
                    {selectedReport ? (
                        <>
                            <Typography id="modal-title" variant="h6" component="h2" textAlign="center">
                                Reporte Médico
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                <strong>Paciente:</strong> {selectedReport.Paciente}
                            </Typography>
                            <Typography variant="body1">
                                <strong>DNI:</strong> {selectedReport.DNI}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Genero:</strong> {selectedReport.Genero}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Tipo de Sangre:</strong> {selectedReport.TipoSangre}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Médico:</strong> {selectedReport.Medico}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Fecha de Cita:</strong> {selectedReport.FechaCita}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Motivo de Cita:</strong> {selectedReport.MotivoCita}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Estado de Cita:</strong> {selectedReport.EstadoCita}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Descripción de Cita:</strong> {selectedReport.DescripcionCita}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Diagnóstico:</strong> {selectedReport.Diagnostico}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Tratamiento:</strong> {selectedReport.Tratamiento}
                            </Typography>
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="contained" color="primary" onClick={() => alert('Guardado')}>
                                    Guardar
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={closeModal}>
                                    Desechar
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography>No se encontraron datos para el reporte.</Typography>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default MedicalHistoryTable;
