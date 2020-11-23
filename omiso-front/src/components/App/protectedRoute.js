import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.connect & (auth.role !== "client") ? (
        <Component {...props} auth={auth} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};
