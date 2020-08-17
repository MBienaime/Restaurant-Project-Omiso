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
  const [user, setuser]= useState({email: "", lastmane:"", firstname:"",password:"",phone_number:"",address:"",postal_code:"",city:""});


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

    
//get data menu 
    useEffect(getApiData, []);    

//modal connexion
   const showModalConnexion = () => {
      setModalConnexion(true);
    };
  
   const hideModalConnexion = () => {
      setModalConnexion(false);
    };

//modal Panier
    const showModalPanier = () => {
      setModalPanier(true);
    };
    const hideModalPanier = () => {
      setModalPanier(false);
    }; 
    
    
//connexion users

const handleInputChange = (e) => setuser({
  ...user,
  [e.currentTarget.name]: e.currentTarget.value
})

  return (
  <>
   <Modal show={ModalConnexion} hideModal={hideModalConnexion}  />
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


