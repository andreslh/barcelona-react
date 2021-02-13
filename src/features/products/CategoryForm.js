import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function CategoryForm({
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
          id='category-name'
          label='Nombre de identificación'
          inputProps={{ 'data-testid': 'category-name' }}
          variant='outlined'
          value={name}
          onChange={onNameChange}
        />
      </Box>
      <Box m={2}>
        <Button
          data-testid='confirm-add-category'
          disabled={disabled}
          variant='contained'
          color='primary'
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      </Box>
    </Grid>
  );
}
