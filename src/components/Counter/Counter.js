import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './Counter.scss'

export default function Counter({ value, onCount }) {
  const [countValue, setCountValue] = useState(value);
  useEffect(() => setCountValue(value), [value]);

  return (
    <Box sx={{ width: '50px', mx: '6px' }}>
      <TextField
        className='counter'
        type="number"
        min="1"
        value={countValue}
        size="small"
        onChange={e => {
          setCountValue(e.target.value);
          if (e.target.value !== '') { // emit only valid values
            onCount(+e.target.value);
          }
        }
        }
      />
    </Box>
  )
}