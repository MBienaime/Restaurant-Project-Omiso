// == Import npm
import React from 'react';
import {useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


// == Import Style
import './styles.css';



const Menuitems = ({addOrder,data}) =>{

return(

<div className="sectionMenu">
{ 
data.map( (data) =>(
    <div className="menuitem" key={uuidv4()}>
        <div className="menuitem-image"></div>
        <div className="menutitem-animate">
            <div className="menutitem-animate-transparent"></div>
            <div className="menutitem-animate-description">
                <div className="flex border-bottom">
                <h1 className="title "> {data.title}</h1>
                    <p className="title ">{data.price}€</p>
                </div>
                <p className=' descrition'>{data.description}</p>            
                <div className='flex '>
                <button className=" button " onClick={()=>(addOrder(data._id))} >Ajouter</button>
                </div>
            </div>
        </div>
    </div>
))} 
</div>



)}

// == Export
export default Menuitems;

    
