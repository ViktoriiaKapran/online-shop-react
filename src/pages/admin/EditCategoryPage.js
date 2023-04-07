import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryByIdQuery, useCreateCategoryMutation } from '../../store/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import Title from '../../components/Title';
import EditForm from '../../components/EditForm';

function EditCategoryPage() {
  const { categoryId } = useParams();
  const { data, isFetching } = useGetCategoryByIdQuery(categoryId);
  const navigate = useNavigate();
  const [editCategory, resultMut] = useCreateCategoryMutation();

  const edit = (category) => {
    editCategory(category).then(response => {
      navigate('/admin/categories');
    });
  }

  return (
    <>
      {isFetching ? <Loader /> :
        <Box sx={{ maxWidth: '450px', m: '20px auto', width: '100%' }}>
          <Title>Edit category</Title>
          <EditForm
            entity='category'
            buttonText='Update'
            id={categoryId}
            name={data?.CategoryFindOne?.name}
            categories={data?.CategoryFindOne?.subCategories}
            onSubmit={(category) => edit(category)}
          />
        </Box>
      }
    </>
  )
}

export default EditCategoryPage;