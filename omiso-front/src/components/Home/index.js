import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaTripadvisor } from 'react-icons/fa';
// Local import 
import Header from "../Header";

// == Import Style
import "./style.css";

// commande recuperation API
// == Import npm
const Home = () => (
  <div className="home">
  <Header/>
   <div className="presentation ">
   
  <div className="social_icons">
     <a href="#" className="icon_link"><FaFacebookF className ="link_icons"/></a>
     <a href="#" className="icon_link"><FaTwitter className ="link_icons"/></a>
      <a href="#" className="icon_link"><FaInstagram className ="link_icons"/></a>
     <a href="#" className="icon_link"><FaTripadvisor className ="link_icons"/></a>
  </div>



<div className="introduction scale-in-hor-left">
    <div className="intro_text ">
        <h1>Click and Collect</h1>
       <p><span> 1  </span>Parcourez notre carte et choisissez parmis nos produits.</p>
        <p><span> 2  </span>Ajoutez votre sélection au panier puis valider.</p>
        <p><span> 3  </span>Connectez vous pour régler votre achat.</p>
        <p><span> 4  </span>Récupérez votre commande sur place.</p>
    </div>
 
        <button className="btn_menu">Notre carte</button>
</div>
</div>
</div>
)
// == Export
export default Home;
