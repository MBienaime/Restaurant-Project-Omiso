// == Import npm
import React from 'react';
import axios from 'axios';
import {useState, useEffect } from 'react';


// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import Connection from '../Connection';

// == Import Style
import './styles.scss';



// Getting data from API
const App = () => {
  
  const [data, setData] = useState([]);  
  const [ModalConnexion, setModalConnexion] = useState(false);

 


  //API call
    const getApiData = () => {
      const url = `https://omiso.com/menu/`;
      axios.get(url)
      .then((resp) => {
        setData(resp.data.menuItems)
      })
      .catch((error) => {
        console.log('error', error);
      });  
    }

    
//getting menu data
    useEffect(getApiData, []);    

//modal connexion
   const showModalConnexion = () => {
      setModalConnexion(true);
    };
  
   const hideModalConnexion = () => {
      setModalConnexion(false);
     };

  return (
<>
   <Home showModalConnexion={showModalConnexion}/> 

   {
    ModalConnexion &&
   <Connection hideModalConnexion={hideModalConnexion}/>
   }

   <div className="sectionMenu">
     { data.map( (d) =>(<MenuItems 
        title = {d.name}
        description = {d.description}
        price = {d.price}
        Image = ''
        key={d._id}
     />)) } 
     </div>  
 </>
  )
}

// == Export
export default App;


