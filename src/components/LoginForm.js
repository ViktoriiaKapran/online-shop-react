import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, Button, Box, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

const LoginForm = ({ submit, onSubmit }) => {
  const location = useLocation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onShowPassword = () => setShowPassword((show) => !show);
  const onShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const onMouseDown = (event) => {
    event.preventDefault();
  };

  const formSubmit = () => {
    if (location.pathname === '/login') {
      onSubmit(login, password);
    } else {
      if (login && password === confirmPassword) {
        onSubmit(login, password);
      }
    }

  }

  return (
    <Box component='form' onSubmit={formSubmit}>
      <Stack>
        <FormControl variant="outlined" sx={{ mb: '20px' }}>
          <OutlinedInput
            placeholder="login"
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)} />
        </FormControl>
        <FormControl variant="outlined" sx={{ mb: '20px' }}>
          <OutlinedInput
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={onShowPassword}
                  onMouseDown={onMouseDown}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            } />
        </FormControl>
        {location.pathname === '/register' &&
          <FormControl variant="outlined" sx={{ mb: '20px' }}>
            <OutlinedInput
              placeholder="Confirm password"
              type={showConfirmPassword ? 'text' : 'password'}
              error={password !== confirmPassword}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onShowConfirmPassword}
                    onMouseDown={onMouseDown}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              } />
          </FormControl>}
        <Button variant="contained" onClick={formSubmit}>{submit}</Button>
      </Stack>
    </Box>

  )
}

export default LoginForm;