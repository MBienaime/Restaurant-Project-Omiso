// == Import npm
import React from 'react';
import Menus from './Menus';
import Orders from './Orders'
import Users from './Users'



// == Import Style
import './styles.css';

// Local imports 

const AdminPanel = () => {

    
return(
<>

    <Menus/>
    <Orders/>
    <Users/>
</>
)};


// == Export
export default AdminPanel;


