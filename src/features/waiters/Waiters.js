import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'material-ui-snackbar-provider';

import { selectWaiters, setWaiters, deleteWaiter } from './waitersSlice';
import WaitersService from '../../services/waiters';
import { isNormalWaiter } from './utils/isNormalWaiter';
import { ADD_WAITER, EDIT_WAITER } from '../../app/routes';
import Modal from '../../components/Modal';

export default function Waiters() {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const [waiterToDelete, setWaiterToDelete] = useState();
  const waiters = useSelector(selectWaiters);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    WaitersService.get().then((response) => {
      dispatch(setWaiters(response.waiters));
    });
  }, [dispatch]);

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleConfirmDeleteModal = () => {
    WaitersService.remove(waiterToDelete).then(() => {
      dispatch(deleteWaiter(waiterToDelete));
      setShowDeleteModal(false);
      snackbar.showMessage('Mozo eliminado correctamente');
    });
  };

  const handleAddWaiter = () => {
    history.push(ADD_WAITER);
  };

  const handleEditWaiter = (id) => {
    history.push(EDIT_WAITER.replace(':id', id));
  };

  return (
    <Box mt={5}>
      <TableContainer component={Paper}>
        <Grid
          container
          justify='space-between'
          classes={{ root: 'table-header' }}
        >
          <Box pl={3}>
            <h4>Gestionar Mozos</h4>
          </Box>
          <Box m={2}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleAddWaiter}
            >
              Agregar mozo
            </Button>
          </Box>
        </Grid>
        <Table aria-label='active tables'>
          <TableBody>
            {waiters
              .filter((waiter) => isNormalWaiter(waiter.id))
              .map((waiter) => (
                <TableRow key={waiter.id} data-testid='waiter'>
                  <TableCell align='left'>{waiter.name}</TableCell>
                  <TableCell align='right'>
                    <Button
                      color='default'
                      onClick={() => {
                        handleEditWaiter(waiter.id);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      color='secondary'
                      onClick={() => {
                        setWaiterToDelete(waiter.id);
                        handleDeleteModal();
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        title='Eliminar mozo'
        body='¿Estás seguro de eliminar el mozo?'
        cancelButton='Cancelar'
        confirmButton='Confirmar'
        handleClose={handleDeleteModal}
        handleConfirm={handleConfirmDeleteModal}
        open={showDeleteModal}
      />
    </Box>
  );
}
