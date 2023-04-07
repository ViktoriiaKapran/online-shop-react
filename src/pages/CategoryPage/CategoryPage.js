import React from 'react'
import { useParams } from 'react-router-dom';
import Title from '../../components/Title';
import { CategoriesSection } from '../../components/CategoriesSection/CategoriesSection';
import GoodCard from '../../components/GoodCard/GoodCard';
import './Category.scss';
import Loader from '../../components/Loader';
import { Box } from "@mui/material";
import { useGetCategoryByIdQuery } from '../../store/api';
import NotFoundBanner from '../../components/NotFoundBanner';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { data, error, isFetching } = useGetCategoryByIdQuery(categoryId);
  return (
    <>
      {isFetching ? <Loader /> :
        <>
          <Title>{data.CategoryFindOne?.name}</Title>
          {data.CategoryFindOne?.subCategories?.length > 0 && <CategoriesSection key={data.CategoryFindOne?._id} categories={data.CategoryFindOne?.subCategories} categoryLabel='Subcategories:' />}
          {data.CategoryFindOne?.parent && <CategoriesSection categories={[data.CategoryFindOne?.parent]} categoryLabel='Parent category:' />}
          {data?.CategoryFindOne?.goods?.length ?
            <Box className='goods-container'>
              {data.CategoryFindOne?.goods?.map(good => <GoodCard key={good._id} good={good} />)}
            </Box>
            :
            <NotFoundBanner text='No goods found!' />
          }

        </>}

    </>
  )
}
export default CategoryPage;