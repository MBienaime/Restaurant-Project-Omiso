// == Import npm
import React from 'react';

import Nav from './Nav';
import './style.scss';

// == Composant
const Header = ({ userIsLogged }) => {

  if (userIsLogged.role === 'ROLE_EMPLOYEE') return (
    <div className="d-flex flex-row-reverse">
      <Nav userIsLogged={userIsLogged} />
    </div>
  );

  return (
    <div className="header">
      <div className="headerContainer">

        <Nav userIsLogged={userIsLogged} />

        <a href="#carte" className="button mx-auto d-block margin-top-2">Commander maintenant</a>
      
      </div>
    </div>
  );
};


export default Header;
