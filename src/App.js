import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/HomePage';
import NotFound from './pages/NotFound';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import GoodPage from './pages/GoodPage/GoodPage';
import Layout from './components/Layout';
import store from './store';
import { Box } from '@mui/material';
import RequireAuth from './components/hoc/RequireAuth';
import RequireAdmin from './components/hoc/RequireAdmin';
import UsersPage from './pages/admin/UsersPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import CreateCategoryPage from './pages/admin/CreateCategoryPage';
import EditCategoryPage from './pages/admin/EditCategoryPage';
import GoodsPage from './pages/admin/GoodsPage';
import OrdersPage from './pages/admin/OrdersPage';
import CreateGoodPage from './pages/admin/CreateGoodPage';
import EditGoodPage from './pages/admin/EditGoodPage';
import EditProfilePage from './pages/EditProfilePage';
import SearchedGoodsPage from './pages/SearchedGoodsPage';


function App() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path='/user/:userId' element={
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            } />
            <Route path='/user/:userId/edit' element={
              <RequireAuth>
                <EditProfilePage />
              </RequireAuth>
            } />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/admin/users' element={
              <RequireAdmin>
                <UsersPage />
              </RequireAdmin>
            } />
            <Route path='/admin/orders' element={
              <RequireAdmin>
                <OrdersPage />
              </RequireAdmin>
            } />
            <Route path='/admin/categories' element={
              <RequireAdmin>
                <CategoriesPage />
              </RequireAdmin>
            } />
            <Route path='/admin/category' element={
              <RequireAdmin>
                <CreateCategoryPage />
              </RequireAdmin>
            } />
            <Route path='/admin/category/:categoryId' element={
              <RequireAdmin>
                <EditCategoryPage />
              </RequireAdmin>
            } />
            <Route path='/admin/goods' element={
              <RequireAdmin>
                <GoodsPage />
              </RequireAdmin>
            } />
            <Route path='/admin/good' element={
              <RequireAdmin>
                <CreateGoodPage />
              </RequireAdmin>
            } />
            <Route path='/admin/good/:goodId' element={
              <RequireAdmin>
                <EditGoodPage />
              </RequireAdmin>
            } />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/:category/:categoryId' element={<CategoryPage />} />
            <Route path='/good/:goodId' element={<GoodPage />} />
            <Route path='/goods' element={<SearchedGoodsPage />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Provider>
    </Box>
  );
}

export default App;
