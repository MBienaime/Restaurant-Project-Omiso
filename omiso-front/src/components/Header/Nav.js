// == Import npm
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onModalConnexion, loggedOut } from '../../actions';

// import PropTypes from 'prop-types';

// == Import
import './style.scss';

// == Composant
const Nav = ({ showModalConnexion, userIsLogged }) => {
  const dispatch = useDispatch();

  if (userIsLogged.role === 'ROLE_EMPLOYEE') return  (
    <nav className="nav-employee">
      {(userIsLogged.isAuthUser) ? (<h2 className="disconnect m-2 p-2" onClick={() => dispatch(loggedOut())}> Deconnexion </h2>) : (<h2 className="connexionFont" onClick={() => dispatch(onModalConnexion())}> Connexion </h2>)}
    </nav>
  );

  return (

    <nav className="nav">
      <a className="hoverNav" href="#accueil"> Accueil </a>

      <a className="hoverNav" href="#carte">  Carte  </a>


      {(userIsLogged.isAuthUser) ? (<h2 className="hoverNav connexionFont" onClick={() => dispatch(loggedOut())}> Deconnexion </h2>) : (<h2 className="hoverNav connexionFont" onClick={() => dispatch(onModalConnexion())}> Connexion </h2>)}

    </nav>

  );
};


// == Export
export default Nav;
