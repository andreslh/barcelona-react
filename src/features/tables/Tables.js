import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid } from '@material-ui/core';

import ActiveTable from './ActiveTable';
import TablesList from './TablesList';

const Tables = () => {
  const history = useHistory();

  function handleClick() {
    history.push('/new-table');
  }

  return (
    <Box pt={3}>
      <Grid container justify="flex-end">
        <Box pb={3}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Nueva mesa
          </Button>
        </Box>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TablesList />
        </Grid>
        <Grid item xs={12} md={9}>
          <ActiveTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tables;
