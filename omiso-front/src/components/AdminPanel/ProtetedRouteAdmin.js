import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouteAdmin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => ((false) ? (<Component {...props} />) : (<Redirect to="/" />))}
  />
);

export default ProtectedRouteAdmin;
