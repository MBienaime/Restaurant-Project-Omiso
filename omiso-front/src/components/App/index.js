// == Import npm
import React from 'react';

import {useState, useEffect } from 'react';
import axios from 'axios';

// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import Panier from '../Panier';
import Modal from '../Modal';


// == Import Style
import './styles.scss';



// commande recuperation API
// == Import npm
const App = () => {
  
  const [data, setData] = useState([]);  
  const [ModalConnexion, setModalConnexion] = useState(false );
  const [ModalPanier, setModalPanier] = useState(true );


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
    
    useEffect(getApiData, []);    


   const showModalConnexion = () => {
      setModalConnexion(true);
    };
  
   const hideModalConnexion = () => {
      setModalConnexion(false);
    };

    const showModalPanier = () => {
      setModalPanier(true);
    };
    const hideModalPanier = () => {
      setModalPanier(false);
    };


      

  return (
  <>
   <Modal show={ModalConnexion} hideModal={hideModalConnexion} />
   <Home showModalConnexion={showModalConnexion} showModalPanier={showModalPanier}/> 
   <div className="sectionMenu">
     { data.map( (d) =>(<MenuItems 
        title = {d.name}
        description = {d.description}
        price = {d.price}
        Image = ''
        key={d._id}
     />)) }      
  </div>  
    <Panier show={ModalPanier} hideModal={hideModalPanier}/>
  </>
  )
}

// == Export
export default App;


