import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { resetProducts } from './productsSlice';
import { PRODUCTS } from '../../app/routes';
import ProductsService from '../../services/products';

export default function EditProducts() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [products, setProducts] = useState([]);
  const [disabled, setIsDisabled] = useState(false);

  useEffect(() => {
    ProductsService.getList().then((response) => {
      setProducts(response);
    });
  }, [id]);

  const handleNameChange = (e,  catIndex, subCatIndex, productIndex) => {
    if (e.currentTarget.value) {
      const newProducts = { ...products };
      newProducts.categories[catIndex].Subcategories[subCatIndex].Products[productIndex].name = e.currentTarget.value;
      setProducts(newProducts);
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  const handlePriceChange = (e, catIndex, subCatIndex, productIndex) => {
    if (e.currentTarget.value) {
      const newProducts = { ...products };
      newProducts.categories[catIndex].Subcategories[subCatIndex].Products[productIndex].price = e.currentTarget.value;
      setProducts(newProducts);
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  const handleSubmit = () => {
    ProductsService.updateAll(products).then(() => {
      dispatch(resetProducts());
      snackbar.showMessage('Productos actualizados');
      history.push(PRODUCTS);
    });
  };

  const prodElements = [];
  products.categories && products.categories.forEach((category, catIndex) => {
    prodElements.push(<Box><h3 key={`cat-${category.id}`}>{category.name}</h3></Box>);
    category.Subcategories && category.Subcategories.forEach((subcategory, subCatIndex) => {
      prodElements.push(<Box><h4 key={`subcat-${subcategory.id}`}>{subcategory.name}</h4></Box>);
      subcategory.Products.forEach((product, productIndex) => {
          prodElements.push(<Box key={`product-${product.id}`} m={2}>
            <TextField
              id='product-price'
              label='Nombre'
              inputProps={{ 'data-testid': 'product-price' }}
              variant='outlined'
              value={product.name}
              onChange={(e) => handleNameChange(e, catIndex, subCatIndex, productIndex)}
            />
            <TextField
              id='product-price'
              label='Precio'
              inputProps={{ 'data-testid': 'product-price' }}
              variant='outlined'
              value={product.price}
              type='number'
              onChange={(e) => handlePriceChange(e, catIndex, subCatIndex, productIndex)}
            />
          </Box>)
      })
    })
  });

  return (
    <Grid
      container
      justify='center'
      component={Paper}
      classes={{ root: 'flex-direction-column' }}
    >
      <Grid item mt={3}>
        <Box p={3}>
          <Grid container justify='space-between'>
            <h3>Editar productos</h3>
            <Button
              variant='contained'
              onClick={() => {
                history.push(PRODUCTS);
              }}
            >
              Volver
            </Button>
          </Grid>
        </Box>

        <Box p={3}>
          <Grid>
            { prodElements }
          </Grid>
        </Box>

        <Box m={2}>
          <Button
            data-testid='confirm-add-product'
            disabled={disabled}
            variant='contained'
            color='primary'
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
