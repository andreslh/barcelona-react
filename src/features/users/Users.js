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

import { selectUserByRole, setUsersByRole } from './usersSlice';
import UsersService from '../../services/users';
import Modal from '../../components/Modal';
import { ROLES } from '../../app/constants';
import { RESET_PASSWORD } from '../../app/routes';

const Users = () => {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const [userToDelete, setUserToDelete] = useState();
  const users = useSelector(selectUserByRole);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    UsersService.getByRole(ROLES.admin).then((response) => {
      dispatch(setUsersByRole(response.users));
    });
  }, [dispatch]);

  const getUsersByRole = (role) => {
    UsersService.getByRole(role).then((response) => {
      dispatch(setUsersByRole(response.users));
    });
  };

  const handleResetPassword = (id, email) => {
    history.push(RESET_PASSWORD.replace(':id', id).replace(':email', email));
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleConfirmDeleteModal = () => {
    UsersService.remove(userToDelete).then(() => {
      // dispatch(deleteWaiter(userToDelete));
      setShowDeleteModal(false);
      snackbar.showMessage('Mozo eliminado correctamente');
    });
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
            <h4>Gestionar Usuarios</h4>
          </Box>
          <Box m={2}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                getUsersByRole(ROLES.admin);
              }}
            >
              Ver administradores
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                getUsersByRole(ROLES.manager);
              }}
              m={2}
            >
              Ver managers
            </Button>
          </Box>
        </Grid>
        <Table aria-label='active tables'>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} data-testid='waiter'>
                <TableCell align='left'>{user.email}</TableCell>
                <TableCell align='right'>
                  <Button
                    color='default'
                    onClick={() => {
                      handleResetPassword(user.id, user.email);
                    }}
                  >
                    Resetear contraseña
                  </Button>
                  <Button
                    color='secondary'
                    onClick={() => {
                      setUserToDelete(user.id);
                      handleDeleteModal();
                    }}
                    m={2}
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
        title='Eliminar usuario'
        body='¿Estás seguro de eliminar el usuario?'
        cancelButton='Cancelar'
        confirmButton='Confirmar'
        handleClose={handleDeleteModal}
        handleConfirm={handleConfirmDeleteModal}
        open={showDeleteModal}
      />
    </Box>
  );
};

export default Users;
