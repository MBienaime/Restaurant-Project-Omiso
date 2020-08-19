import React from "react";

// == Import Style
import "./styles.css";

// == Import npm
const CardMenus = () => (
  <div className="section-Menu">
    <div className="CardMenus">
    <h1 className="CardMenus-title">Sushi aux 10 legumes <span className="CardMenus-span" >36€</span></h1>
    <p className="CardMenus-description">   
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
    exercice ullamco laboris 
    </p>

    <div className="CardMenus-ajout">
      <div className="CardMenus-image"></div>
      <button className="CardMenus-order">ajouter</button>
    </div>
    </div>
  </div>
);
// == Export
export default CardMenus;