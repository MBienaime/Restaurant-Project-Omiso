import React from "react";
import { FaShoppingCart } from 'react-icons/fa';


// == Import Style
import "./styles.css";

// == Import npm
const Header = ({showModalConnexion, showModalPanier}) => (
  <>
  <nav className="navbar">

    <div className="nav_logo"></div>

    <div className = "nav_links">
    <a className="nav_link" href="#"> Accueil</a>
    <a className="nav_link" href="#"> Contact </a>
    <a className="nav_link" href="#" onClick={()=>showModalConnexion()} > Connexion </a>
    </div>
    <div className="cart" onClick={()=>showModalPanier()}><FaShoppingCart/></div>
  </nav>  
  </>
);
// == Export
export default Header;
