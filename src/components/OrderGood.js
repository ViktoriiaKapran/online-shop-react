import { Box, Stack } from '@mui/material';
import React from 'react';
import { Image } from './Image/Image';

function OrderGood({ url, name, count, price }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ height: '100px', width: '100px' }}>
        <Image url={url} />
      </Box>
      <Box>
        <Box sx={{ flexGrow: 1 }}>{name}</Box>
        <Box>Count: {count}</Box>
        <Box>Price: {price} UAN</Box>
      </Box>
    </Stack>
  )
}

export default OrderGood;