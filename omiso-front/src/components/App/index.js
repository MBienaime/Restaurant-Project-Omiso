// == Import npm
import React from 'react';
import P404 from '../404';
import Panier from '../Panier';
import Menuitem from '../Menuitem';
import Home from '../Home';

// == Import Style
import './styles.scss';

// commande recuperation API
// == Import npm
const App = () =>(
  <>
    <Home/>
    <P404/>    
    <Menuitem/>
    <Panier/>
  </>
)

// == Export
export default App;
