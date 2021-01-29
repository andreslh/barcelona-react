import React from 'react';
import { useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
/* import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'; */
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { selectActive } from './tablesSlice';
import { selectProducts } from '../products/productsSlice';
import { useHistory } from 'react-router-dom';

export default function AddProducts() {
  const history = useHistory();
  const table = useSelector(selectActive);
  const products = useSelector(selectProducts);

  console.log(products);
  function handleClick() {
    history.push(`/tables/${table.id}`);
  }

  return (
    <TableContainer component={Paper}>
      <Grid container justify="space-between" component={Paper}>
        <Box pl={3}>
          <h4>
            Agregar productos a mesa: {table.id} - {table.name}
          </h4>
        </Box>
        <Box pr={3} m={2}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Cancelar
          </Button>
        </Box>
      </Grid>

      <Grid container justify="space-between" component={Paper}>
        <Box pr={3} m={2}>
          <Button variant="contained" color="primary">
            Agregar productos
          </Button>
        </Box>
      </Grid>
    </TableContainer>
  );
}
