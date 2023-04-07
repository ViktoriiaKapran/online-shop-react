import React from 'react';
import Title from '../components/Title';
import { clearCart } from '../store/cartSlice';
import CartGood from '../components/CartGood';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import Price from '../components/Price';
import { useCreateOrderMutation } from '../store/api';
import NotFoundBanner from '../components/NotFoundBanner';

export default function CartPage() {
  const goods = useSelector(state => state.cart.goods);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const token = useSelector(state => state.auth.token);
  const [createOrderAction, result] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const createOrder = (orderGoods) => {
    const orderGoodsDto = [];
    orderGoods.forEach(orderGood => {
      orderGoodsDto.push({
        good: { _id: orderGood.good._id },
        count: orderGood.count
      });
    });
    createOrderAction(orderGoodsDto).then(response => {
      dispatch(clearCart());
    });
  }
  return (
    <>
      <Title>Cart</Title>
      {goods?.length > 0 ?
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '4px' }}>
            <Button
              variant="text"
              size='small'
              color='inherit'
              sx={{ maxWidth: '100px' }}
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </Button>
          </Box>
          {goods?.map((good) =>
            <CartGood good={good} key={good.good._id} />)}
          <Price>{totalAmount}</Price>
          <Box sx={{ mt: '20px', textAlign: 'end' }}>
            {token ? <Button onClick={() => createOrder(goods)}>Create order</Button>
              :
              <Box sx={{ fontStyle: 'italic' }}>You need to login/register</Box>}
          </Box>
        </>
        :
        <NotFoundBanner text='Cart is empty!'/>
      }
    </>
  )
}
