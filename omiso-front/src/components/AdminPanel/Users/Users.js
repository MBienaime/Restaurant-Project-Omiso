// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// == Import Style
import './styles.css';

// Local imports

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [selectUser, setselectUser] = useState({
    _id: '', firstname: '', lastname: '', email: '', phone_number: '',
  });

  // API call data menu
  const getApiDataUsers = () => {
    const token = window.localStorage.getItem('UserTokenOmiso');
    const url = 'https://omiso.com/utilisateur/';
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        setDataUsers(resp.data.users);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  // getting menu data
  useEffect(getApiDataUsers, []);

  return (

    <div className="sectionAdminUser">

      <table className="sectionAdminUser_table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>TEL</th>
          </tr>
        </thead>
        <tbody>
          {dataUsers.map((e) => (

            <tr key={uuidv4()} onClick={() => setselectUser(e)} className={(e._id == selectUser._id) ? ('selectUser') : ('')}>
              <td>
                {e.firstname}
              </td>
              <td>
                {e.lastname}
              </td>
              <td>
                {e.email}
              </td>
              <td>
                {e.phone_number}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      <div className="ResultSelectAdminMenu">
        <div>Utilisateur</div>

        <div>
          <div>{ selectUser.firstname }</div>
          <div>{ selectUser.lastname }</div>
          <div>{ selectUser.email }</div>
          <div>{ selectUser.phone_number }</div>
        </div>

        <button type="button">Supprimer</button>
        <button type="button">Upadte</button>

      </div>
    </div>

  );
};

// == Export
export default Users;
