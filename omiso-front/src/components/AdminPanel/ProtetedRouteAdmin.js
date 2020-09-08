import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouteAdmin = ({ component: Component, useAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => <Component {...props} />}
  />
);

export default ProtectedRouteAdmin;
