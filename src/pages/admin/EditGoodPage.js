import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { useGetGoodByIdQuery, useCreateGoodMutation } from '../../store/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import EditForm from '../../components/EditForm';

function EditGoodPage() {
  const { goodId } = useParams();
  const { data, isFetching } = useGetGoodByIdQuery(goodId);
  const navigate = useNavigate();
  const [editGood, result] = useCreateGoodMutation();

  const edit = (good => {
    editGood(good).then(response => {
      navigate('/admin/goods');
    });
  });
  return (
    <>
      {isFetching ? <Loader /> :
        <Box sx={{ maxWidth: '450px', m: '20px auto', width: '100%' }} >
          <Title>Create good</Title>
          <EditForm
            entity='good'
            buttonText='Edit'
            id={goodId}
            name={data?.GoodFindOne?.name}
            categories={data?.GoodFindOne?.categories}
            price={data?.GoodFindOne?.price}
            description={data?.GoodFindOne?.description}
            goodImages={data?.GoodFindOne?.images}
            onSubmit={(good) => edit(good)}
          />
        </Box>
      }
    </>
  )
}

export default EditGoodPage;