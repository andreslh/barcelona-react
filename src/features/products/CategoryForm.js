import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormControlLabel, FormGroup } from '@material-ui/core';

export default function CategoryForm({
  name,
  onNameChange,
  isSubcategory,
  allowHalf,
  onAllowHalfChange,
  onSubmit,
  submitText,
  disabled,
}) {
  return (
    <Grid item mt={3}>
      <Box m={2}>
        <TextField
          id='category-name'
          data-testid='category-name'
          label='Nombre de identificación'
          inputProps={{ 'data-testid': 'category-name' }}
          variant='outlined'
          value={name}
          onChange={onNameChange}
        />
        {isSubcategory && (
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={allowHalf} onChange={onAllowHalfChange} />} label="Permitir mitad" />
          </FormGroup>
        )}
      </Box>
      <Box m={2}>
        <Button
          data-testid='submit-category-btn'
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
