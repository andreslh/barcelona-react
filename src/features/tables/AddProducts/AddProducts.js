import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { selectActive, clearActive } from '../tablesSlice';
import { selectProducts } from '../../products/productsSlice';
import TablesService from '../../../services/tables';
import { ACTIVE_TABLE, HOME } from '../../../app/routes';
import AddProductsContext from './AddProductsContext';
import { Categories } from './Categories';
import {
  convertToProductsList,
  getProductChecked,
  getProductQuantity,
  updateProductChecked,
  updateProductQuantity,
} from './utils';

export default function AddProducts() {
  const history = useHistory();
  const table = useSelector(selectActive);
  const categories = useSelector(selectProducts);
  const [addedProducts, setAddedProducts] = useState([]);
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  useEffect(() => {
    if (!categories.length) {
      history.push(HOME);
    } else if (!addedProducts.length) {
      setAddedProducts(convertToProductsList(categories));
    }
  }, [addedProducts, history, categories]);

  const handleCancel = () => {
    history.push(ACTIVE_TABLE.replace(':active', table.id));
  };

  const handleProductChecked = (id) =>
    setAddedProducts(updateProductChecked(id, addedProducts));

  const handleProductQuantity = (id, action, quantity) => {
    setAddedProducts(
      updateProductQuantity(id, action, quantity, addedProducts)
    );
  };

  const handleAddProducts = () => {
    const products = addedProducts
      .filter((product) => product.checked)
      .map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));
    TablesService.addProducts({
      id: table.id,
      products,
    }).then(() => {
      snackbar.showMessage(
        products.length > 1 ? 'Productos agregados' : 'Producto agregado'
      );
      dispatch(clearActive());
      history.push(ACTIVE_TABLE.replace(':active', table.id));
    });
  };

  const hasProductsToAdd = addedProducts.filter((product) => product.checked)
    .length;

  const context = {
    categories,
    getProductChecked: (id) => getProductChecked(id, addedProducts),
    handleProductChecked,
    getProductQuantity: (id) => getProductQuantity(id, addedProducts),
    handleProductQuantity,
  };

  return (
    <AddProductsContext.Provider value={context}>
      <TableContainer classes={{ root: 'add-products' }}>
        <Grid
          container
          justify="space-between"
          classes={{ root: 'table-header' }}
        >
          <Grid item xs={6}>
            <Box pl={3}>
              <h4>Agregar productos a mesa: {table.name}</h4>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            classes={{ root: 'flex-direction-row justify-content-end' }}
          >
            <Box pr={3} m={2}>
              <Button color="default" onClick={handleCancel}>
                Cancelar
              </Button>
            </Box>
            <Box pr={3} m={2}>
              <Button
                disabled={!hasProductsToAdd}
                ml={2}
                variant="contained"
                color="primary"
                onClick={handleAddProducts}
              >
                Agregar productos
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Categories />

        <Grid container justify="space-between" component={Paper}>
          <Box pr={3} m={2}>
            <Button
              disabled={!hasProductsToAdd}
              data-testid="add-products-button"
              variant="contained"
              color="primary"
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
