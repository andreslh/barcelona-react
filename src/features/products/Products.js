import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { selectProducts, setProducts } from './productsSlice';
import ProductsService from '../../services/products';
import { useHistory } from 'react-router-dom';
import {
  ADD_PRODUCT,
  ADD_SUBCATEGORY,
  EDIT_PRODUCT,
  EDIT_SUBCATEGORY,
} from '../../app/routes';
import Modal from '../../components/Modal';
import SubcategoriesService from '../../services/subcategories';

export default function Products() {
  const categories = useSelector(selectProducts);
  const dispatch = useDispatch();
  const history = useHistory();
  const snackbar = useSnackbar();
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteSubcategoryModal, setShowDeleteSubcategoryModal] = useState(
    false
  );
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);

  useEffect(() => {
    if (!categories?.length) {
      ProductsService.getList().then((res) =>
        dispatch(setProducts(res.categories))
      );
    }
  }, [dispatch, categories?.length]);

  const handleAddSubcategory = (categoryId) => {
    history.push(ADD_SUBCATEGORY.replace(':categoryId', categoryId));
  };

  const handleEditSubcategory = (subcategoryId) => {
    history.push(EDIT_SUBCATEGORY.replace(':id', subcategoryId));
  };

  const handleAddProduct = (subcategoryId) => {
    history.push(ADD_PRODUCT.replace(':subcategoryId', subcategoryId));
  };

  const handleEditProduct = (productId) => {
    history.push(EDIT_PRODUCT.replace(':id', productId));
  };

  const handleDeleteProductModal = () => {
    setShowDeleteProductModal(!showDeleteProductModal);
  };

  const handleConfirmDeleteProductModal = () => {
    ProductsService.remove(productToDelete).then(() =>
      ProductsService.getList().then((res) => {
        snackbar.showMessage('Producto eliminado');
        dispatch(setProducts(res.categories));
        handleDeleteProductModal();
      })
    );
  };

  const handleDeleteSubcategoryModal = () => {
    setShowDeleteSubcategoryModal(!showDeleteSubcategoryModal);
  };

  const handleConfirmDeleteSubcategoryModal = () => {
    SubcategoriesService.remove(subcategoryToDelete).then(() =>
      ProductsService.getList().then((res) => {
        snackbar.showMessage('Subcategoria eliminada');
        dispatch(setProducts(res.categories));
        handleDeleteSubcategoryModal();
      })
    );
  };

  const categoriesList = [];
  categories.forEach((category, catIndex) => {
    const subcategories = [];
    category.Subcategories.forEach((subcategory) => {
      const productsElements = [];
      subcategory.Products.forEach((product) => {
        productsElements.push(
          <TableRow data-testid='product' key={product.id}>
            <TableCell align='left'>{product.name}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell align='right'>
              <Button
                color='default'
                onClick={() => {
                  handleEditProduct(product.id);
                }}
              >
                Editar
              </Button>
              <Button
                color='default'
                onClick={() => {
                  setProductToDelete(product.id);
                  handleDeleteProductModal();
                }}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        );
      });

      subcategories.push(
        <Grid
          data-testid='subcategory'
          item
          xs={12}
          md={6}
          key={subcategory.id}
        >
          <Grid container justify='space-between'>
            <h4>{subcategory.name}</h4>
            <Button
              color='default'
              onClick={() => handleEditSubcategory(subcategory.id)}
            >
              Editar
            </Button>
            <Button
              color='default'
              onClick={() => {
                setSubcategoryToDelete(subcategory.id);
                handleDeleteSubcategoryModal();
              }}
            >
              Eliminar
            </Button>
            <Button
              color='default'
              onClick={() => handleAddProduct(subcategory.id)}
            >
              Agregar producto
            </Button>
          </Grid>
          <Table aria-label='active tables'>
            <TableBody>{productsElements}</TableBody>
          </Table>
        </Grid>
      );
    });

    categoriesList.push(
      <Accordion data-testid='category' key={catIndex} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${category.id}-content`}
          id={`panel${category.id}-header`}
        >
          <Grid container justify='space-between'>
            <h3>{category.name}</h3>
            <Button
              color='default'
              onClick={(e) => {
                e.stopPropagation();
                handleAddSubcategory(category.id);
              }}
            >
              Agregar subcategoria
            </Button>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            {subcategories}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <TableContainer component={Paper}>
      {categoriesList}

      <Modal
        title='Eliminar subcategoria'
        body='¿Estás seguro de eliminar la subcategoria?'
        cancelButton='Cancelar'
        confirmButton='Confirmar'
        handleClose={handleDeleteSubcategoryModal}
        handleConfirm={handleConfirmDeleteSubcategoryModal}
        open={showDeleteSubcategoryModal}
      />

      <Modal
        title='Eliminar producto'
        body='¿Estás seguro de eliminar el producto?'
        cancelButton='Cancelar'
        confirmButton='Confirmar'
        handleClose={handleDeleteProductModal}
        handleConfirm={handleConfirmDeleteProductModal}
        open={showDeleteProductModal}
      />
    </TableContainer>
  );
}
