import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'material-ui-snackbar-provider';

import ProductForm from './ProductForm';
import { resetProducts } from './productsSlice';
import { PRODUCTS } from '../../app/routes';
import ProductsService from '../../services/products';

export default function EditProduct() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');

  useEffect(() => {
    ProductsService.getById(id).then((response) => {
      setName(response.product.name);
      setPrice(response.product.price);
      setSubcategoryId(response.product.subcategoryId);
    });
  }, [id]);

  const disabled = useMemo(() => !name || !price, [name, price]);

  const handleSubmit = () => {
    ProductsService.update({ id, subcategoryId, name, price }).then(() => {
      dispatch(resetProducts());
      snackbar.showMessage('Producto actualizado');
      history.push(PRODUCTS);
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
            <h3>Editar producto: {name}</h3>
            <Button
              color="default"
              onClick={() => {
                history.push(PRODUCTS);
              }}
            >
              Volver
            </Button>
          </Grid>
        </Box>
        <Box m={2}>
          <ProductForm
            name={name}
            price={price}
            onNameChange={(e) => setName(e.currentTarget.value)}
            onPriceChange={(e) => setPrice(e.currentTarget.value)}
            onSubmit={handleSubmit}
            submitText={'Agregar'}
            disabled={disabled}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
