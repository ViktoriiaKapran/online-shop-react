import { Box } from '@mui/material';
import React from 'react';

function NotFoundBanner({text}) {
  return (
    <Box sx={{
      textAlign: 'center', m: '100px auto 0', fontSize: '30px', backgroundColor: '#d5d5d5',
      color: '#fff', p: '50px 30px', maxWidth: '420px', borderRadius: '10px'
    }}>
      {text}
    </Box>
  )
}

export default NotFoundBanner;