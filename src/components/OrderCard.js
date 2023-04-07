import { Box, Card, CardContent, Stack } from '@mui/material';
import React from 'react';
import OrderGood from './OrderGood';
import Price from './Price';
import { getDateString } from '../functions/getDataString';

function OrderCard({ order }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          {order?.orderGoods?.map(good =>
            <OrderGood
              key={good?.good?._id}
              url={good?.good?.images[0]?.url}
              name={good?.good?.name}
              count={good?.count}
              price={good?.price} />)}
          <Price>Total: {order?.total}</Price>
          <Box sx={{ textAlign: 'end' }}>{getDateString(order?.createdAt)}</Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default OrderCard;