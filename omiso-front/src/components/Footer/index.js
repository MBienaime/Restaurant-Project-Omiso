// == Import npm
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import './style.scss';


// == Composant
const Footer = ({ userIsLogged }) => {
  if (userIsLogged.role === 'ROLE_EMPLOYEE') return null;

  return (  
  <div className="footer">
    <div className="icones text-center ">

      <a target="blank" className="col-4 icone" href="https://fr-fr.facebook.com/"><FaFacebook /></a>

      <a target="blank" className="col-4 icone" href="https://twitter.com/"><FaTwitter /></a>

      <a target="blank" className="col-4 icone" href="https://www.instagram.com/"><FaInstagram /></a>
    </div>


    <div className="info">
      <h5 className="addressTitle">Adresse :</h5>
      <h6 className="address">O'Miso</h6>
      <p className="address">21 route du miso</p>
      <p className="address">makis 01 234</p>
      <p className="address"> téléphone : 01 01 02 03 04</p>
    </div>

    <div className="info divTime">
      <h5 className="addressTitleTime">Horaires :</h5>
      <h6 className="address time">Nous sommes heureux de vous accueillir</h6>
      <p className="address time">Tous les jours de midi à 23h00 </p>
      <p className="address time">Sauf le dimanche</p>
    </div>


  </div>
)
};

// == Export
export default Footer;
