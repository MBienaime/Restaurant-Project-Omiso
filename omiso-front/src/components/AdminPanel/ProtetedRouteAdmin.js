import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouteAdmin = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => <Component {...props} />}
  />
);

export default ProtectedRouteAdmin;
