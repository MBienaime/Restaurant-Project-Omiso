// == Import npm
import React from 'react';

import {    BrowserRouter as Router,    Switch,    Route,    Link  } from "react-router-dom";

import Menus from './Menus/Menus';
import Orders from './Orders/Orders'
import Users from './Users/Users'



// == Import Style
import './styles.css';

// Local imports 

const AdminPanel = () => {

    
return(
       
    <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Menus">Menus</Link>
          </li>
          <li>
            <Link to="/Orders">Orders</Link>
          </li>
          <li>
            <Link to="/Users">Users</Link>
          </li>
        </ul>        
        <Switch>
          <Route exact path="/">            
          </Route>
          <Route exact path="/Menus">
            <Menus/>
          </Route>
          <Route exact path="/Orders">
             <Orders/>
          </Route>
          <Route exact path="/Users">
             <Users/>
          </Route>
        </Switch> 
    </Router>
    
)};


// == Export
export default AdminPanel;


