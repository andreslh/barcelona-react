import React, { useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import ProductsContext from './ProductsContext';

export function SubcategoryProducts({ subcategory }) {
  const {
    handleEditProduct,
    setProductToDelete,
    handleDeleteProductModal,
  } = useContext(ProductsContext);

  const productsElements = [];
  subcategory.Products.forEach((product) => {
    productsElements.push(
      <TableRow data-testid='product' key={product.id}>
        <TableCell align='left'>{product.name}</TableCell>
        <TableCell>${product.price}</TableCell>
        <TableCell align='right'>
          <Button
            color='default'
            onClick={() => {
              handleEditProduct(product.id);
            }}
          >
            Editar
          </Button>
          <Button
            color='default'
            onClick={() => {
              setProductToDelete(product.id);
              handleDeleteProductModal();
            }}
          >
            Eliminar
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  return productsElements;
}
