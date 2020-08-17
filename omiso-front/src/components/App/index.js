// == Import npm
import React from 'react';
import P404 from '../404';
import Panier from '../Panier';
import Menuitem from '../Menuitem';
import Home from '../Home';
import {useState} from 'react';
import axios from 'axios';

// == Import Style
import './styles.scss';



// commande recuperation API
// == Import npm
const App = () => {
  
  const [data, setData] = useState([]);
  
    const url = `https://omiso.com/menu/`;
    axios.get(url)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log('error', error);
      });  

  return (
  <>
   <Home/>
    <P404/>    
    <Menuitem/>
    <Panier/>
  </>
  )
}

// == Export
export default App;
