import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { PRODUCTS, WAITERS } from '../../app/routes';
import WaitersService from '../../services/waiters';
import WaiterForm from './WaiterForm';
import { selectWaiters, setWaiters } from './waitersSlice';

export default function NewWaiter() {
  const waiters = useSelector(selectWaiters);
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const [name, setName] = useState('');

  useEffect(() => {
    if (!waiters.length) {
      WaitersService.get().then((response) => {
        dispatch(setWaiters(response.waiters));
      });
    }
  }, [dispatch, waiters.length]);

  const disabled = useMemo(() => !name, [name]);

  const handleSubmit = () => {
    WaitersService.create({ name }).then(() => {
      snackbar.showMessage('Mozo agregado');
      history.push(WAITERS);
    });
  };

  return (
    <Grid
      container
      justify='center'
      component={Paper}
      classes={{ root: 'flex-direction-column' }}
    >
      <Grid item mt={3}>
        <Box p={3}>
          <Grid container justify='space-between'>
            <h3>Agregar mozo</h3>
            <Button
              color='default'
              onClick={() => {
                history.push(PRODUCTS);
              }}
            >
              Volver
            </Button>
          </Grid>
        </Box>
        <Box m={2}>
          <WaiterForm
            name={name}
            onNameChange={(e) => setName(e.currentTarget.value)}
            onSubmit={handleSubmit}
            submitText={'Agregar'}
            disabled={disabled}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
