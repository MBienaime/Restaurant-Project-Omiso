import React from 'react';
import {
  FaFacebookF, FaTwitter, FaInstagram, FaTripadvisor,
} from 'react-icons/fa';

import './style.css';

const Footer = () => (

  <div className="footer" id="Footer">

    <div className="footer__content">

      <div className="footer__content--about">
        <h4 className="footer__title">A propos</h4>
        <p>Le restaurant est ouvert du lundi au Samedi</p>
        <p>Le midi de 11h45 à 14h00</p>
        <p>Le soir de 18h45 à 23h00</p>
      </div>

      <div className="footer__content--contact">
        <h4 className="footer__title">Nous contacter</h4>
        <p>1 place de la gare</p>
        <p>+33102030405</p>
        <a>omiso@restaurant.com</a>
      </div>

      <div className="footer__content--socials">
        <h4 className="footer__title">Suivez-nous</h4>
        <div className="social__media">
          <a href="#" className="icon"><FaFacebookF /></a>
          <a href="#" className="icon"><FaTwitter /></a>
          <a href="#" className="icon"><FaInstagram /></a>
          <a href="#" className="icon"><FaTripadvisor /></a>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;

