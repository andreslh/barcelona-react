import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'material-ui-snackbar-provider';

import TablesService from '../../services/tables';
import { ADD_PRODUCTS } from '../../app/routes';
import { setActive } from './tablesSlice';
import { selectWaiters, setWaiters } from '../waiters/waitersSlice';
import TableForm from './TableForm';
import WaitersService from '../../services/waiters';

const NewTable = () => {
  const [name, setName] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const waiters = useSelector(selectWaiters);
  const [waiterId, setWaiterId] = useState(null);

  useEffect(() => {
    if (!waiters.length) {
      WaitersService.get().then((response) => {
        dispatch(setWaiters(response.waiters));
      });
    }
  }, [dispatch, waiters.length]);

  const handleSubmit = () => {
    TablesService.create({ name, waiterId }).then((response) => {
      dispatch(setActive({ ...response.table, Tableproducts: [] }));
      snackbar.showMessage('Mesa agregada');
      history.push(ADD_PRODUCTS);
    });
  };

  const handleWaiterChange = (e) => setWaiterId(e.currentTarget.value);

  const disabled = useMemo(() => !name || !waiterId, [name, waiterId]);

  return (
    <Grid
      container
      justify='center'
      component={Paper}
      classes={{ root: 'flex-direction-column' }}
    >
      <Grid container justify='space-between' alignItems={'center'}>
        <Box m={2}>
          <h3>Agregar mesa</h3>
        </Box>
        <Box m={2}>
          <Button
            data-testid='cancel-add-table'
            color='default'
            onClick={() => {
              history.goBack();
            }}
          >
            Volver
          </Button>
        </Box>
      </Grid>
      <TableForm
        name={name}
        waiters={waiters}
        onNameChange={(e) => setName(e.currentTarget.value)}
        onSubmit={handleSubmit}
        submitText={'Agregar'}
        disabled={disabled}
        selectedWaiter={waiterId}
        handleWaiterChange={handleWaiterChange}
      />
    </Grid>
  );
};

export default NewTable;
