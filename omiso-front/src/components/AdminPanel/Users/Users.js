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
  const [addUser, setAddUser] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    password2: '',
    phone_number: '0000000000',
    role: 'employé',
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

  // remove user
  function handleRemoveUser(id) {
    const token = window.localStorage.getItem('UserTokenOmiso');
    axios.delete(
      `https://omiso.com/utilisateur/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then(() => {
        getApiDataUsers();
        setAddUser({
          email: '',
          firstname: '',
          lastname: '',
          password: '',
          password2: '',
          phone_number: '0000000000',
          role: 'employé',
        });
      })
      .catch((e) => console.log(e));
  }

  // handlechange input
  const handleInputChange = (e) => setAddUser({
    ...addUser,
    [e.currentTarget.name]: e.currentTarget.value,
  });

  // API call : Signin
  const handleUserInscription = (user) => {
    const url = 'https://omiso.com/utilisateur/inscription';
    axios({
      method: 'post',
      url,
      data: user,
    })
      .then((e) => {
        console.log(e); getApiDataUsers();
      })
      .catch((e) => console.log(e));
  };

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
          {dataUsers.filter((e) => (e.role !== 'client')).map((e) => (
            <tr key={uuidv4()}>
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
                {e.role}
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
          <input type="text" id="firstname" name="firstname" placeholder="Nom..." required maxLength="32" onChange={(e) => handleInputChange(e)} value={addUser.firstname} />
          <input type="text" id="lastname" name="lastname" placeholder="Prenom..." required maxLength="32" onChange={(e) => handleInputChange(e)} value={addUser.lastname} />
          <input type="email" id="email" name="email" pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" placeholder="Email..." required maxLength="32" onChange={(e) => handleInputChange(e)} value={addUser.email} />
          <input type="password" id="password" name="password" placeholder="mots de passe..." required maxLength="32" onChange={(e) => handleInputChange(e)} value={addUser.password} />
          <input type="password" id="password2" name="password2" placeholder="mots de passe..." required maxLength="32" onChange={(e) => handleInputChange(e)} value={addUser.password2} />

          <select className="ResultSelectAdminUser_select" name="role" id="role" onChange={(e) => handleInputChange(e)} defaultValue={addUser.role}>
            <option className="ResultSelectAdminUser_select" value="admin">Administrateur</option>
            <option className="ResultSelectAdminUser_select" value="employé">Employé</option>
            <option className="ResultSelectAdminUser_select" value="client">Client</option>
          </select>

        </div>

        <button
          type="button"
          onClick={(evt) => {
            evt.preventDefault(); handleUserInscription(addUser);
          }}
        >ajouter
        </button>

      </div>
    </div>

  );
};

// == Export
export default Users;
