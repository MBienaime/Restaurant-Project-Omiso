// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// == Import Style
import './styles.css';
import {FaToggleOn, FaToggleOff } from 'react-icons/fa';

// Local imports

const Orders = () => {

  // State initialization
  const [useDataOrder, setDataOrder] = useState([{ 
    id_User: { 
      email: '' ,
      firstname: '', 
      lastname: '', 
      phone_number: '',
      total_Price: null,
      status: false,
    },
   }]);
  console.log('useDataOrder:', useDataOrder);  

  // API call data menu
  const getApiDataOrder = () => {
    const token = window.localStorage.getItem('UserTokenOmiso');
    const url = 'https://omiso.com/commande/';
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        console.log('getApiData resp :', resp)
        setDataOrder(resp.data);
        console.log("resp.data.id_User :", resp.data.id_User)
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  // getting menu data
  useEffect(getApiDataOrder, []);

// order archive

const orderArchive = (e)=>{
  const token = window.localStorage.getItem('UserTokenOmiso');
  const url = `https://omiso.com/commande/${e}`;
  console.log('url', url);
  axios.patch(url, { headers: { Authorization: `Bearer ${token}` } })
  .then(getApiDataOrder())
  .catch((e)=>(console.log('erreur',e)))

}
  return (
    <div className="sectionAdminMenu">
      <div className="fetchAdminMenu">
        <table>
          <div>Archiver</div>          
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Téléphone</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { useDataOrder.map((e) => (
              <tr key={uuidv4()}>
                <td>{e.id_User.firstname}</td>
                <td>{e.id_User.lastname}</td>
                <td>{e.id_User.phone_number}</td> 
                <td>{e.total_Price}€</td>
                <td className ="btn">
                  <br />
                  <button className = " btn-fa">
                  {(e.status)?(<FaToggleOn onClick={()=>orderArchive(e._id)}/>):(<FaToggleOff onClick={()=>orderArchive(e._id)}/>)}                  
                  </button>
                  
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
      <div className="ResultSelectAdminMenu">
        <div>Commande</div>
        
        <input type="text" id="Nom" name="Nom" required   />

        <input type="text" id="Prenom" name="Prenom"  required />

        <input type="text" id="TEL" name="TEL"   required />

        <input type="text" id="description" name="description"   required />

        <input type="text" id="Total" name="Total"  required />

      
      </div>

      

        
    </div>
  );
};

// == Export
export default Orders;
