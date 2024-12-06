import React from 'react';

const SelectField = ({ label, name, value, onChange, options }) => (
    <div className="input-group">
        <label>{label}</label>
        <select name={name} value={value} onChange={onChange}>
            <option value="">Seleccione una opción</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default SelectField;
