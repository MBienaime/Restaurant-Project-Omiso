// == Import npm
import React from 'react';

import {useState, useEffect } from 'react';
import axios from 'axios';

// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import Connection from '../Connection';




// == Import Style
import './styles.scss';



// commande recuperation API
// == Import npme
const App = () => {
  
  const [data, setData] = useState([]);  
  const [ModalConnexion, setModalConnexion] = useState(false);

  const [user, setuser]= useState({email: "", lastmane:"", firstname:"",password:"",phone_number:""});


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

//connexion users

const handleInputChange = (e) => setuser({
  ...user,
  [e.currentTarget.name]: e.currentTarget.value
})

const handleUserInscription = () =>{   
  const url= "https://omiso.com/utilisateur/inscription"
  axios({
    method:"post",
    url:url,
    data: user,
  })
  .then((e)=>console.log(e))
  .catch( (e)=>console.log(e));
}

const handleUserConnection = () =>{   
  const url= "https://omiso.com/utilisateur/login"
  axios({
    method:"post",
    url:url,
    data: user,
  })
  .then((e)=>{
    console.log(e.data.token);
    localStorage.setItem('UserTokenOmiso', e.data.token)
  })
  .catch( (e)=>console.log(e));
}


  return (
<>
   <Home showModalConnexion={showModalConnexion}/> 

   {ModalConnexion && <Connection hideModalConnexion={hideModalConnexion} handleInputChange={handleInputChange} user={user} handleUserInscription={handleUserInscription} handleUserConnection={handleUserConnection} handleUserforgetPassword={handleUserforgetPassword}/>}

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


