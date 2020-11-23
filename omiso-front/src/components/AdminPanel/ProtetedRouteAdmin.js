import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRouteAdmin = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} />} />
);

export default ProtectedRouteAdmin;

ProtectedRouteAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};
