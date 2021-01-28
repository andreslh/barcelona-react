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

import { fetch, selectActive, selectTables } from './tablesSlice';
import { GET_TABLES } from '../../app/routes';

import './TablesList.css';

export default function TablesList() {
  const tables = useSelector(selectTables);
  const active = useSelector(selectActive);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(GET_TABLES).then((res) => {
      dispatch(fetch(res.data));
    });
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="active tables">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <b>Mesas abiertas</b>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {tables.map((table) => (
            <TableRow
              key={table.id}
              data-testid="table"
              classes={{
                root:
                  active?.id === table.id
                    ? 'table-list-active'
                    : 'table-list-normal',
              }}
            >
              <TableCell scope="row" size="small">
                {table.id}
              </TableCell>
              <TableCell align="left">{table.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
