import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { USERS } from '../../app/routes';
import UsersService from '../../services/users';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { id, email } = useParams();
  const history = useHistory();
  const snackbar = useSnackbar();

  const handleChangePassword = () => {
    UsersService.resetPassword({ id, newPassword }).then(() => {
      snackbar.showMessage('Contraseña reseteada');
      history.push(USERS);
    });
  };

  const handleReturn = () => {
    history.goBack();
  };

  const isValid = () => !newPassword.length;

  return (
    <Grid
      container
      justify='center'
      component={Paper}
      classes={{ root: 'flex-direction-column' }}
    >
      <Grid item mt={3}>
        <Box m={2}>
          <h3>Resetear contraseña de: {email}</h3>
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

export default ResetPassword;
