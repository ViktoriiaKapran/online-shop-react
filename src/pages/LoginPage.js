import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { useLoginMutation } from '../store/api';
import { loginAction, resetError } from '../store/authSlice';
const LoginPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const error = useSelector(state => state.auth.error);
  const [fullLogin, result] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetError());
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const onLogin = (login, password) => {
    fullLogin({ login, password }).then(response => {
      dispatch(loginAction(response.data.login));
    });
  }

  return (
    <>
      <Title>Login</Title>
      <Box sx={{ maxWidth: '300px', width: '100%', m: '150px auto' }}>
        <LoginForm submit='Login' onSubmit={onLogin} />
        {error && <Alert sx={{ mt: '20px' }} severity="error">You entered wrong login or password!</Alert>}
      </Box>
    </>
  )
}
export default LoginPage;