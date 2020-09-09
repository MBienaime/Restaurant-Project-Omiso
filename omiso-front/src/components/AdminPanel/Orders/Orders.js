// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// == Import Style
import './styles.css';

// Local imports

const Orders = () => {
  const [useDataOrder, setDataOrder] = useState([{ id_User: { email: '' } }]);
  console.log(useDataOrder);
  // API call data menu
  const getApiDataOrder = () => {
    const token = window.localStorage.getItem('UserTokenOmiso');
    const url = 'https://omiso.com/commande/';
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        setDataOrder(resp.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  // getting menu data
  useEffect(getApiDataOrder, []);

  return (
    <div className="sectionAdminMenu">
      <div className="fetchAdminMenu">
        <table>
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
              <tr>
                <td>{e.id_User.firstname}</td>
                <td>{e.id_User.lastname}</td>
                <td>{e.id_User.phone_number}</td> 
                <td>{e.total_Price}</td>
                <td>
                  <button>Supprimer</button>
                  <br />
                  <button>Update</button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
      <div className="ResultSelectAdminMenu">
        <div>Commande</div>

        <input type="text" id="Nom" name="Nom" required />

        <input type="text" id="Prenom" name="Prenom" required />

        <input type="text" id="Email" name="Email" required />

        <input type="text" id="TEL" name="TEL" required />
      </div>
    </div>
  );
};

// == Export
export default Orders;
