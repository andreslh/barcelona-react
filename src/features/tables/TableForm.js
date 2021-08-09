import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

export default function TableForm({
  name,
  onNameChange,
  onSubmit,
  submitText,
  disabled,
  waiters,
  selectedWaiter,
  handleWaiterChange,
}) {
  const waitersList = [];
  waiters?.map((waiter) => {
    return waitersList.push(
      <option key={waiter.id} value={waiter.id}>
        {waiter.name}
      </option>
    );
  });

  return (
    <>
      <Grid container mt={3} justify={'flex-start'}>
        <Box m={2}>
          <TextField
            id="table-name"
            label="Nombre"
            inputProps={{ 'data-testid': 'table-name' }}
            variant="outlined"
            value={name}
            onChange={onNameChange}
          />
        </Box>
        {waiters && (
          <Box m={2}>
            <FormControl variant="filled">
              <InputLabel htmlFor="waiters-list">Mozo</InputLabel>
              <Select
                native
                value={selectedWaiter || ''}
                onChange={handleWaiterChange}
                inputProps={{
                  name: 'waiters-list',
                  id: 'waiters-list',
                  'data-testid': 'waiters-list',
                }}
              >
                <option aria-label="None" value="" />
                {waitersList}
              </Select>
            </FormControl>
          </Box>
        )}
      </Grid>
      <Box m={2}>
        <Button
          data-testid="submit-table-btn"
          disabled={disabled}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      </Box>
    </>
  );
}
