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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import TablesService from '../../services/tables';
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
import {
  getFiltersList,
  getOrderTypeTitle,
  getTotal,
  getWaiterId,
  isOrder,
  TYPES,
} from './helpers';
import Datepicker from '../../components/Datepicker';

export default function ClosedTables() {
  const history = useHistory();
  const dispatch = useDispatch();
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);
  const waiters = useSelector(selectWaiters);
  const [tables, setTables] = useState([]);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState(TYPES.tables);
  const [selectedFilter, setSelectedFilter] = useState(TYPES.tables);
  const [submittedType, setSubmittedType] = useState(TYPES.tables);
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
        waiterId: null,
      }).then(({ tables }) => {
        setTables(tables);
        setTotal(getTotal(tables));
      });
      setFirstRender(false);
    }
  }, [startDate, endDate, firstRender]);

  const handleRequest = () => {
    TablesService.getClosed({
      startDate,
      endDate,
      type,
      waiterId: getWaiterId(selectedFilter),
    }).then(({ tables }) => {
      setSubmittedType(type);
      setTables(tables);
      setTotal(getTotal(tables));
    });
  };

  const handleWaiterChange = (e) => {
    const type = e.currentTarget[e.currentTarget.selectedIndex].getAttribute(
      'data-type'
    );
    const value = e.currentTarget.value;
    setType(type);
    setSelectedFilter(value);
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

  const filtersList = getFiltersList(waiters);

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
                <Datepicker
                  label='Fecha desde'
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <Datepicker
                  label='Fecha hasta'
                  value={endDate}
                  onChange={handleEndDateChange}
                />
                <Box m={2}>
                  <FormControl variant='filled'>
                    <InputLabel htmlFor='waiters-list'>Ver filtrado</InputLabel>
                    <Select
                      native
                      value={selectedFilter || ''}
                      onChange={handleWaiterChange}
                      inputProps={{
                        name: 'filter-list',
                        id: 'filter-list',
                      }}
                    >
                      <option aria-label='None' value='' />
                      {filtersList}
                    </Select>
                  </FormControl>
                </Box>

                <Box m={2}>
                  <Button
                    data-testid='submit-table-btn'
                    variant='contained'
                    color='primary'
                    onClick={handleRequest}
                  >
                    Buscar
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
                  {isOrder(submittedType) ? 'Tipo' : 'Atendida por'}
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
                    {isOrder(submittedType)
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

        <Grid container justify='space-between' component={Paper}>
          <Box pl={3}>
            <h4>Total: ${total}</h4>
          </Box>
        </Grid>
      </Box>
    </MuiPickersUtilsProvider>
  );
}
