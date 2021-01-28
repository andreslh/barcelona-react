import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { setActive, selectActive } from './tablesSlice';
import { GET_TABLES } from '../../app/routes';
import { Box, Button, Grid } from '@material-ui/core';

export default function ActiveTable() {
  const table = useSelector(selectActive);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(GET_TABLES + '/1').then((res) => {
      dispatch(setActive(res.data));
    });
  }, [dispatch]);

  return (
    (table && table.id && (
      <TableContainer component={Paper}>
        <Grid container justify="space-between" component={Paper}>
          <Box pl={3}>
            <h4>
              Mesa: {table.id} - {table.name}
            </h4>
          </Box>
          <Box pr={3} m={2}>
            <Button variant="contained" color="primary">
              Agregar productos
            </Button>
          </Box>
        </Grid>
        <Table aria-label="active tables">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="left">Producto</TableCell>
              <TableCell align="left">P. Unidad</TableCell>
              <TableCell align="left">P. Total</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {table.products.map((product) => (
              <TableRow key={product.id} data-testid="product">
                <TableCell align="left" component="th" scope="row" size="small">
                  {product.id}
                </TableCell>
                <TableCell align="left">{product.quantity}</TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="left">{product.price}</TableCell>
                <TableCell align="left">{product.total}</TableCell>
                <TableCell align="left">
                  <Button variant="contained">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Grid container justify="space-between" component={Paper}>
          <Box pl={3}>
            <h4>Total: ${table.total}</h4>
          </Box>
          <Box pr={3} m={2}>
            <Button variant="contained" color="primary">
              Cerrar mesa
            </Button>
          </Box>
          <Box pr={3} m={2}>
            <Button color="default">Eliminar</Button>
          </Box>
        </Grid>
      </TableContainer>
    )) ||
    null
  );
}
