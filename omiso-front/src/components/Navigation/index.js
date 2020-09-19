import React from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// == Import Style
import './styles.css';

const Navigation = ({ auth, deconnected }) => (
  <>
    <ul className="navbar">
      <div className="nav_logo" />
      <div className="nav_links">
        <li className="nav_link">
          <Link to="/">Accueil</Link>
        </li>
        {(auth.connect && (auth.role !== 'client')) ? (
          <li className="nav_link">
            <Link to="/Administration/commande">Administration</Link>
          </li>
        ) : (<></>)}
        <li className="nav_link">
          <a href="#Footer">Contact</a>
        </li>
        <li className="nav_link">
          {(auth.connect) ? (<a onClick={() => (deconnected())}>Deconnexion</a>) : (<Link to="/Connexion">Connexion</Link>)}
        </li>
        <li className="nav_link">
          <Link to="/Panier"><FaShoppingCart /></Link>
        </li>
      </div>
    </ul>

  </>
);
// == Export
export default Navigation;

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
  deconnected: PropTypes.func.isRequired,
};
