import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { selectProducts, setProducts } from './productsSlice';
import ProductsService from '../../services/products';
import { ADD_CATEGORY } from '../../app/routes';
import Modal from '../../components/Modal';
import SubcategoriesService from '../../services/subcategories';
import CategoriesService from '../../services/categories';
import { Categories } from './Categories';
import ProductsContext from './ProductsContext';

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
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    if (!categories?.length) {
      ProductsService.getList().then((res) =>
        dispatch(setProducts(res.categories))
      );
    }
  }, [dispatch, categories?.length]);

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

  const handleDeleteCategoryModal = () => {
    setShowDeleteCategoryModal(!showDeleteCategoryModal);
  };

  const handleConfirmDeleteCategoryModal = () => {
    CategoriesService.remove(categoryToDelete).then(() =>
      ProductsService.getList().then((res) => {
        snackbar.showMessage('Categoria eliminada');
        dispatch(setProducts(res.categories));
        handleDeleteCategoryModal();
      })
    );
  };

  const handleAddCategory = () => {
    history.push(ADD_CATEGORY);
  };

  const context = {
    categories,
    setProductToDelete,
    handleDeleteProductModal,
    setSubcategoryToDelete,
    handleDeleteSubcategoryModal,
    setCategoryToDelete,
    handleDeleteCategoryModal,
  };

  return (
    <ProductsContext.Provider value={context}>
      <Box pt={3}>
        <Grid container justify="flex-end">
          <Box pb={3}>
            <Button
              variant="contained"
              color="default"
              onClick={handleAddCategory}
            >
              Nueva categoría
            </Button>
          </Box>
        </Grid>
      </Box>
      <TableContainer>
        <Categories />

        <Modal
          title="Eliminar subcategoria"
          body="¿Estás seguro de eliminar la subcategoria?"
          cancelButton="Cancelar"
          confirmButton="Confirmar"
          handleClose={handleDeleteSubcategoryModal}
          handleConfirm={handleConfirmDeleteSubcategoryModal}
          open={showDeleteSubcategoryModal}
        />

        <Modal
          title="Eliminar producto"
          body="¿Estás seguro de eliminar el producto?"
          cancelButton="Cancelar"
          confirmButton="Confirmar"
          handleClose={handleDeleteProductModal}
          handleConfirm={handleConfirmDeleteProductModal}
          open={showDeleteProductModal}
        />

        <Modal
          title="Eliminar categoria"
          body="¿Estás seguro de eliminar la categoria?"
          cancelButton="Cancelar"
          confirmButton="Confirmar"
          handleClose={handleDeleteCategoryModal}
          handleConfirm={handleConfirmDeleteCategoryModal}
          open={showDeleteCategoryModal}
        />
      </TableContainer>
    </ProductsContext.Provider>
  );
}
