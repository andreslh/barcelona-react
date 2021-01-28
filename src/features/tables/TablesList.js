import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import sampleTables from './sampleTables.json';

import { fetch, selectTables } from './tablesSlice';

export default function TablesList() {
  const tables = useSelector(selectTables);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch(sampleTables));
  }, [dispatch]);

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
          {tables.map((row) => (
            <TableRow key={row.id} data-testid="table">
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
