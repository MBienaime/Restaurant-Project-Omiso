import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ useAuth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => ((useAuth.connect & useAuth.role !== 'client') ? (<Component {...props} useAuth={useAuth} />) : (<Redirect to="/" />))}
  />
);

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  useAuth: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};
