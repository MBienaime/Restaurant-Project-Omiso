// == Import npm
import React from 'react';
import P404 from '../404';
import Panier from '../Panier';
import PanierO from '../PanierO';
import Menuitem from '../Menuitem'

// == Import Style
import './styles.scss';

// commande recuperation API
// == Import npm
const App = () =>(
  <>
    <P404/>
    <Panier/>
    <Menuitem/>
    <PanierO/>
  </>
)

// == Export
export default App;
