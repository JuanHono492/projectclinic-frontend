import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ label, value, onChange, name, type }) {
    return (
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          id={`outlined-${name}`} 
          label={label} 
          variant="outlined" 
          value={value} 
          onChange={onChange} 
          name={name} 
          type={type || 'text'} // Asegura que el tipo sea 'text' por defecto si no se especifica
        />
      </Box>
    );
}
