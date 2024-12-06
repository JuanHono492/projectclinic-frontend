import React from 'react';
import InputField from './InputField';

const ContactSection = ({ formData, handleInputChange }) => {
    return (
        <div className="form-section">
            <h3>Contacto</h3>
            <InputField
                label="Teléfono de Oficina" 
                type="tel" 
                name="telefonoOficina" 
                value={formData.telefonoOficina} 
                onChange={handleInputChange} 
            />
            <InputField
                label="Extensión" 
                type="text" 
                name="extension" 
                value={formData.extension} 
                onChange={handleInputChange} 
            />
            <InputField
                label="Teléfono Móvil" 
                type="tel" 
                name="movil" 
                value={formData.movil} 
                onChange={handleInputChange} 
            />
            <InputField
                label="Correo Electrónico" 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
            />
        </div>
    );
};

export default ContactSection;
