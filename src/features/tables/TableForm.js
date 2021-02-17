import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function TableForm({
  name,
  onNameChange,
  onSubmit,
  submitText,
  disabled,
}) {
  return (
    <Grid item mt={3}>
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
    </Grid>
  );
}
