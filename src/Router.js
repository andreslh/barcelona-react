import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Tables from './features/tables';
import NewTable from './features/tables/NewTable';
import AddProducts from './features/tables/AddProducts/AddProducts';
import Products from './features/products';
import AddProduct from './features/products/AddProduct';
import EditProduct from './features/products/EditProduct';
import AddSubcategory from './features/products/AddSubcategory';
import EditSubcategory from './features/products/EditSubcategory';
import Login from './features/users/Login';
import ChangePassword from './features/users/ChangePassword';
import EditTable from './features/tables/EditTable';
import AddCategory from './features/products/AddCategory';
import EditCategory from './features/products/EditCategory';
import Waiters from './features/waiters/Waiters';
import NewWaiter from './features/waiters/NewWaiter';
import EditWaiter from './features/waiters/EditWaiter';
import ClosedTables from './features/closedTables/ClosedTables';
import ClosedTable from './features/closedTables/ClosedTable';
import Users from './features/users/Users';
import ResetPassword from './features/users/ResetPassword';
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
  CHANGE_PASSWORD,
  EDIT_TABLE,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  WAITERS,
  ADD_WAITER,
  EDIT_WAITER,
  CLOSED_TABLES,
  CLOSED_TABLE,
  USERS,
  RESET_PASSWORD,
} from './app/routes';

function Router() {
  return (
    <Switch>
      <PrivateRoute path={CLOSED_TABLE} component={ClosedTable} />
      <PrivateRoute path={CLOSED_TABLES} component={ClosedTables} />
      <PrivateRoute path={NEW_TABLE} component={NewTable} />

      <PrivateRoute path={ADD_PRODUCTS} component={AddProducts} />

      <PrivateRoute path={ACTIVE_TABLE} component={Tables} />
      <PrivateRoute path={EDIT_TABLE} component={EditTable} />

      <PrivateRoute path={PRODUCTS} component={Products} />
      <PrivateRoute path={ADD_PRODUCT} component={AddProduct} />
      <PrivateRoute path={EDIT_PRODUCT} component={EditProduct} />

      <PrivateRoute path={ADD_CATEGORY} component={AddCategory} />
      <PrivateRoute path={EDIT_CATEGORY} component={EditCategory} />

      <PrivateRoute path={ADD_SUBCATEGORY} component={AddSubcategory} />
      <PrivateRoute path={EDIT_SUBCATEGORY} component={EditSubcategory} />

      <PrivateRoute path={WAITERS} component={Waiters} />
      <PrivateRoute path={ADD_WAITER} component={NewWaiter} />
      <PrivateRoute path={EDIT_WAITER} component={EditWaiter} />

      <PrivateRoute path={USERS} component={Users} />
      <PrivateRoute path={RESET_PASSWORD} component={ResetPassword} />

      <Route path={LOGIN} component={Login} />
      <PrivateRoute path={CHANGE_PASSWORD} component={ChangePassword} />

      <PrivateRoute path={HOME} component={Tables} />
    </Switch>
  );
}

export default Router;
