import React from 'react';
import './CategoryMenu.scss'
import Skeleton from '@mui/material/Skeleton';
import { useGetRootCategoriesQuery } from '../../store/api';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function LiItem({ url, text }) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={url}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

const CategoryMenu = () => {
  const { data, error, isFetching } = useGetRootCategoriesQuery();
  const isAdmin = useSelector(state => state.auth?.payload?.sub?.acl?.includes('admin'));
  const adminMenu = ['Categories', 'Goods', 'Orders', 'Users'];

  return (
    <aside className='aside'>
      {isAdmin ?
        <List>
          {adminMenu.map((category, index) =>
            <LiItem key={index} url={`/admin/${category.toLowerCase()}`} text={category} />)}
        </List>
        :
        (isFetching ? Array(10).fill(1).map((_, index) => <Skeleton key={index} className='skeleton' />) :
          <List>
            {data.CategoryFind.map(category =>
              <LiItem key={category._id} url={`/${category.name}/${category._id}`} text={category.name} />)}
          </List>)}

    </aside>
  )
}

export default CategoryMenu;