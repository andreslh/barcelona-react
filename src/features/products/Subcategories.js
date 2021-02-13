import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { SubcategoryProducts } from './SubcategoryProducts';

export function Subcategories({
  category,
  handleEditProduct,
  setProductToDelete,
  handleDeleteProductModal,
  handleEditSubcategory,
  setSubcategoryToDelete,
  handleDeleteSubcategoryModal,
  handleAddProduct,
}) {
  const subcategories = [];
  category.Subcategories.forEach((subcategory) => {
    subcategories.push(
      <Grid data-testid='subcategory' item xs={12} md={6} key={subcategory.id}>
        <Grid container justify='space-between'>
          <h4>{subcategory.name}</h4>
          <Button
            color='default'
            onClick={() => handleEditSubcategory(subcategory.id)}
          >
            Editar
          </Button>
          <Button
            color='default'
            onClick={() => {
              setSubcategoryToDelete(subcategory.id);
              handleDeleteSubcategoryModal();
            }}
          >
            Eliminar
          </Button>
          <Button
            color='default'
            onClick={() => handleAddProduct(subcategory.id)}
          >
            Agregar producto
          </Button>
        </Grid>
        <Table aria-label='active tables'>
          <TableBody>
            <SubcategoryProducts
              subcategory={subcategory}
              handleEditProduct={handleEditProduct}
              setProductToDelete={setProductToDelete}
              handleDeleteProductModal={handleDeleteProductModal}
            />
          </TableBody>
        </Table>
      </Grid>
    );
  });

  return subcategories;
}
