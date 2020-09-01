import React from "react";

// == Import Style
import "./ItemMenu.css";

// == Import npm
const ItemMenu = () => (
<div className='ItemMenu'>
<div className="ItemMenu-animate">
<button className="ItemMenu-Button">ajouter</button>
</div>
<div className='ItemMenuDescription'><h2 className='ItemMenuDescriptionTitle' >title menu</h2> <p className='ItemMenuDescriptionCategory'>category</p><p className="ItemMenuDescriptionDescrip">descriptiotrbtrbyhrtbhtyhbtyhbtyhyththytbhybbhnjgcvjg</p> </div>
<div className='ItemMenuPrice'>5€</div>
<div className='ItemMenuPhoto'></div>
</div>
);
// == Export
export default ItemMenu;