import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { selectActive, clearActive } from '../tablesSlice';
import { selectProducts } from '../../products/productsSlice';
import TablesService from '../../../services/tables';
import { ACTIVE_TABLE, HOME } from '../../../app/routes';
import AddProductsContext from './AddProductsContext';
import { Categories } from './Categories';

export default function AddProducts() {
  const history = useHistory();
  const table = useSelector(selectActive);
  const categories = useSelector(selectProducts);
  const [addedProducts, setAddedProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      history.push(HOME);
    } else if (!addedProducts.length) {
      setAddedProducts(
        categories.reduce((acc, category) => {
          return [
            ...acc,
            ...category.Subcategories.reduce((subcatAcc, subcategory) => {
              return [
                ...subcatAcc,
                ...subcategory.Products.map((product) => ({
                  id: product.id,
                  checked: false,
                  quantity: 1,
                })),
              ];
            }, []),
          ];
        }, [])
      );
    }
  }, [addedProducts, history, categories]);

  const handleCancel = () => {
    history.push(ACTIVE_TABLE.replace(':active', table.id));
  };

  const handleProductChecked = (id) => {
    const newAddedProducts = [...addedProducts];
    const productIndex = newAddedProducts.findIndex(
      (product) => product.id === id
    );
    newAddedProducts[productIndex].checked = !newAddedProducts[productIndex]
      .checked;

    setAddedProducts([...newAddedProducts]);
  };

  const handleProductQuantity = (id, action, quantity) => {
    const newAddedProducts = [...addedProducts];
    const productIndex = newAddedProducts.findIndex(
      (product) => product.id === id
    );
    let newQuantity = newAddedProducts[productIndex].quantity;
    if (action !== null) {
      const currentQuantity = newAddedProducts[productIndex].quantity;
      newQuantity = action ? currentQuantity + 1 : currentQuantity - 1;
    } else {
      newQuantity = quantity;
    }

    newAddedProducts[productIndex].quantity = newQuantity > 0 ? newQuantity : 1;
    setAddedProducts([...newAddedProducts]);
  };

  const getProductChecked = (id) =>
    addedProducts.length &&
    addedProducts[addedProducts.findIndex((product) => product.id === id)]
      .checked
      ? true
      : false;

  const getProductQuantity = (id) =>
    addedProducts.length
      ? addedProducts[addedProducts.findIndex((product) => product.id === id)]
          .quantity
      : 1;

  const handleAddProducts = () => {
    TablesService.addProducts({
      id: table.id,
      products: addedProducts
        .filter((product) => product.checked)
        .map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
    }).then(() => {
      dispatch(clearActive());
      history.push(ACTIVE_TABLE.replace(':active', table.id));
    });
  };

  const hasProductsToAdd = addedProducts.filter((product) => product.checked)
    .length;

  const context = {
    categories,
    getProductChecked,
    handleProductChecked,
    getProductQuantity,
    handleProductQuantity,
  };

  return (
    <AddProductsContext.Provider value={context}>
      <TableContainer component={Paper}>
        <Grid container justify='space-between' component={Paper}>
          <Grid item xs={6}>
            <Box pl={3}>
              <h4>
                Agregar productos a mesa: {table.id} - {table.name}
              </h4>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            classes={{ root: 'flex-direction-row justify-content-end' }}
          >
            <Box pr={3} m={2}>
              <Button color='default' onClick={handleCancel}>
                Cancelar
              </Button>
            </Box>
            <Box pr={3} m={2}>
              <Button
                disabled={!hasProductsToAdd}
                ml={2}
                variant='contained'
                color='primary'
                onClick={handleAddProducts}
              >
                Agregar productos
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Categories />

        <Grid container justify='space-between' component={Paper}>
          <Box pr={3} m={2}>
            <Button
              disabled={!hasProductsToAdd}
              data-testid='add-products-button'
              variant='contained'
              color='primary'
              onClick={handleAddProducts}
            >
              Agregar productos
            </Button>
          </Box>
        </Grid>
      </TableContainer>
    </AddProductsContext.Provider>
  );
}
