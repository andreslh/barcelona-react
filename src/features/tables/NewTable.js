import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TablesService from '../../services/tables';
import { ADD_PRODUCTS } from '../../app/routes';
import { setActive } from './tablesSlice';
import TableForm from './TableForm';

const NewTable = () => {
  const [name, setName] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    TablesService.create({ name }).then((response) => {
      dispatch(setActive(response.table));
      history.push(ADD_PRODUCTS);
    });
  };

  const disabled = useMemo(() => !name, [name]);

  return (
    <Grid
      container
      justify="center"
      component={Paper}
      classes={{ root: 'flex-direction-column' }}
    >
      <Grid item mt={3}>
        <Box m={2}>
          <h3>Agregar mesa</h3>
          <Button
            color="default"
            onClick={() => {
              history.goBack();
            }}
          >
            Volver
          </Button>
        </Box>
        <TableForm
          name={name}
          onNameChange={(e) => setName(e.currentTarget.value)}
          onSubmit={handleSubmit}
          submitText={'Editar'}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default NewTable;
