// == Import npm
import React from 'react';
import ItemMenu from './ItemMenu'

// == Import Style
import './styles.css';

const SectionMenu = () =>{


return(

<div className="sectionMenus">
    <div className='sectionMenuHeader'>
         
        <div className='sectionMenuHeaderCenter'></div>  
        
    </div>
    <div className='sectionMenuCarte'>
        
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
            <ItemMenu></ItemMenu>
        
    </div>
    <div className='sectionMenuFooter'>

    </div>
</div>

)}

// == Export
export default SectionMenu ;