import React from 'react';
import InputField from './InputField';

const AddressSection = ({ direccion, handleAddressChange }) => {
    return (
        <div className="form-section">
            <h3>Dirección</h3>
            <InputField
                label="Calle" 
                type="text" 
                name="calle" 
                value={direccion.calle} 
                onChange={handleAddressChange} 
            />
            <InputField
                label="Ciudad" 
                type="text" 
                name="ciudad" 
                value={direccion.ciudad} 
                onChange={handleAddressChange} 
            />
            <InputField
                label="Estado" 
                type="text" 
                name="estado" 
                value={direccion.estado} 
                onChange={handleAddressChange} 
            />
            <InputField
                label="Código Postal" 
                type="text" 
                name="codigoPostal" 
                value={direccion.codigoPostal} 
                onChange={handleAddressChange} 
            />
        </div>
    );
};

export default AddressSection;
