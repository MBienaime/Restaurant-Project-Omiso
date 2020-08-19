import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import {useState, useEffect } from 'react';

// == Import Style
import "./styles.css";

import Connection from '../Connection/'


const Header = () => {
  
const [ModalConnexion, setModalConnexion] = useState(false);
  //modal connexion
  const showModalConnexion = () => {setModalConnexion(true);};

 const hideModalConnexion = () => {setModalConnexion(false);};

return(  
  <>
  {
    ModalConnexion &&
   <Connection hideModalConnexion={hideModalConnexion}/>
   }
  <nav className="navbar">
    <div className="nav_logo"></div>
    <div className = "nav_links">
    <a className="nav_link" href="#"> Accueil</a>
    <a className="nav_link" href="#"> Contact </a>
    <a className="nav_link" href="#" onClick={showModalConnexion} > Connexion </a>
    </div>
    <div className="cart"><FaShoppingCart/></div>
  </nav>  
  </>
)};
// == Export
export default Header;
