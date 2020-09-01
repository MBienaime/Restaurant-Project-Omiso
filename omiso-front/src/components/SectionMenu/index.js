// == Import npm
import React from 'react';
import ItemMenu from './ItemMenu/ItemMenu'
import Footer from '../Footer';

// == Import Style
import './styles.css';

const SectionMenu = () =>{


return(

<div className="sectionMenus">
        <div className="sectionMenusCarteMenu">
<ul><li>Entree</li><li>Plats</li><li>Dessert</li><li>Boisson</li></ul>
        </div>
    <div className='sectionMenuCarte'>

        
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
        
    </div>
    <Footer/>
</div>

)}

// == Export
export default SectionMenu ;
