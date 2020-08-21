// == Import npm
import React,{useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


// == Import Style
import './styles.css';

const Menuitems = ({addOrder}) =>{

    const [data, setData] = useState([{_id:""}]);  

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
                <button className=" button " onClick={()=>(addOrder(data))} >Ajouter</button>
                </div>
            </div>
        </div>
    </div>
))} 
</div>



)}

// == Export
export default Menuitems;

    
