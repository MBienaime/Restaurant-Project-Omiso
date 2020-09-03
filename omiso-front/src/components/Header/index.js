import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import {useState, } from 'react';
import {Link} from "react-router-dom";

// == Import Style
import "./styles.css";

const Header = () => {
  
return(  
  <>
<ul className="navbar">
          <div className="nav_logo"></div>     
          <div className = "nav_links">  
          <li className="nav_link">
            <Link to="/">Accueil</Link>
          </li>
          <li className="nav_link">
            <Link to="/Administration">Administration</Link>
          </li>
          <li className="nav_link">
            <Link to="/Contact">Contact</Link>
          </li>
          <li className="nav_link">
            <Link to="/Connexion">Connexion</Link>
          </li>
          <li className="nav_link">
            <Link to="/Panier"><FaShoppingCart/></Link>
          </li>
          </div>
</ul>

  </>
)};
// == Export
export default Header;
