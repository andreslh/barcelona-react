import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import { ACTIVE_TABLE } from '../../app/routes';
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
  const [tablesVisibility, setTablesVisibility] = useState([]);

  const tablesList = [];
  tablesByWaiter.forEach((waiter, index) => {
    tablesVisibility.push(true);
    tablesList.push(
      <Table key={waiter.id} aria-label='active tables'>
        <TableHead classes={{ root: 'table-header' }}>
          <TableRow>
            <TableCell children={<Grid
              container
              justify="space-between"
              classes={{ root: 'pointer table-header' }}
              onClick={() => {
                const newTablesVisibility = [...tablesVisibility];
                newTablesVisibility[index] = !newTablesVisibility[index];
                setTablesVisibility(newTablesVisibility);
              }}
            >
              <b>{waiter.name}</b>
              <ChevronRightIcon
                fontSize="small"
                classes={{ root: tablesVisibility[index] ? 'chevron-down' : '' }}
              />
            </Grid>}>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody classes={{
          root: tablesVisibility[index] ? 'table-list-visible' : 'table-list-hidden'    
        }}>
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
                <TableLink to={ACTIVE_TABLE.replace(':active', table.id)}>
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
