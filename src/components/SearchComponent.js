import { Search } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

function SearchComponent({ onSearch }) {
  const [searchStr, setSearchStr] = useState('');
  return (
    <Box>
      <TextField
        variant="standard"
        placeholder='Search'
        onChange={e => setSearchStr(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearch(e.target.value);
          }
        }} />
      <IconButton onClick={() => onSearch(searchStr)}><Search /></IconButton>
    </Box>
  )
}

export default SearchComponent;