import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import Modal from '../../components/Modal';
import TablesService from '../../services/tables';
import { ADD_PRODUCTS, EDIT_TABLE } from '../../app/routes';
import { selectWaiters } from '../waiters/waitersSlice';
import { getActiveTableTitle, isNormalTable } from './utils';

export default function ActiveTable({ onDelete, onComplete }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const table = useSelector(selectActive);
  const waiters = useSelector(selectWaiters);
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
    TablesService.remove(table.id).then(() => {
      setShowDeleteModal(false);
      onDelete();
      snackbar.showMessage('Mesa eliminada correctamente');
    });
  };

  const handleConfirmDeleteProductModal = () => {
    TablesService.removeProduct({
      tableId: table.id,
      productId: productToDelete,
    }).then(() => {
      setShowDeleteProductModal(false);
      dispatch(deleteTableProduct(productToDelete));
      snackbar.showMessage('Producto eliminado correctamente');
    });
  };

  const handleConfirmCompleteModal = () => {
    TablesService.complete(table.id).then(() => {
      setShowCompleteModal(false);
      onComplete();
      snackbar.showMessage('Mesa cerrada correctamente');
    });
  };

  function handleAddProducts() {
    history.push(ADD_PRODUCTS);
  }

  function handleEditTable() {
    history.push(EDIT_TABLE.replace(':id', table.id));
  }

  return (
    (table && table.id && (
      <>
        <TableContainer component={Paper}>
          <Grid
            container
            justify='space-between'
            classes={{ root: 'table-header' }}
          >
            <Box pl={3}>
              <h4>{getActiveTableTitle(table, waiters)}</h4>
            </Box>
            <Box m={2}>
              <Button color='default' onClick={handleEditTable}>
                Editar
              </Button>
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
                  <TableCell align='right'>
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
                {`Cerrar ${isNormalTable(table.waiterId) ? 'mesa' : 'pedido'}`}
              </Button>
            </Box>
            <Box pr={3} m={2}>
              <Button
                data-testid='delete-table'
                color='secondary'
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
