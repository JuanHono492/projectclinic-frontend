import React from 'react';
import NavigationBar from '../components/navegation_bar';
import MedicalHistoryTable from '../components/Historial_medico/MedicalHistoryTable';

const CrearHistorialMedico = () => {
    return (
        <div className="historial-form-container">
            <nav className="navbar">
                <NavigationBar />
            </nav>

            <MedicalHistoryTable />
        </div>
    );
};

export default CrearHistorialMedico;
