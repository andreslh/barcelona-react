import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Tables from './features/tables';
import NewTable from './features/tables/NewTable';
import AddProducts from './features/tables/AddProducts/AddProducts';
import Products from './features/products';
import AddProduct from './features/products/AddProduct';
import EditProduct from './features/products/EditProduct';
import AddSubcategory from './features/products/AddSubcategory';
import EditSubcategory from './features/products/EditSubcategory';
import Login from './features/users/Login';
import PrivateRoute from './components/PrivateRoute';
import {
  ACTIVE_TABLE,
  ADD_PRODUCT,
  ADD_PRODUCTS,
  HOME,
  NEW_TABLE,
  PRODUCTS,
  EDIT_PRODUCT,
  ADD_SUBCATEGORY,
  EDIT_SUBCATEGORY,
  LOGIN,
} from './app/routes';

function Router() {
  return (
    <Switch>
      <PrivateRoute path={NEW_TABLE} component={NewTable} />
      <PrivateRoute path={ADD_PRODUCTS} component={AddProducts} />
      <PrivateRoute path={ACTIVE_TABLE} component={Tables} />
      <PrivateRoute path={PRODUCTS} component={Products} />
      <PrivateRoute path={ADD_PRODUCT} component={AddProduct} />
      <PrivateRoute path={EDIT_PRODUCT} component={EditProduct} />
      <PrivateRoute path={ADD_SUBCATEGORY} component={AddSubcategory} />
      <PrivateRoute path={EDIT_SUBCATEGORY} component={EditSubcategory} />
      <Route path={LOGIN} component={Login} />
      <PrivateRoute path={HOME} component={Tables} />
    </Switch>
  );
}

export default Router;
