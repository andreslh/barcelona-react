import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ActiveTable from './ActiveTable';
import TablesList from './TablesList';
import { GET_TABLES } from '../../app/routes';
import { fetch, selectTables, setActive } from './tablesSlice';

const Tables = () => {
  const history = useHistory();
  const { active } = useParams();
  const tables = useSelector(selectTables);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(GET_TABLES).then((res) => {
      dispatch(fetch(res.data));
    });
  }, [dispatch]);

  useEffect(() => {
    if (tables.length) {
      axios
        .get(`${GET_TABLES}/${active ? active : tables[0].id}`)
        .then((res) => {
          dispatch(setActive(res.data));
        });
    }
  }, [dispatch, active, tables]);

  function handleClick() {
    history.push('/new-table');
  }

  return (
    <Box pt={3}>
      <Grid container justify="flex-end">
        <Box pb={3}>
          <Button variant="contained" color="default" onClick={handleClick}>
            Nueva mesa
          </Button>
        </Box>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TablesList />
        </Grid>
        <Grid item xs={12} md={9}>
          <ActiveTable id={active} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tables;
