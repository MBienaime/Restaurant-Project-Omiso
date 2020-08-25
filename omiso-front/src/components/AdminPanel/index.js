// == Import npm
import React from 'react';

import {     Switch,    Route,    Link  } from "react-router-dom";

import Menus from './Menus/Menus';
import Orders from './Orders/Orders'
import Users from './Users/Users'



// == Import Style
import './styles.css';

// Local imports 

const AdminPanel = () => {

    
return(
    <div className="adminPanel">  
    
        <ul>
          <li>
            <Link to="/Menus">Menus</Link>
          </li>
          <li>
            <Link to="/commande">Orders</Link>
          </li>
          <li>
            <Link to="/Utilisateurs">Users</Link>
          </li>
        </ul>        
        <Switch> 
        <Route exact path="/:id">
            <Menus />
          </Route>
          <Route exact path="/Menus">
            <Menus/>
          </Route>
          <Route exact path="/commande/:id">
             <Orders/>
          </Route>
          <Route exact path="/Utilisateurs">
             <Users/>
          </Route>
        </Switch> 
    
    </div>  
    
)};


// == Export
export default AdminPanel;


