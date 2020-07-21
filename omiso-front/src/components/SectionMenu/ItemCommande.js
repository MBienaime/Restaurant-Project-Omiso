// == Import npm
import React from 'react';
import { FaMinusCircle } from "react-icons/fa";
import PropTypes from 'prop-types';


import './style.scss';

// == Composant

const ItemCommande = ({
  Title, Prix, clicMenu, idmenu, multiplicator,
}) => (

  <div className="mainMenu">
    <div className="firstPart">
      <h4 className="font">{Title}</h4>
        <p className="price">{Prix}€</p>
        <p className="">x{multiplicator}</p>
        <p className="minus" onClick={() => (clicMenu(idmenu))}> <FaMinusCircle /> </p>
    </div>
  </div>


);

//= = validation props
ItemCommande.propTypes = {
  Title: PropTypes.string.isRequired,
  Prix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  clicMenu: PropTypes.func.isRequired,
  idmenu: PropTypes.number.isRequired,
};

//= = export components
export default ItemCommande;
