import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { LOGIN } from '../app/routes';
import { selectTokens } from '../features/users/usersSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { accessToken } = useSelector(selectTokens);
  return (
    <Route
      {...rest}
      render={(props) => {
        return accessToken ? <Component {...props} /> : <Redirect to={LOGIN} />;
      }}
    />
  );
};

export default PrivateRoute;
