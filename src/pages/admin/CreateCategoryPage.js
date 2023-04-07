import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EditForm from '../../components/EditForm';
import Title from '../../components/Title';
import { useCreateCategoryMutation } from '../../store/api';



function CreateCategoryPage() {
const navigate = useNavigate();
  const [createCategory, resultMut] = useCreateCategoryMutation();

  const create = (category) => {
    createCategory(category).then(response => {
      navigate('/admin/categories');
    });
  }

  return (
    <Box sx={{ maxWidth: '450px', m: '20px auto', width: '100%' }} >
      <Title>Create category</Title>
      <EditForm entity='category' buttonText='Add category' onSubmit={(category) => create(category)} />
    </Box >

  )
}

export default CreateCategoryPage;