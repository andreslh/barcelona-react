import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ProductsContext from './ProductsContext';
import { SubcategoryProducts } from './SubcategoryProducts';
import { SubcategoryTitleContainer } from '../../components/Products/SubcategoryTitle';
import { ADD_PRODUCT, EDIT_SUBCATEGORY } from '../../app/routes';

export function Subcategories({ category }) {
  const history = useHistory();
  const { setSubcategoryToDelete, handleDeleteSubcategoryModal } = useContext(
    ProductsContext
  );

  const handleAddProduct = (subcategoryId) => {
    history.push(ADD_PRODUCT.replace(':subcategoryId', subcategoryId));
  };

  const handleEditSubcategory = (subcategoryId) => {
    history.push(EDIT_SUBCATEGORY.replace(':id', subcategoryId));
  };

  const subcategories = [];
  category.Subcategories.forEach((subcategory) => {
    subcategories.push(
      <Grid data-testid="subcategory" item xs={12} md={6} key={subcategory.id}>
        <Grid container justify="space-between">
          <SubcategoryTitleContainer>
            <h4>{subcategory.name}</h4>
            <Button
              color="default"
              onClick={() => handleEditSubcategory(subcategory.id)}
            >
              Editar
            </Button>
            <Button
              color="default"
              onClick={() => {
                setSubcategoryToDelete(subcategory.id);
                handleDeleteSubcategoryModal();
              }}
            >
              Eliminar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddProduct(subcategory.id)}
            >
              Agregar producto
            </Button>
          </SubcategoryTitleContainer>
        </Grid>
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
