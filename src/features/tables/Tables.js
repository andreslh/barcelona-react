import React from 'react';
import { Box, Button, Grid } from '@material-ui/core';

import ActiveTable from './ActiveTable';
import TablesList from './TablesList';

const Tables = () => {
  return (
    <Box pt={3}>
      <Grid container justify="flex-end">
        <Box pb={3}>
          <Button variant="contained" color="primary">
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
