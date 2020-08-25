// == Import npm
import React,{useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


// == Import Style
import './styles.css';

const Menuitems = ({addOrder}) =>{

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

<div className="sectionMenu">
    
    <div className="sectionMenuNav">
    <button className=" button " onClick={()=>(setCategory('Plat'))}>Plat</button>
    <button className=" button " onClick={()=>(setCategory('Boisson'))}>Boisson</button>
    <button className=" button " onClick={()=>(setCategory('Entree'))}>Entree</button>
    <button className=" button " onClick={()=>(setCategory('Dessert'))}>Dessert</button>
  </div>
  <div className='sectionMenuDisplayFliter'>
  
{ 
filterCategory(data,category).map( (data) =>(
    <div className="menuitem" key={uuidv4()}>
        <div className="menuitem-image" id='Menu'></div>
        <div className="menutitem-animate">
            <div className="menutitem-animate-transparent"></div>
            <div className="menutitem-animate-description">
                <div className="flex border-bottom">
                <h1 className="title "> {data.title}</h1>
                    <p className="title ">{data.price}€</p>
                </div>
                <p className=' descrition'>{data.description}</p>            
                <div className='flex '>
                <button className=" button " onClick={()=>(addOrder(data))} >Ajouter</button>
                </div>
            </div>
        </div>
    </div>
))} 
</div>
</div>



)}

// == Export
export default Menuitems;

    
