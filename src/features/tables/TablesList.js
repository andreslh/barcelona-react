import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(id, name) {
  return { id, name };
}

const rows = [
  createData(1, 'Andres'),
  createData(2, 'Ice cream sandwich'),
  createData(3, 'Eclair'),
  createData(4, 'Cupcake'),
  createData(5, 'Gingerbread'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="active tables">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <b>Mesas activas</b>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" size="small">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
