import React from "react";

// == Import Style
import "./ItemMenu.css";

// == Import npm
const ItemMenu = ({data, addOrder}) => (
<div className='ItemMenu'>
<div className="ItemMenu-animate">
<button className="ItemMenu-Button" onClick={()=>(addOrder(data))}>ajouter</button>
</div>
<div className='ItemMenuDescription'><h2 className='ItemMenuDescriptionTitle' >{data.name}</h2> <p className='ItemMenuDescriptionCategory'>{data.category}</p><p className="ItemMenuDescriptionDescrip">{data.description}</p> </div>
<div className='ItemMenuPrice'>{data.price}€</div>
<div className='ItemMenuPhoto'></div>
</div>
);
// == Export
export default ItemMenu;