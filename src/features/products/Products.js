import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
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

  const context = {
    categories,
    handleEditProduct,
    setProductToDelete,
    handleDeleteProductModal,
    handleEditSubcategory,
    setSubcategoryToDelete,
    handleDeleteSubcategoryModal,
    handleAddProduct,
    handleAddSubcategory,
  };

  return (
    <ProductsContext.Provider value={context}>
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
      </TableContainer>
    </ProductsContext.Provider>
  );
}
