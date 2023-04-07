import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import Price from './Price';
import Counter from './Counter/Counter';
import { addGoodToCart, deleteGoodFromCart, decreaseGoodCount, setGoodCount, clearCart } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import OrderGood from './OrderGood';


export default function CartGood({ good }) {
  const [totalSum, setTotalSum] = useState(good.good.price * good.count);
  const dispatch = useDispatch();
  const count = useSelector(state => state.cart.goods.find(findedGood => findedGood.good._id === good.good._id)?.count);
  
  useEffect(() => {
    setTotalSum(good.good.price * count);
  }, [count]);
  const decrease = (good) => {
    dispatch(decreaseGoodCount(good));
  }
  return (
    <Card key={good.good._id} sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <OrderGood url={good.good.images[0]?.url} name={good.good.name} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <RemoveIcon sx={{ cursor: 'pointer' }} onClick={() => decrease({ good: good.good })} />
            <Counter value={count} onCount={(countValue) => dispatch(setGoodCount({ good: good.good, count: countValue }))} />
            <AddIcon sx={{ cursor: 'pointer' }} onClick={() => dispatch(addGoodToCart({ good: good.good, count: 1 }))} />
          </Box>
          <Box>
            <Price>{totalSum}</Price>
          </Box>
          <IconButton onClick={() => dispatch(deleteGoodFromCart({ good: good.good, count }))}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  )
}
