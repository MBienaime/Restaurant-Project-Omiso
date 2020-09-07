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

const AdminPanel = (props) => (
  <div className="adminPanel">
    {console.log(props)}
    <ul>
      <li>
        <Link to="/Administration/Menus">Menus</Link>
      </li>
      <li>
        <Link to="/Administration/commande">Commandes</Link>
      </li>
      <li>
        <Link to="/Administration/Utilisateurs">Utilisateurs</Link>
      </li>
    </ul>

    <Switch>
      <ProtectedRouteAdmin exact path="/Administration/Menus" component={Menus} />
      <Route exact path="/Administration/commande">
        <Orders />
      </Route>
      <ProtectedRouteAdmin exact path="/Administration/Utilisateurs" component={Users} />

    </Switch>

  </div>

);

// == Export
export default AdminPanel;
