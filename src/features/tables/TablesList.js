import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { selectActive, selectTables } from './tablesSlice';

import './TablesList.css';
import { Link } from 'react-router-dom';

export default function TablesList() {
  const tables = useSelector(selectTables);
  const active = useSelector(selectActive);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="active tables">
        <TableHead classes={{ root: 'table-header' }}>
          <TableRow>
            <TableCell align="left">
              <b>Mesas abiertas</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tables.map((table) => (
            <TableRow
              key={table.id}
              data-testid="table-item"
              classes={{
                root:
                  active?.id === table.id
                    ? 'table-list-active'
                    : 'table-list-normal',
              }}
            >
              <TableCell align="left">
                <Link to={`/tables/${table.id}`}>
                  {table.id} - {table.name}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
