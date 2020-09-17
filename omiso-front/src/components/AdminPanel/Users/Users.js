// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// == Import Style
import './styles.css';

// Local imports

const Users = () => {
  const [useDataUsers, setDataUsers] = useState([]);
  const [useSelectUser, setUseSelectUser] = useState({
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

    <div className="sectionAdminMenu">

      <div className="fetchAdminMenu">

        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Email</th>
              <th>TEL</th>
            </tr>
          </thead>
          <tbody>
            {useDataUsers.map((e) => (

              <tr key={uuidv4()} onClick={() => setUseSelectUser(e)} className={(e._id == useSelectUser._id) ? ('selectUser') : ('')}>
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

      </div>
      <div className="ResultSelectAdminMenu">
        <div>Utilisateur</div>

        <div>
          <div>{ useSelectUser.firstname }</div>
          <div>{ useSelectUser.lastname }</div>
          <div>{ useSelectUser.email }</div>
          <div>{ useSelectUser.phone_number }</div>
        </div>

        <button type="button">Supprimer</button>
        <button type="button">Upadte</button>

      </div>
    </div>

  );
};

// == Export
export default Users;
