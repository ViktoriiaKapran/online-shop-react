import { Box, Button, FormControl, IconButton, InputAdornment, OutlinedInput, Snackbar } from '@mui/material';
import { Visibility, VisibilityOff, Save } from '@mui/icons-material';
import React, { useState } from 'react';
import Title from '../components/Title';
import { Stack } from '@mui/system';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../store/api';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ImageUploader from '../components/ImageUploader';
import MuiAlert from '@mui/material/Alert';

function EditProfilePage() {
  const userId = useSelector(state => state?.auth?.payload?.sub?.id);
  const { data, isFetching } = useGetUserByIdQuery(userId);
  const [avatarId, setAvatarId] = useState('');
  const [nick, setNick] = useState(data?.UserFindOne?.nick || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const [updateUser] = useUpdateUserMutation();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = () => {
    const user = {
      _id: data.UserFindOne._id,
      nick,
      password: password || undefined,
      avatar: avatarId ? {
        _id: avatarId
      } : undefined
    }
    if (password !== confirmPassword) {
      setSnackbarType('error');
      setSnackbarMessage('Passwords don\'t match!');
      setOpen(true);
      return;
    }
    updateUser(user).then(response => {
      setSnackbarType('success');
      setSnackbarMessage('Saved!');
      setOpen(true);

    }).catch(e => {
      setSnackbarType('error');
      setSnackbarMessage('Ooops! Something went wrong!');
      setOpen(true);
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      {isFetching ? <Loader /> :
        <Box>
          <Title>Edit profile</Title>
          <Box sx={{ maxWidth: '250px', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: '40px', width: '100%' }}>
              <ImageUploader previousImages={[data.UserFindOne.avatar]} isAvatar={true} onChange={(images) => setAvatarId(images[0]._id)} />
            </Box>
            <Box component='form' sx={{ display: 'flex', alignItems: 'flex-start', mb: '40px', width: '100%' }}>
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <OutlinedInput
                  sx={{ width: '100%' }}
                  placeholder="Nick"
                  type="text"
                  value={nick}
                  onChange={e => setNick(e.target.value)} />
              </FormControl>
            </Box>
            <Box component='form' sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
              <Stack sx={{ width: '100%' }}>
                <FormControl variant="outlined" sx={{ mb: '20px', width: '100%' }}>
                  <OutlinedInput
                    sx={{ width: '100%' }}
                    placeholder="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    } />
                </FormControl>
                <FormControl variant="outlined" sx={{ mb: '20px', width: '100%' }}>
                  <OutlinedInput
                    sx={{ width: '100%' }}
                    placeholder="Confirm password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={password !== confirmPassword}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    } />
                </FormControl>
              </Stack>
            </Box>
            <Button onClick={() => onSubmit()} variant="contained" sx={{ width: '100%' }}>Save changes</Button>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Box>}
    </>

  )
}

export default EditProfilePage;