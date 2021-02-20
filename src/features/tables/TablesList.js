import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { selectActive, selectTables } from './tablesSlice';

import './TablesList.css';

const TableLink = styled(Link)`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

export default function TablesList() {
  const tablesByWaiter = useSelector(selectTables);
  const active = useSelector(selectActive);

  const tablesList = [];
  tablesByWaiter.forEach((waiter) => {
    tablesList.push(
      <Table key={waiter.id} aria-label='active tables'>
        <TableHead classes={{ root: 'table-header' }}>
          <TableRow>
            <TableCell align='left'>
              <b>{waiter.name}</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {waiter.Tables.map((table) => (
            <TableRow
              key={table.id}
              data-testid='table-item'
              classes={{
                root:
                  active?.id === table.id
                    ? 'table-list-active'
                    : 'table-list-normal',
              }}
            >
              <TableCell align='left'>
                <TableLink to={`/tables/${table.id}`}>
                  <span>{table.name}</span>
                  <span>${table.total}</span>
                </TableLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  });

  return <TableContainer component={Paper}>{tablesList}</TableContainer>;
}
