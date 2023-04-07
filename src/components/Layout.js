import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import CategoryMenu from './CategoriesMenu/CategoryMenu';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';


export default function Layout() {
  return (
    <>
      <Header />
      <Container sx={{
        display: 'flex',
        mx: 'auto',
        position: 'relative',
        width: '100%',
        p: '20px',
        flexGrow: 1,
        maxWidth: '1180px'
      }}>
        <CategoryMenu />
        <Box sx={{ margin: '0 auto', width: '100%' }}>
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </>
  )
}
