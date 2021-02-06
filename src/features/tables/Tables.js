import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ActiveTable from './ActiveTable';
import TablesList from './TablesList';
import { GET_PRODUCTS, GET_TABLES, GET_TABLE } from '../../app/routes';
import {
  setTables,
  selectTables,
  setActive,
  selectActive,
  deleteTable,
} from './tablesSlice';
import { selectProducts, setProducts } from '../products/productsSlice';
import { isActiveParamValid } from './utils';

const Tables = () => {
  const history = useHistory();
  const { active } = useParams();
  const tables = useSelector(selectTables);
  const activeTable = useSelector(selectActive);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(GET_TABLES).then((res) => {
      if (res?.data?.tables) {
        dispatch(setTables(res.data.tables));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!products?.length) {
      axios.get(GET_PRODUCTS).then((res) => {
        dispatch(setProducts(res.data.categories));
      });
    }
  }, [dispatch, products?.length]);

  useEffect(() => {
    if (tables.length && isActiveParamValid(active, activeTable, tables)) {
      axios
        .get(GET_TABLE.replace(':id', active ? active : tables[0].id))
        .then((res) => {
          if (res?.data?.table) {
            dispatch(setActive(res.data.table));
          }
        });
    }
  }, [dispatch, active, tables, activeTable, activeTable?.id]);

  function onDeleteOrCompleteTable() {
    const nextActiveTable = tables.find(
      (table) => table.id.toString() !== activeTable.id
    );
    dispatch(deleteTable(activeTable.id));
    if (nextActiveTable) {
      history.push(`/tables/${nextActiveTable.id}`);
    } else {
      history.push('/');
    }
  }

  function handleCreateTable() {
    history.push('/new-table');
  }

  return (
    <Box pt={3}>
      <Grid container justify='flex-end'>
        <Box pb={3}>
          <Button
            variant='contained'
            color='default'
            onClick={handleCreateTable}
          >
            Nueva mesa
          </Button>
        </Box>
      </Grid>
      {(tables.length && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TablesList />
          </Grid>
          <Grid item xs={12} md={9}>
            <ActiveTable
              id={active}
              onDelete={onDeleteOrCompleteTable}
              onComplete={onDeleteOrCompleteTable}
            />
          </Grid>
        </Grid>
      )) ||
        null}
    </Box>
  );
};

export default Tables;
