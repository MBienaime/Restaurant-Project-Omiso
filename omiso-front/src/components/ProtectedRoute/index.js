import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ useAuth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => ((useAuth.connect & (useAuth.role === 'admin' || 'employé')) ? (<Component {...props} useAuth={useAuth} />) : (<Redirect to="/" />))}
  />
);

export default ProtectedRoute;
