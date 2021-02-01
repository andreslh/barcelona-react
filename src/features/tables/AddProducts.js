import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { selectActive, clearActive } from './tablesSlice';
import { selectProducts } from '../products/productsSlice';
import { ADD_PRODUCTS } from '../../app/routes';

export default function AddProducts() {
  const history = useHistory();
  const table = useSelector(selectActive);
  const categories = useSelector(selectProducts);
  const [addedProducts, setAddedProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      history.push('/');
    } else if (!addedProducts.length) {
      setAddedProducts(
        categories.reduce((acc, category) => {
          return [
            ...acc,
            ...category.subcategories.reduce((subcatAcc, subcategory) => {
              return [
                ...subcatAcc,
                ...subcategory.products.map((product) => ({
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
    history.push(`/tables/${table.id}`);
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
    axios
      .put(
        ADD_PRODUCTS.replace(':id', table.id),
        addedProducts
          .filter((product) => product.checked)
          .map((product) => ({
            id: product.id,
            quantity: product.quantity,
          }))
      )
      .then(() => {
        dispatch(clearActive());
        history.push(`/tables/${table.id}`);
      });
  };

  const hasProductsToAdd = addedProducts.filter((product) => product.checked)
    .length;

  const categoriesList = [];
  categories.forEach((category, catIndex) => {
    const subcategories = [];
    category.subcategories.forEach((subcategory) => {
      const productsElements = [];
      subcategory.products.forEach((product) => {
        productsElements.push(
          <TableRow data-testid="product" key={product.id}>
            <TableCell align="left">
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      data-testid={`product-checkbox-${product.id}`}
                      checked={getProductChecked(product.id)}
                      onChange={() => handleProductChecked(product.id)}
                      name={`${product.id}-${product.name}`}
                    />
                  }
                  label={product.name}
                />
              </FormGroup>
            </TableCell>
            <TableCell align="left">
              <Grid container justify="flex-start" alignItems="center">
                <TextField
                  id="outlined-basic"
                  data-testid={`product-quantity-${product.id}`}
                  variant="outlined"
                  value={getProductQuantity(product.id)}
                  type="number"
                  onChange={(e) =>
                    handleProductQuantity(
                      product.id,
                      null,
                      e.currentTarget.value
                    )
                  }
                />
                <Box>
                  <RemoveCircleOutlineIcon
                    fontSize="large"
                    data-testid={`product-reduce-quantity-${product.id}`}
                    classes={{ root: 'pointer' }}
                    onClick={() => {
                      handleProductQuantity(product.id, false);
                    }}
                  />
                  <AddCircleOutlineIcon
                    fontSize="large"
                    data-testid={`product-add-quantity-${product.id}`}
                    classes={{ root: 'pointer' }}
                    onClick={() => {
                      handleProductQuantity(product.id, true);
                    }}
                  />
                </Box>
              </Grid>
            </TableCell>
          </TableRow>
        );
      });

      subcategories.push(
        <Grid
          data-testid="subcategory"
          item
          xs={12}
          md={6}
          key={subcategory.id}
        >
          <h4>{subcategory.name}</h4>
          <Table aria-label="active tables">
            <TableHead>
              <TableRow>
                <TableCell align="left">Producto</TableCell>
                <TableCell align="left">Cantidad</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>{productsElements}</TableBody>
          </Table>
        </Grid>
      );
    });

    categoriesList.push(
      <Accordion
        data-testid="category"
        key={catIndex}
        defaultExpanded={catIndex === 0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${category.id}-content`}
          id={`panel${category.id}-header`}
        >
          <h3>{category.name}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>{subcategories}</Grid>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <TableContainer component={Paper}>
      <Grid container justify="space-between" component={Paper}>
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

      {categoriesList}

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
  );
}
