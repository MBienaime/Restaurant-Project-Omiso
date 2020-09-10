// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// == Import Style
import './styles.css';

// Local imports

const Users = () => {
  const [useDataUsers, setDataUsers] = useState([]);

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {useDataUsers.map(() => (
              <tr key={uuidv4()}>
                <td>
                  jean
                </td>
                <td>
                  dupont
                </td>
                <td>
                  jean.dupont@gmail.com
                </td>
                <td>
                  05260525
                </td>
                <td>
                  <button type="button">Supprimer</button><br />
                  <button type="button">Update</button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
      <div className="ResultSelectAdminMenu">
        <div>Utilisateur</div>

        <input type="text" id="Nom" name="Nom" required />

        <input type="text" id="Prenom" name="Prenom" required />

        <input type="text" id="Email" name="Email" required />

        <input type="text" id="TEL" name="TEL" required />

      </div>
    </div>

  );
};

// == Export
export default Users;
