// == Import npm
import React from 'react';
import axios from 'axios';
import {useState, useEffect } from 'react';

// == Import Style
import './styles.scss';

// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import Header from'../Header';



const App = () => {

  return (
<>

<Header/> 
<Home/> 
<MenuItems/> 
</>

)}

// == Export
export default App;


