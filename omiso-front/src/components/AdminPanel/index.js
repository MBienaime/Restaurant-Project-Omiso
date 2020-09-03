// == Import npm
import React from 'react';

import { Switch, Route, Link ,useRouteMatch } from "react-router-dom";


import Menus from './Menus/Menus';
import Orders from './Orders/Orders'
import Users from './Users/Users'



// == Import Style
import './styles.css';

// Local imports 

const AdminPanel = () => {
  const  { path, url } = useRouteMatch();
    
return(
    <div className="adminPanel">  
    
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
          <Route exact path="/Administration/Menus">
            <Menus/>
          </Route>
          <Route exact path="/Administration/commande">
             <Orders/>
          </Route>
          <Route exact path="/Administration/Utilisateurs">
             <Users/>
          </Route>
        </Switch> 
    
    </div>  
    
)};


// == Export
export default AdminPanel;


