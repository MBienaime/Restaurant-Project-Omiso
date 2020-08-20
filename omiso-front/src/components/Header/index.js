import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import {useState, useEffect } from 'react';

// == Import Style
import "./styles.css";

import Connection from '../Connection/';
import Cart from '../Cart';


const Header = () => {
  
const [useModalConnexion, setModalConnexion] = useState(false);
const [useModalCart,setModalCart ] = useState(false);
  //modal connexion
const showModalConnexion = () => {setModalConnexion(true);};
const hideModalConnexion = () => {setModalConnexion(false);};

  //modal Cart
  const showModalCart = () => {setModalCart(true);};
  const hideModalCart = () => {setModalCart(false);};

return(  
  <>
    {
    useModalCart &&
   <Cart hideModalCart={hideModalCart}/>
   }
  {
    useModalConnexion &&
   <Connection hideModalConnexion={hideModalConnexion}/>
   }
  <nav className="navbar">
    <div className="nav_logo"></div>
    <div className = "nav_links">
    <a className="nav_link" href="#"> Accueil</a>
    <a className="nav_link" href="#"> Contact </a>
    <a className="nav_link" href="#" onClick={showModalConnexion} > Connexion </a>
    </div>
    <div className="cart" onClick={showModalCart}><FaShoppingCart/></div>
  </nav>  
  </>
)};
// == Export
export default Header;
