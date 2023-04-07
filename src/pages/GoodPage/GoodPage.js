
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CategoriesSection } from '../../components/CategoriesSection/CategoriesSection';
import Loader from '../../components/Loader';
import Title from '../../components/Title';
import { useGetGoodByIdQuery } from '../../store/api';
import { Box } from '@mui/system';
import Carousel from 'react-material-ui-carousel';
import { Image } from '../../components/Image/Image';
import Price from '../../components/Price';
import Counter from '../../components/Counter/Counter';
import { Button } from '@mui/material';
import './Good.scss';
import { addGoodToCart, deleteGoodFromCart } from '../../store/cartSlice';

const GoodPage = () => {
  const { goodId } = useParams();
  const [count, setCount] = useState(1);
  const { data, error, isFetching } = useGetGoodByIdQuery(goodId);
  const dispatch = useDispatch();
  const add = () => {
    dispatch(addGoodToCart({ good: data.GoodFindOne, count: +count }));
  }
  const deleteG = () => {
    dispatch(deleteGoodFromCart({ good: data.GoodFindOne }));
  }
  return (
    <>
      {isFetching ? <Loader /> :
        <>
          <Title>{data.GoodFindOne?.name}</Title>
          {data.GoodFindOne?.categories?.length > 0 && <CategoriesSection key={data.GoodFindOne?.categories?._id} categories={data.GoodFindOne?.categories} categoryEl='Category:' />}
          <Box sx={{ display: 'flex', my: '20px', width: '100%' }}>
            <Box sx={{ width: '50%', pr: '30px' }}>
              <Carousel height="300px">
                {
                  data.GoodFindOne?.images.map((image, i) => <Image key={i} url={image?.url} />)
                }
              </Carousel>
            </Box>
            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box className='info-about-good'>
                {data.GoodFindOne?.description}
              </Box>
              <Box className='info-about-good'>
                <Price>{data.GoodFindOne?.price}</Price>
              </Box>
              <Box className='info-about-good'>
                <Counter value={1} onCount={(countValue) => setCount(countValue)} />
              </Box>
              <Box className='info-about-good'>
                <Button variant="contained" onClick={() => add()}>Add to cart</Button>
              </Box>
              <Box className='info-about-good'>
                <Button variant="contained" onClick={() => deleteG()}>Delete from cart</Button>
              </Box>


            </Box>
          </Box>
        </>}
    </>
  )
}
export default GoodPage;