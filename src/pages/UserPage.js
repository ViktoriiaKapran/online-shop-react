import { Box, Pagination } from '@mui/material';
import React, { useState } from 'react'
import { useGetOrderCountQuery, useGetOrdersQuery } from '../store/api';
import Loader from '../components/Loader';
import Title from '../components/Title';
import OrderCard from '../components/OrderCard';
import { useParams } from 'react-router-dom';
import LinkButton from '../components/LinkButton';
import NotFoundBanner from '../components/NotFoundBanner';

export default function UserPage() {
  const { userId } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data: orderCount, isFetching: fetchingCount } = useGetOrderCountQuery();
  const { data, error, isFetching } = useGetOrdersQuery({ skip: (page - 1) * limit, limit, sort: { _id: -1 } });
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <LinkButton to={`/user/${userId}/edit`}>Edit profile</LinkButton>
      <Title>My orders</Title>
      {isFetching ? <Loader /> :
        <Box>
          {orderCount?.OrderCount > 0 ?
            <>
              {data?.OrderFind?.map(order => <OrderCard key={order._id} order={order} />)}
              <Pagination count={Math.ceil(orderCount?.OrderCount / limit) || 0} page={page} onChange={handleChange} />
            </> :
            <NotFoundBanner text='You don`t have orders!' />
          }

        </Box>}
    </>
  )
}
