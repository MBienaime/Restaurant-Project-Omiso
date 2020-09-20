// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FaTrashAlt } from 'react-icons/fa';

// == Import Style
import './styles.css';

// Local imports

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);

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

  // remove user
  function handleRemoveUser(id) {
    const token = window.localStorage.getItem('UserTokenOmiso');
    axios.delete(
      `https://omiso.com/utilisateur/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then(() => {
        getApiDataUsers();
      })
      .catch((e) => console.log(e));
  }

  return (

    <div className="sectionAdminUser">

      <table className="sectionAdminUser_table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Role</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {dataUsers.map((e) => (

            <tr key={uuidv4()} onClick={() => setselectUser(e)}>
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
              <td>
                <button onClick={() => handleRemoveUser(e._id)}>
                  <FaTrashAlt />
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      <div className="ResultSelectAdminMenu">
        <div>Utilisateur</div>

        <div>
          <input type="text" id="titre" name="name" placeholder="Nom..." required maxLength="12" />

          <input type="text" id="description" name="description" placeholder="Description..." required maxLength="32" />

          <input type="text" id="prix" name="prix" placeholder="Prix..." required maxLength="2" />

        </div>

        <button type="button">Supprimer</button>
        <button type="button">Upadte</button>

      </div>
    </div>

  );
};

// == Export
export default Users;
