// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// == Import Style
import './styles.css';

// Local imports

const Menus = () => {
  const [useAddDataMenu, setAddDataMenu] = useState({
    name: '', decription: '', prix: 0, category: '',
  });
  const [useDataMenus, setDataMenus] = useState([{ _id: '' }]);

  // API call data menu
  const getApiData = () => {
    const url = 'https://omiso.com/menu/';
    axios.get(url)
      .then((resp) => {
        setDataMenus(resp.data.menuItems);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  // getting menu data
  useEffect(getApiData, []);

  const handleInputChange = (e) => setAddDataMenu({
    ...useAddDataMenu,
    [e.currentTarget.name]: e.currentTarget.value,
  });

  // add menu
  function handlesubmitMenu() {
    const token = window.localStorage.getItem('UserTokenOmiso');
    axios.post(
      'https://omiso.com/menu/',
      { ...useAddDataMenu },
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then((res) => {
        console.log(res);
        setAddDataMenu({
          name: '', decription: '', prix: 0, category: '',
        });
        getApiData();
      })
      .catch((e) => console.log(e));
  }

  // remove menu
  function handleRemoveMenu(id) {
    const token = window.localStorage.getItem('UserTokenOmiso');
    axios.delete(
      `https://omiso.com/menu/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then((res) => {
        console.log(res);
        getApiData();
      })
      .catch((e) => console.log(e));
  }

  return (

    <div className="sectionAdminMenu">

      <div className="fetchAdminMenu">

        <table>
          <thead>
            <tr>
              <th>Plats</th>
              <th>Prix</th>
              <th>Catagorie</th>
              <th>Description</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            { useDataMenus.map((d) => (
              <tr key={uuidv4()}>
                <td>
                  {d.name}
                </td>
                <td>
                  {d.price} €
                </td>
                <td>
                  {d.category}
                </td>
                <td>
                  {d.description}
                </td>
                <td>
                  <button onClick={() => handleRemoveMenu(d._id)}>Supprimer</button><br />
                </td>

              </tr>

            )) }
          </tbody>

        </table>

      </div>
      <div className="ResultSelectAdminMenu">
        <div>Nouveau Menu</div>

        <input type="text" id="titre" name="name" placeholder="Nom..." required onChange={(e) => handleInputChange(e)} />

        <input type="text" id="description" name="description" placeholder="Description..." required onChange={(e) => handleInputChange(e)} />

        <input type="text" id="prix" name="prix" placeholder="Prix..." required onChange={(e) => handleInputChange(e)} />

        <input type="text" id="categorie" name="category" placeholder="Catégorie..." required onChange={(e) => handleInputChange(e)} />

        <input type="file" id="image" name="image" required />

        <button onClick={() => handlesubmitMenu()}>ajouter</button>
      </div>
    </div>

  );
};

// == Export
export default Menus;
