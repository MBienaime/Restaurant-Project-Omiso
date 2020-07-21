// == Import
import React from 'react';
import PropTypes from 'prop-types';
import ItemMenu from './ItemMenu';
import { v4 as uuidv4 } from 'uuid';

//= =import style

import './style.scss';

// == Composant

const Menu = ({ list, menu, clicMenu }) => (
  <div className="col-12 col-sm-6">
    <h1 className="text-center">Menus</h1>
    <div className=" row justify-content-center">
      <div className="col-sm-12 ">
        <ul className="nav justify-content-center  height ">
          <li className="nav-item ">
            <button className="button-items" onClick={() => menu('Entree')} type="button">
              Entree
            </button>
          </li>
          <li className="nav-item ">
            <button className="button-items" onClick={() => menu('Plat')} type="button">
              Plats
            </button>
          </li>
          <li className="nav-item ">
            <button className="button-items" onClick={() => menu('Dessert')} type="button">
              Dessert
            </button>
          </li>
          <li className="nav-item ">
            <button className="button-items" onClick={() => menu('Boisson')} type="button">
              Boisson
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div className="row justify-content-center ">
      <div className="col-10 menu">
        {list.map((dat) => (
          <ItemMenu
            idmenu={dat.id}
            key={uuidv4()}
            Title={dat.name}
            Description={dat.description}
            Prix={dat.price}
            clicMenu={clicMenu}
            image={dat.image}
          />
        ))}
      </div>
    </div>
  </div>
);

Menu.propTypes = {
  list: PropTypes.array.isRequired,
  menu: PropTypes.func.isRequired,
  clicMenu: PropTypes.func.isRequired,
};

// == Export
export default Menu;
