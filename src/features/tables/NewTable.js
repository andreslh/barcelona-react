import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import TablesService from '../../services/tables';
import { ACTIVE_TABLE } from '../../app/routes';

const NewTable = () => {
  const [name, setName] = useState('');
  const history = useHistory();

  const handleConfirm = () => {
    TablesService.create({ name }).then((response) => {
      history.push(ACTIVE_TABLE.replace(':active', response.table.id));
    });
  };

  const handleReturn = () => {
    history.goBack();
  };

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
        </Box>
        <Box m={2}>
          <TextField
            id="outlined-basic"
            label="Nombre de identificación"
            inputProps={{ 'data-testid': 'add-table-name' }}
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
        </Box>
        <Box m={2}>
          <Button
            data-testid="confirm-add-table"
            disabled={!name.length}
            variant="contained"
            color="primary"
            onClick={handleConfirm}
          >
            Agregar
          </Button>
          <Button
            data-testid="cancel-add-table"
            color="default"
            onClick={handleReturn}
          >
            Cancelar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NewTable;
