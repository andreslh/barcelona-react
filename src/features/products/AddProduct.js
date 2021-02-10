import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'material-ui-snackbar-provider';

import ProductForm from './ProductForm';
import { resetProducts, selectProducts } from './productsSlice';
import { PRODUCTS } from '../../app/routes';
import ProductsService from '../../services/products';

export default function AddProduct() {
  const { subcategoryId } = useParams();
  const categories = useSelector(selectProducts);
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');

  useEffect(() => {
    if (categories.length) {
      const fiteredCategory = categories.find((category) =>
        category.Subcategories.some(
          (subcat) => subcat.id.toString() === subcategoryId
        )
      );
      setSubcategoryName(
        fiteredCategory.Subcategories.find(
          (subcat) => subcat.id.toString() === subcategoryId
        ).name
      );
    }
  }, [categories, subcategoryId]);

  const disabled = useMemo(() => !name || !price, [name, price]);

  const handleSubmit = () => {
    ProductsService.create({ subcategoryId, name, price }).then(() => {
      dispatch(resetProducts());
      snackbar.showMessage('Producto agregado');
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
            <h3>Agregar producto a {subcategoryName}</h3>
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
