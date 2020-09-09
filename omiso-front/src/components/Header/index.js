import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// == Import Style
import './styles.css';

const Header = ({ useAuth, deconnected }) => (
  <>
    <ul className="navbar">
      <div className="nav_logo" />
      <div className="nav_links">
        <li className="nav_link">
          <Link to="/">Accueil</Link>
        </li>
        {(useAuth.connect & useAuth.role === 'admin' || 'employé') ? (
          <li className="nav_link">
            <Link to="/Administration">Administration</Link>
          </li>
        ) : (<></>)}
        <li className="nav_link">
          <Link to="/Contact">Contact</Link>
        </li>
        <li className="nav_link">
          {(useAuth.connect) ? (<a onClick={() => (deconnected())}>Deconnexion</a>) : (<Link to="/Connexion">Connexion</Link>)}
        </li>
        <li className="nav_link">
          <Link to="/Panier"><FaShoppingCart /></Link>
        </li>
      </div>
    </ul>

  </>
);
// == Export
export default Header;
