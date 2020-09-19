// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

import {
  Switch, Route, Link,
} from 'react-router-dom';

import Menus from './Menus/Menus';
import Orders from './Orders/Orders';
import Users from './Users/Users';
import ProtectedRouteAdmin from './ProtetedRouteAdmin';

// == Import Style
import './styles.css';

// Local imports

const AdminPanel = ({ auth }) => (
  <div className="adminPanel">

    <ul>
      {(auth.connect & auth.role === 'admin') ? (
        <li className="nav_link">
          <Link to="/Administration/Menus">Menus</Link>
        </li>
      ) : (<></>)}
      <li>
        <Link to="/Administration/commande">Commandes</Link>
      </li>
      {(auth.connect & auth.role === 'admin') ? (
        <li className="nav_link">
          <Link to="/Administration/Utilisateurs">Utilisateurs</Link>
        </li>
      ) : (<></>)}

    </ul>

    <Switch>
      <ProtectedRouteAdmin path="/Administration/Menus" component={Menus} auth={auth} />
      <Route exact path="/Administration/commande">
        <Orders />
      </Route>
      <ProtectedRouteAdmin path="/Administration/Utilisateurs" component={Users} auth={auth} />
    </Switch>

  </div>

);

// == Export
export default AdminPanel;

AdminPanel.propTypes = {
  auth: PropTypes.object.isRequired,
};
