import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { LOGIN } from '../../app/routes';
import UsersService from '../../services/users';
import { logout } from './usersSlice';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const handleChangePassword = () => {
    UsersService.changePassword({ currentPassword, newPassword }).then(() => {
      snackbar.showMessage('Contraseña actualizada');
      dispatch(logout());
      history.push(LOGIN);
    });
  };

  const handleReturn = () => {
    history.goBack();
  };

  const isValid = () =>
    !currentPassword.length ||
    !newPassword.length ||
    !repeatNewPassword ||
    newPassword !== repeatNewPassword;

  return (
    <Grid
      container
      justify='center'
      component={Paper}
      classes={{ root: 'flex-direction-column' }}
    >
      <Grid item mt={3}>
        <Box m={2}>
          <h3>Cambiar contraseña</h3>
        </Box>
        <Box m={2}>
          <TextField
            id='login-password'
            label='Contraseña actual'
            inputProps={{ 'data-testid': 'login-password', type: 'password' }}
            variant='outlined'
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.currentTarget.value);
            }}
          />
        </Box>
        <Box m={2}>
          <TextField
            id='login-password'
            label='Nueva contraseña'
            inputProps={{ 'data-testid': 'login-password', type: 'password' }}
            variant='outlined'
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.currentTarget.value);
            }}
          />
        </Box>
        <Box m={2}>
          <TextField
            id='login-password'
            label='Repetir nueva contraseña'
            inputProps={{ 'data-testid': 'login-password', type: 'password' }}
            variant='outlined'
            value={repeatNewPassword}
            onChange={(e) => {
              setRepeatNewPassword(e.currentTarget.value);
            }}
          />
        </Box>
        <Box m={2}>
          <Button
            data-testid='confirm-add-table'
            disabled={isValid()}
            variant='contained'
            color='primary'
            onClick={handleChangePassword}
          >
            Cambiar contraseña
          </Button>
          <Button
            data-testid='cancel-add-table'
            color='default'
            onClick={handleReturn}
          >
            Cancelar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
