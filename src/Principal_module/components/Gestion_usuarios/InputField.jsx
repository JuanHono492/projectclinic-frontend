import React from 'react';

const InputField = ({ label, type, name, value, onChange }) => (
    <div className="input-group">
        <label>{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} />
    </div>
);

export default InputField;
