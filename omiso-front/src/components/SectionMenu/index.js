// == Import npm
import React, { useState } from 'react';
import Commandes from '../../containers/Commande';
import Menus from '../../containers/Menus';

import './style.scss';

// == Composant
const SectionMenu = () =>


  (
    <div className="container-fluid ">
      <div className="row " id="carte">

        <Menus />
        <Commandes />

      </div>
    </div>
  );


// == Export
export default SectionMenu;
