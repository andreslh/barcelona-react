import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { WAITERS } from '../../app/routes';
import WaitersService from '../../services/waiters';
import getInt from '../../utils/getInt';
import WaiterForm from './WaiterForm';
import { selectWaiters, setWaiters } from './waitersSlice';
import { getWaiter } from './utils/getWaiter';

export default function NewWaiter() {
  const { id } = useParams();
  const waiters = useSelector(selectWaiters);
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const [name, setName] = useState(getWaiter(waiters, getInt(id)).name);

  useEffect(() => {
    if (!waiters.length) {
      WaitersService.get().then((response) => {
        dispatch(setWaiters(response.waiters));
      });
    }
  }, [dispatch, waiters.length]);

  const disabled = useMemo(() => !name, [name]);

  const handleSubmit = () => {
    WaitersService.update({ id, name }).then(() => {
      snackbar.showMessage('Mozo actualizado');
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
            <h3>Editar mozo</h3>
            <Button
              color='default'
              onClick={() => {
                history.goBack();
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
            submitText={'Editar'}
            disabled={disabled}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
