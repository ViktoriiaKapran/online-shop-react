import { Box, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkButton({ to, children, click }) {
  return (
    <Box sx={{ mx: 1, my: 2 }}>
      <Button to={to} component={Link} color="inherit" onClick={click}>{children}</Button>
    </Box>
  )
}
