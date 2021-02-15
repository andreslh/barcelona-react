import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import { SubcategoryProducts } from './SubcategoryProducts';

export function Subcategories({ category }) {
  const subcategories = [];
  category.Subcategories.forEach((subcategory) => {
    subcategories.push(
      <Grid data-testid="subcategory" item xs={12} md={6} key={subcategory.id}>
        <h4 className="subcategory-title">{subcategory.name}</h4>
        <Table aria-label="active tables">
          <TableHead>
            <TableRow>
              <TableCell align="left">Producto</TableCell>
              <TableCell align="left">Cantidad</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <SubcategoryProducts subcategory={subcategory} />
          </TableBody>
        </Table>
      </Grid>
    );
  });

  return subcategories;
}
