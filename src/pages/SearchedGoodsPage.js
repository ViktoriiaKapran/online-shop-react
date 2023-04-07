import { Box } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import GoodCard from '../components/GoodCard/GoodCard';
import Loader from '../components/Loader';
import Title from '../components/Title';
import { useGetGoodsQuery } from '../store/api';
import './CategoryPage/Category.scss';

function SearchedGoodsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchItem = searchParams.get('text') || '';
  const {data, isFetching} = useGetGoodsQuery({searchStr: searchItem});

  return (
    <>
    {isFetching ? <Loader /> : 
    <>
    <Title>Searched Goods</Title>
    <Box className='goods-container'>
      {data?.GoodFind?.map(good => <GoodCard key={good._id} good={good} />)}
    </Box>
    </>}
    </>
  )
}

export default SearchedGoodsPage;