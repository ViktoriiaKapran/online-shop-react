import { Box } from '@mui/material';
import React from 'react';
import EditForm from '../../components/EditForm';
import { useNavigate } from 'react-router-dom';
import {  useCreateGoodMutation } from '../../store/api';
import Title from '../../components/Title';

const CreateGoodPage = () => {
  const navigate = useNavigate();
  const [createGood, result] = useCreateGoodMutation();

  const create = (good => {
    createGood(good).then(response => {
      navigate('/admin/goods');
    });
  });

  return (
    <Box sx={{ maxWidth: '450px', m: '20px auto', width: '100%' }} >
      <Title>Create good</Title>
      <EditForm entity='good' buttonText='Add' onSubmit={(good) => create(good)}/>
    </Box >
  )
}

export default CreateGoodPage;