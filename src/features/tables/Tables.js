import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ActiveTable from './ActiveTable';
import TablesList from './TablesList';
import {
  setTables,
  selectTables,
  setActive,
  selectActive,
  deleteTable,
} from './tablesSlice';
import { selectProducts, setProducts } from '../products/productsSlice';
import { isActiveParamValid } from './utils';
import TablesService from '../../services/tables';
import ProductsService from '../../services/products';
import { ACTIVE_TABLE, HOME, NEW_TABLE } from '../../app/routes';

const Tables = () => {
  const history = useHistory();
  const { active } = useParams();
  const tables = useSelector(selectTables);
  const activeTable = useSelector(selectActive);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    TablesService.getOpen().then((res) => dispatch(setTables(res.tables)));
  }, [dispatch]);

  useEffect(() => {
    if (!products?.length) {
      ProductsService.getList().then((res) =>
        dispatch(setProducts(res.categories))
      );
    }
  }, [dispatch, products?.length]);

  useEffect(() => {
    if (tables.length && isActiveParamValid(active, activeTable, tables)) {
      TablesService.getById(active ? active : tables[0].id).then((res) =>
        dispatch(setActive(res.table))
      );
    }
  }, [dispatch, active, tables, activeTable, activeTable?.id]);

  function onDeleteOrCompleteTable() {
    const nextActiveTable = tables.find((table) => table.id !== activeTable.id);
    dispatch(deleteTable(activeTable.id));
    if (nextActiveTable) {
      history.push(ACTIVE_TABLE.replace(':active', nextActiveTable.id));
    } else {
      history.push(HOME);
    }
  }

  function handleCreateTable() {
    history.push(NEW_TABLE);
  }

  return (
    <Box pt={3}>
      <Grid container justify="flex-end">
        <Box pb={3}>
          <Button
            variant="contained"
            color="default"
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
