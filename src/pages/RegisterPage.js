import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../store/authSlice';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { useLoginMutation, useRegisterMutation } from '../store/api';

export default function RegisterPage() {
  const token = useSelector(state => state.auth.token);
  const [fullRegister, {isError}] = useRegisterMutation();
  const [fullLogin, result] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);
  const onRegister = (login, password) => {

    fullRegister({ login, password }).then(res => {
      if (res.data.UserUpsert) {
        fullLogin({ login, password }).then(response => {
          dispatch(loginAction(response.data.login));
        });
      }
      });

  }

  return (
    <>
      <Title>Registration</Title>
      <Box sx={{ maxWidth: '300px', width: '100%', m: '150px auto' }}>
        <LoginForm submit='Registration' onSubmit={onRegister} />
        {isError && <Box sx={{color: 'red', mt: '20px', textAlign: 'center'}}>This user is already exist</Box>}
      </Box>
    </>
  )
}
