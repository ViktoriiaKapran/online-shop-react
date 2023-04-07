import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import './GoodCard.scss'
import { Image } from '../Image/Image';
import Price from '../Price';
import Counter from '../Counter/Counter.js';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addGoodToCart } from '../../store/cartSlice';



export default function GoodCard({ good }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  return (
    <Card sx={{ width: 275 }}>
      <CardContent className='good-card'>
        <Link to={`/good/${good?._id}`} className='good-name'>{good?.name}</Link>
        {good?.images?.length && <Link to={`/good/${good?._id}`}>
          <Box sx={{ width: '200px', height: '200px', m: '0 auto' }}>
            <Image url={`${good?.images[0]?.url}`} />
          </Box>
        </Link>}
        <Price>{good?.price}</Price>
        <Counter value={count} onCount={(countValue) => setCount(countValue)} />
        <CardActions>
          <Button variant="contained" onClick={() => { dispatch(addGoodToCart({ good, count: +count })) }}>Add to cart</Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}