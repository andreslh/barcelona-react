import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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

import TablesService from '../../services/tables';
import { selectWaiters, setWaiters } from '../waiters/waitersSlice';
import { getActiveTableTitle } from '../tables/utils';
import WaitersService from '../../services/waiters';

export default function ClosedTable() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [table, setTable] = useState({});
  const waiters = useSelector(selectWaiters);

  useEffect(() => {
    if (!waiters.length) {
      WaitersService.get().then((response) => {
        dispatch(setWaiters(response.waiters));
      });
    }
  }, [dispatch, waiters.length]);

  useEffect(() => {
    TablesService.getById(id).then((response) => {
      setTable(response.table);
    });
  }, [id]);

  function handleGoBack() {
    history.goBack();
  }

  return (
    (table && table.id && (
      <Box mt={5}>
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
              <Button color='default' onClick={handleGoBack}>
                Volver
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
                  <TableCell />
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Grid container justify='space-between' component={Paper}>
            <Box pl={3}>
              <h4>Total: ${table.total}</h4>
            </Box>
          </Grid>
        </TableContainer>
      </Box>
    )) ||
    null
  );
}
