// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// == Import Style
import './styles.css';
import { FaTrashAlt } from 'react-icons/fa';
// Local imports

const Menus = () => {
  // state
  const [useAddDataMenu, setAddDataMenu] = useState({
    name: '', decription: '', prix: 0, category: '',
  });
  const [useDataMenus, setDataMenus] = useState([{ _id: '' }]);
  const [useImage, setImage] = useState(null);

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

  // Selected image

  const selectedImage = (e) => {
    setImage(e.target.files[0]);
  };

  // handel input menu data
  useEffect(getApiData, []);

  const handleInputChange = (e) => setAddDataMenu({
    ...useAddDataMenu,
    [e.currentTarget.name]: e.currentTarget.value,
  });

  // add menu
  function handlesubmitMenu() {
    const formData = new FormData();
    formData.append('name', useAddDataMenu.name);
    formData.append('description', useAddDataMenu.description);
    formData.append('price', useAddDataMenu.prix);
    formData.append('category', useAddDataMenu.category);
    formData.append('image', useImage);

    const token = window.localStorage.getItem('UserTokenOmiso');
    axios.post(
      'https://omiso.com/menu/',
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then((res) => {
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
                  <img src={d.urlImage} />
                </td>
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
                  <button onClick={() => handleRemoveMenu(d._id)}>

                    <FaTrashAlt />
                  </button><br />
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

        <input
          type="file"
          id="image"
          name="image"
          required
          onChange={(e) => {
            selectedImage(e);
          }}
        />

        <button onClick={() => handlesubmitMenu()}>ajouter</button>
      </div>
    </div>

  );
};

// == Export
export default Menus;
