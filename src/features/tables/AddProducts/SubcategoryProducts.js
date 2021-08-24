import React, { useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AddProductsContext from './AddProductsContext';
import {
  ProductButtons,
  ProductButtonsHalf,
  ProductControls,
  ProductQuantity,
} from '../../../components/Products/ProductControls';

export function SubcategoryProducts({ subcategory }) {
  const {
    getProductChecked,
    handleProductChecked,
    getProductQuantity,
    handleProductQuantity,
  } = useContext(AddProductsContext);

  const productsElements = [];
  subcategory.Products.forEach((product) => {
    productsElements.push(
      <TableRow data-testid="product" key={product.id}>
        <TableCell align="left">
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  data-testid={`product-checkbox-${product.id}`}
                  checked={getProductChecked(product.id)}
                  onChange={() => handleProductChecked(product.id)}
                  name={`${product.id}-${product.name}`}
                />
              }
              label={product.name}
            />
          </FormGroup>
        </TableCell>
        <TableCell>
          <ProductControls>
            <ProductQuantity
              id="outlined-basic"
              data-testid={`product-quantity-${product.id}`}
              variant="outlined"
              value={getProductQuantity(product.id)}
              type="number"
              onChange={(e) =>
                handleProductQuantity({ id: product.id, quantity: e.currentTarget.value })
              }
              className="product-quantity"
            />
            {
              subcategory.allowHalf && (
                <ProductButtonsHalf>
                  <RemoveCircleOutlineIcon
                    fontSize="small"
                    data-testid={`product-reduce-quantity-${product.id}`}
                    classes={{ root: 'pointer' }}
                    onClick={() => {
                      handleProductQuantity({id: product.id, action: false, isHalf: true });
                    }}
                  />
                  <AddCircleOutlineIcon
                    fontSize="small"
                    data-testid={`product-add-quantity-${product.id}`}
                    classes={{ root: 'pointer' }}
                    onClick={() => {
                      handleProductQuantity({id: product.id, action: true, isHalf: true });
                    }}
                  />
                </ProductButtonsHalf>
              )
            }
            <ProductButtons>
              <RemoveCircleOutlineIcon
                fontSize="large"
                data-testid={`product-reduce-quantity-${product.id}`}
                classes={{ root: 'pointer' }}
                onClick={() => {
                  handleProductQuantity({id: product.id, action: false });
                }}
              />
              <AddCircleOutlineIcon
                fontSize="large"
                data-testid={`product-add-quantity-${product.id}`}
                classes={{ root: 'pointer' }}
                onClick={() => {
                  handleProductQuantity({id: product.id, action: true });
                }}
              />
            </ProductButtons>
          </ProductControls>
        </TableCell>
      </TableRow>
    );
  });

  return productsElements;
}
