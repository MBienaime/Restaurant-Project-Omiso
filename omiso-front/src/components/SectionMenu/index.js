// == Import npm
import React,{useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ItemMenu from './ItemMenu/ItemMenu';
import Footer from '../Footer';

// == Import Style
import './styles.css';

const SectionMenu = ({addOrder}) =>{
        
    const [data, setData] = useState([{_id:""}]);  
    const [category, setCategory] =useState("");

  //API call data menu
  const getApiData = () =>{
    const url = `https://omiso.com/menu/`;
        axios.get(url)
        .then((resp) => {
          const addquantity = resp.data.menuItems.map((e)=>({...e,quantity:0}))
          setData(addquantity)
        })
        .catch((error) => {
          console.log('error', error);
        });  
      };
      
      //getting menu data
      useEffect(getApiData, []) ;

      const filterCategory = (data, category)=>{if(!category){return data }else {return (data.filter((e)=>(e.category===category)))}};


return(

<div className="sectionMenus">
        <div className="sectionMenusCarteMenu">
<ul><li onClick={()=>(setCategory('Entree'))}>Entree</li><li onClick={()=>(setCategory('Plat'))}>Plats</li><li onClick={()=>(setCategory('Dessert'))}>Dessert</li><li onClick={()=>(setCategory('Boisson'))}>Boisson</li></ul>
        </div>
    <div className='sectionMenuCarte'>
{ 
filterCategory(data,category).map( (data) =>(<ItemMenu data={data} addOrder={addOrder}></ItemMenu>))
}
        
            
   
    </div>
    <Footer/>
</div>

)}

// == Export
export default SectionMenu ;
