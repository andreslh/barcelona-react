import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';

import { SubcategoryProducts } from './SubcategoryProducts';
import { SubcategoryTitle } from '../../../components/Products/SubcategoryTitle';

export function Subcategories({ category }) {
  const subcategories = [];
  category.Subcategories.forEach((subcategory) => {
    subcategories.push(
      <Grid data-testid="subcategory" item xs={12} md={6} key={subcategory.id}>
        <SubcategoryTitle>{subcategory.name}</SubcategoryTitle>
        <Table aria-label="active tables">
          <TableBody>
            <SubcategoryProducts subcategory={subcategory} />
          </TableBody>
        </Table>
      </Grid>
    );
  });

  return subcategories;
}
