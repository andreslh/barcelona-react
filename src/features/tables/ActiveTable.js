import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { deleteTableProduct, selectActive } from './tablesSlice';
import { useHistory } from 'react-router-dom';
import Modal from '../../components/Modal';
import {
  DELETE_TABLE,
  COMPLETE_TABLE,
  DELETE_TABLE_PRODUCT,
} from '../../app/routes';

export default function ActiveTable({ onDelete, onComplete }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const table = useSelector(selectActive);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleCompleteModal = () => {
    setShowCompleteModal(!showCompleteModal);
  };

  const handleDeleteProductModal = () => {
    setShowDeleteProductModal(!showDeleteProductModal);
  };

  const handleConfirmDeleteModal = () => {
    axios.delete(DELETE_TABLE.replace(':id', table.id)).then(() => {
      setShowDeleteModal(false);
      onDelete();
      snackbar.showMessage('Mesa eliminada correctamente');
    });
  };

  const handleConfirmDeleteProductModal = () => {
    axios
      .delete(
        DELETE_TABLE_PRODUCT.replace(':id', table.id).replace(
          ':productId',
          productToDelete
        )
      )
      .then(() => {
        setShowDeleteProductModal(false);
        dispatch(deleteTableProduct(productToDelete));
        snackbar.showMessage('Producto eliminado correctamente');
      });
  };

  const handleConfirmCompleteModal = () => {
    axios.put(COMPLETE_TABLE.replace(':id', table.id)).then(() => {
      setShowCompleteModal(false);
      onComplete();
      snackbar.showMessage('Mesa cerrada correctamente');
    });
  };

  function handleAddProducts() {
    history.push('/add-products');
  }

  return (
    (table && table.id && (
      <>
        <TableContainer component={Paper}>
          <Grid container justify='space-between' component={Paper}>
            <Box pl={3}>
              <h4>
                Mesa: {table.id} - {table.name}
              </h4>
            </Box>
            <Box pr={3} m={2}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleAddProducts}
              >
                Agregar productos
              </Button>
            </Box>
          </Grid>
          <Table aria-label='active tables'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Cantidad</TableCell>
                <TableCell align='left'>Producto</TableCell>
                <TableCell align='left'>P. Unidad</TableCell>
                <TableCell align='left'>P. Total</TableCell>
                <TableCell align='left'></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {table.Tableproducts.map((product) => (
                <TableRow key={product.id} data-testid='product'>
                  <TableCell align='left'>{product.quantity}</TableCell>
                  <TableCell align='left'>{product.name}</TableCell>
                  <TableCell align='left'>${product.price}</TableCell>
                  <TableCell align='left'>${product.total}</TableCell>
                  <TableCell align='left'>
                    <Button
                      data-testid='delete-table-product'
                      variant='contained'
                      onClick={() => {
                        setProductToDelete(product.id);
                        handleDeleteProductModal();
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Grid container justify='space-between' component={Paper}>
            <Box pl={3}>
              <h4>Total: ${table.total}</h4>
            </Box>
            <Box pr={3} m={2}>
              <Button
                data-testid='complete-table'
                variant='contained'
                color='primary'
                onClick={handleCompleteModal}
              >
                Cerrar mesa
              </Button>
            </Box>
            <Box pr={3} m={2}>
              <Button
                data-testid='delete-table'
                color='default'
                onClick={handleDeleteModal}
              >
                Eliminar
              </Button>
            </Box>
          </Grid>
        </TableContainer>

        <Modal
          title='Eliminar mesa'
          body='¿Estás seguro de eliminar la mesa?'
          cancelButton='Cancelar'
          confirmButton='Confirmar'
          handleClose={handleDeleteModal}
          handleConfirm={handleConfirmDeleteModal}
          open={showDeleteModal}
        />

        <Modal
          title='Cerrar mesa'
          body='¿Estás seguro de cerrar la mesa?'
          cancelButton='Cancelar'
          confirmButton='Confirmar'
          handleClose={handleCompleteModal}
          handleConfirm={handleConfirmCompleteModal}
          open={showCompleteModal}
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
      </>
    )) ||
    null
  );
}
