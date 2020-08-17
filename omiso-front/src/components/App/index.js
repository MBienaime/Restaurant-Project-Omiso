// == Import npm
import React from 'react';

import {useState, useEffect } from 'react';
import axios from 'axios';

// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import P404 from '../404';
import Panier from '../Panier';



// == Import Style
import './styles.scss';



// commande recuperation API
// == Import npm
const App = () => {
  
  const [data, setData] = useState([]);
  
    const getApiData = () => {
      const url = `https://omiso.com/menu/`;
      axios.get(url)
      .then((resp) => {
        setData(resp.data)
      })
      .catch((error) => {
        console.log('error', error);
      });  
    } 
    
      useEffect(getApiData, []);
      console.log(data);
      

  return (
  <>
   <Home />
   <MenuItems 
     title = "testitre"
     description = "test descrition"
     price = {10}
     Image = ''
   />
    <P404/> 
    
    <Panier/>
  </>
  )
}

// == Export
export default App;
