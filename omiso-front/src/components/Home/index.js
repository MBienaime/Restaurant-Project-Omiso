import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTripadvisor,
} from "react-icons/fa";

//Import Style
import "./styles.css";

const Home = () => (
  <div className="home">
    <div className="introduction">
      <div className="intro_text ">
        <h1>Click and Collect</h1>
        <div className="steps">
          <p>Parcourez notre carte.</p>
          <p>Ajoutez votre sélection au panier.</p>
          <p>Connectez vous pour régler vos achats.</p>
          <p>Récupérez votre commande sur place.</p>
        </div>
        <div className="home_btn">
          <button type="button" className="btn_menu ">
            <a className="button-text" href="#Menu">
              Notre carte
            </a>
          </button>
        </div>
      </div>

      <div className="social_icons scale-in-hor-left">
        <a href="#" className="icon_link">
          <FaFacebookF className="link_icons" />
        </a>
        <a href="#" className="icon_link">
          <FaTwitter className="link_icons" />
        </a>
        <a href="#" className="icon_link">
          <FaInstagram className="link_icons" />
        </a>
        <a href="#" className="icon_link">
          <FaTripadvisor className="link_icons" />
        </a>
      </div>
    </div>
  </div>
);
// == Export
export default Home;
