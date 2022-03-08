import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import { TABLES } from '../../app/routes';
import UsersService from '../../services/users';
import { login } from './usersSlice';

const Login = () => {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = () => {
    UsersService.login({ email, password }).then((response) => {
      dispatch(login(response));
      history.push(TABLES);
    })
    .catch(e => console.log(e));
  };

  const handleReturn = () => {
    history.goBack();
  };

  return (
    <Grid
      container
      justify='center'
      component={Paper}
      classes={{ root: 'flex-direction-column' }}
    >
      <Grid item mt={3}>
        <Box m={2}>
          <h3>Iniciar sesión</h3>
        </Box>
        <Box m={2}>
          <TextField
            id='login-email'
            label='Email'
            name='email'
            inputProps={{ 'data-testid': 'login-email', type: 'email' }}
            variant='outlined'
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </Box>
        <Box m={2}>
          <TextField
            id='login-password'
            label='Contraseña'
            name='password'
            inputProps={{ 'data-testid': 'login-password', type: 'password' }}
            variant='outlined'
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </Box>
        <Box m={2}>
          <Button
            name='login'
            data-testid='confirm-add-table'
            disabled={!email.length || !password.length}
            variant='contained'
            color='primary'
            onClick={handleLogin}
          >
            Iniciar sesión
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

export default Login;
