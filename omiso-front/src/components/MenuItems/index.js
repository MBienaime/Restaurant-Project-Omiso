// == Import npm
import React from 'react';


// == Import Style
import './styles.css';

// commande recuperation API
// == Import npm
const Menuitem = ({title, description, price, image}) =>(

<div className='sectionMenu'>
    <div className="menuitem">
        <div className="menuitem-image"></div>
        <div className="menutitem-animate">
            <div className="menutitem-animate-transparent"></div>
            <div className="menutitem-animate-description">
                <div className="flex border-bottom">
                <h1 className="title ">{title} </h1>
                    <p className="title ">{price}€</p>
                </div>
                <p className=' descrition'>{description}</p>            
                <div className='flex '>
                <button className=" button ">Ajouter</button>
                </div>
            </div>
        </div>
    </div>
</div>




)

// == Export
export default Menuitem;
