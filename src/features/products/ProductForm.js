import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function ProductForm({
  name,
  price,
  onNameChange,
  onPriceChange,
  onSubmit,
  submitText,
  disabled,
}) {
  return (
    <Grid item mt={3}>
      <Box m={2}>
        <TextField
          id="product-name"
          label="Nombre de identificación"
          inputProps={{ 'data-testid': 'product-name' }}
          variant="outlined"
          value={name}
          onChange={onNameChange}
        />
      </Box>
      <Box m={2}>
        <TextField
          id="product-price"
          label="Precio"
          inputProps={{ 'data-testid': 'product-price' }}
          variant="outlined"
          value={price}
          type="number"
          onChange={onPriceChange}
        />
      </Box>
      <Box m={2}>
        <Button
          data-testid="confirm-add-table"
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
