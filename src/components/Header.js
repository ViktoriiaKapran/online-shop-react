import React, { useState } from 'react';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { ShoppingCart, AccountCircle, Search } from '@mui/icons-material/';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { clearCart } from '../store/cartSlice';
import ShowUserName from './ShowUserName';
import LinkButton from './LinkButton';
import { BASE_URL, useGetUserByIdQuery } from '../store/api';
import { Avatar } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {

    top: 24,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const SearchEl = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));


export default function Header() {
  let [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goodsInCart = useSelector(state => state.cart.goodsCount);
  const onLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  }
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth?.payload?.sub?.id);
  const isAdmin = useSelector(state => state.auth?.payload?.sub?.acl.includes('admin'));
  const {data} = useGetUserByIdQuery(userId);
  
  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const searchData = (searchStr) => {
    navigate({
      pathname: '/goods',
      search: '?' + createSearchParams({ text: searchStr }),
    });
    setSearch('');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/"><img src="/images/logo.jpg" /></Link>
          <SearchEl>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{
                'value': search,
                onChange: (e) => handleChange(e),
                onKeyPress: (e) => {
                  if (e.key === 'Enter') {
                    searchData(e.target.value);
                  }
                }
              }}
            />
          </SearchEl>
          <IconButton onClick={() => searchData(search)}><Search sx={{color: 'white'}}/></IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ShowUserName />
          <Box sx={{ mx: 1, my: 2 }}>
            <Link to="cart">
              <IconButton>
                <StyledBadge badgeContent={goodsInCart} color="primary">
                  <ShoppingCart sx={{ color: 'white', fontSize: '30px' }} />
                </StyledBadge>
              </IconButton>
            </Link>
          </Box>
          {token ?
            <>
              {!isAdmin && <Link to={`/user/${userId}`}>
                {data?.UserFindOne?.avatar ? 
                <Avatar src={BASE_URL + '/' + data.UserFindOne.avatar.url}/>
                :
                <IconButton><AccountCircle sx={{ color: 'white', fontSize: '30px' }} /></IconButton>}

              </Link>}
              <LinkButton to="/" click={onLogout}>Logout</LinkButton>
            </>
            :
            <>
              <LinkButton to="login">Login</LinkButton>
              <LinkButton to="register">Registration</LinkButton>
            </>
          }
        </Box>
      </Toolbar>
    </AppBar>

  )
}
