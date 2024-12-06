import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage({ onClick }) { // Recibe la función onClick como prop
  return <Button variant="outlined" onClick={onClick}>Iniciar sesión</Button>;
}
