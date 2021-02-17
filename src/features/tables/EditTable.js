import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'material-ui-snackbar-provider';

import TablesService from '../../services/tables';
import TableForm from './TableForm';
import { updateActiveName } from './tablesSlice';

export default function EditTable() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [name, setName] = useState('');

  useEffect(() => {
    TablesService.getById(id).then((response) => {
      setName(response.table.name);
    });
  }, [id]);

  const disabled = useMemo(() => !name, [name]);

  const handleSubmit = () => {
    TablesService.update({ id, name }).then(() => {
      dispatch(updateActiveName(name));
      snackbar.showMessage('Mesa actualizada');
      history.goBack();
    });
  };

  return (
    <Grid
      container
      justify="center"
      component={Paper}
      classes={{ root: 'flex-direction-column' }}
    >
      <Grid item mt={3}>
        <Box p={3}>
          <Grid container justify="space-between">
            <h3>Editar mesa: {name}</h3>
            <Button
              color="default"
              onClick={() => {
                history.goBack();
              }}
            >
              Volver
            </Button>
          </Grid>
        </Box>
        <Box m={2}>
          <TableForm
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
