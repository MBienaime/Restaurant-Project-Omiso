// == Import npm
import React from 'react';


// == Import Style
import './styles.css';

// commande recuperation API
// == Import npm
const Menuitem = () =>(

<div className="menuitem">
    <div className="menuitem-image"></div>
    <div className="menutitem-animate">
        <div className="menutitem-animate-transparent"></div>
        <div className="menutitem-animate-description">
            <div className="flex border-bottom">
            <h1 className="title ">Sushi aux raisin </h1>
            <p className="title ">2€</p>
            </div>
            <p className=' descrition'>descrition du sushzi audfffffkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjffffffffffffffsdfdfdsfdsdfdf raisin</p>            
            <div className='flex '>
            <button className=" button ">-</button>
            <p className="title ">5</p>
            <button className=" button ">+</button>
            </div>
        </div>
    </div>
</div>





)

// == Export
export default Menuitem;
