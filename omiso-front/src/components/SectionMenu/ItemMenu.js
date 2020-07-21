// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle } from "react-icons/fa";


import './style.scss';

// == Composant

const ItemMenu = ({
  Title, Description, Prix, idmenu, clicMenu, image
 
}) => (


  <div className="mainMenu">
   <div className="firstPart" >
    <img src={image} className="listPicture" />
    <h4 className="font">{Title}</h4> 
    <p className="price">{Prix}€</p> 
    <p className="add" onClick={() => (clicMenu(idmenu))}> <FaPlusCircle /> </p>
  </div>
    <p className="description">{Description}</p>
  </div>

);


//= = validation props
ItemMenu.propTypes = {
  Title: PropTypes.string.isRequired,
  Prix: PropTypes.number.isRequired,
  Description: PropTypes.string.isRequired,
  idmenu: PropTypes.number.isRequired,
  clicMenu: PropTypes.func.isRequired,
};
//= = export components
export default ItemMenu;
