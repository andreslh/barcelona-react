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
} from './tablesSlice';
import { selectProducts, setProducts } from '../products/productsSlice';
import { getFirstTable, isActiveParamValid } from './utils';
import TablesService from '../../services/tables';
import ProductsService from '../../services/products';
import { HOME, LOGIN, NEW_TABLE } from '../../app/routes';
import WaitersService from '../../services/waiters';
import { setWaiters } from '../waiters/waitersSlice';
import { selectForceLogin } from '../users/usersSlice';

const Tables = () => {
  const history = useHistory();
  const { active } = useParams();
  const waitersWithTables = useSelector(selectTables);
  const activeTable = useSelector(selectActive);
  const products = useSelector(selectProducts);
  const forceLogin = useSelector(selectForceLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    WaitersService.getWithTables().then((res) =>
      dispatch(setTables(res.waiters))
    );
    WaitersService.get().then((response) => {
      dispatch(setWaiters(response.waiters));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!products?.length) {
      ProductsService.getList().then((res) =>
        dispatch(setProducts(res.categories))
      );
    }
  }, [dispatch, products?.length]);

  useEffect(() => {
    if (
      waitersWithTables.length &&
      isActiveParamValid(active, activeTable, waitersWithTables)
    ) {
      TablesService.getById(
        active ? active : getFirstTable(waitersWithTables).id
      ).then((res) => dispatch(setActive(res.table)));
    }
  }, [dispatch, active, waitersWithTables, activeTable, activeTable?.id]);

  useEffect(() => {
    if (forceLogin) {
      history.push(LOGIN);
    }
  }, [history, forceLogin]);

  function onDeleteOrCompleteTable() {
    WaitersService.getWithTables().then((res) => {
      dispatch(setTables(res.waiters));
      const firstTable = getFirstTable(res.waiters);
      if (firstTable) {
        TablesService.getById(firstTable.id).then((res) =>
          dispatch(setActive(res.table))
        );
      }
      history.push(HOME);
    });
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
            Nueva mesa o pedido
          </Button>
        </Box>
      </Grid>
      {(waitersWithTables.length && (
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
