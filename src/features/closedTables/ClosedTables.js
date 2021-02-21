import 'date-fns';
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import TablesService from '../../services/tables';
import { TABLE_TYPES, TABLE_TYPES_TITLES } from '../../app/constants';
import { useHistory } from 'react-router-dom';
import { CLOSED_TABLE } from '../../app/routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectWaiters, setWaiters } from '../waiters/waitersSlice';
import WaitersService from '../../services/waiters';
import { getWaiterName } from '../tables/utils';
import {
  selectEndDate,
  selectStartDate,
  setEndDate,
  setStartDate,
} from './closedTablesSlice';

const TYPES = {
  tables: 'tables',
  orders: 'orders',
};

const isOrder = (type) => type === TYPES.orders;

const getOrderTypeTitle = (waiterId) =>
  waiterId === TABLE_TYPES.delivery
    ? TABLE_TYPES_TITLES.delivery
    : TABLE_TYPES_TITLES.takeAway;

export default function ClosedTables() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tables, setTables] = useState([]);
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);
  const [type, setType] = useState(TYPES.tables);
  const waiters = useSelector(selectWaiters);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!waiters.length) {
      WaitersService.get().then((response) => {
        dispatch(setWaiters(response.waiters));
      });
    }
  }, [dispatch, waiters.length]);

  useEffect(() => {
    if (firstRender) {
      TablesService.getClosed({
        startDate,
        endDate,
        type: TYPES.tables,
      }).then((response) => {
        setTables(response.tables);
      });
      setFirstRender(false);
    }
  }, [startDate, endDate, firstRender]);

  const handleRequest = (listType) => {
    TablesService.getClosed({
      startDate,
      endDate,
      type: listType,
    }).then((response) => {
      setTables(response.tables);
    });
  };

  const handleStartDateChange = (date) => {
    dispatch(setStartDate({ date }));
  };

  const handleEndDateChange = (date) => {
    dispatch(setEndDate({ date }));
  };

  const handleViewDetails = (id) => {
    history.push(CLOSED_TABLE.replace(':id', id));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box mt={5}>
        <TableContainer component={Paper}>
          <Grid
            container
            justify='space-between'
            alignItems='center'
            classes={{ root: 'table-header' }}
          >
            <Box pl={3}>
              <h4>Mesas y pedidos cerrados</h4>
            </Box>
            <Box m={2}>
              <Grid container justify='space-between' alignItems='center'>
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='dd-MM-yyyy'
                  margin='normal'
                  id='date-picker-start'
                  label='Fecha desde'
                  value={startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='dd-MM-yyyy'
                  margin='normal'
                  id='date-picker-end'
                  label='Fecha hasta'
                  value={endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <Box ml={2}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setType(TYPES.tables);
                      handleRequest(TYPES.tables);
                    }}
                  >
                    Ver mesas
                  </Button>
                </Box>

                <Box ml={2}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setType(TYPES.orders);
                      handleRequest(TYPES.orders);
                    }}
                  >
                    Ver pedidos
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Table aria-label='active tables'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Apertura</TableCell>
                <TableCell align='left'>Cerrada</TableCell>
                <TableCell align='left'>Nombre</TableCell>
                <TableCell align='left'>Total</TableCell>
                <TableCell align='left'>
                  {isOrder(type) ? 'Tipo' : 'Atendida por'}
                </TableCell>
                <TableCell align='left'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tables.map((table) => (
                <TableRow key={table.id}>
                  <TableCell align='left'>
                    {new Date(table.createdAt).toLocaleString('es-ES')}
                  </TableCell>
                  <TableCell align='left'>
                    {new Date(table.updatedAt).toLocaleString('es-ES')}
                  </TableCell>
                  <TableCell align='left'>{table.name}</TableCell>
                  <TableCell align='left'>${table.total}</TableCell>
                  <TableCell align='left'>
                    {isOrder(type)
                      ? getOrderTypeTitle(table.waiterId)
                      : getWaiterName(waiters, table.waiterId)}
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      color='default'
                      variant='contained'
                      onClick={() => {
                        handleViewDetails(table.id);
                      }}
                    >
                      Ver detalle
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MuiPickersUtilsProvider>
  );
}
