// == Import npm
import React from 'react';

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

const AdminPanel = ({ useAuth }) => (
  <div className="adminPanel">

    <ul>
      {(useAuth.connect & (useAuth.role === 'admin')) ? (
        <li className="nav_link">
          <Link to="/Administration/Menus">Menus</Link>
        </li>
      ) : (<></>)}
      <li>
        <Link to="/Administration/commande">Commandes</Link>
      </li>
      {(useAuth.connect & (useAuth.role === 'admin')) ? (
        <li className="nav_link">
          <Link to="/Administration/Utilisateurs">Utilisateurs</Link>
        </li>
      ) : (<></>)}

    </ul>

    <Switch>
      <ProtectedRouteAdmin path="/Administration/Menus" component={Menus} useAuth={useAuth} />
      <Route exact path="/Administration/commande">
        <Orders />
      </Route>
      <ProtectedRouteAdmin path="/Administration/Utilisateurs" component={Users} useAuth={useAuth} />
    </Switch>

  </div>

);

// == Export
export default AdminPanel;
