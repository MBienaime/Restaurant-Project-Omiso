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
    name: '', description: '', prix: 0, category: 'plat',
  });
  const [useDataMenus, setDataMenus] = useState([{ _id: '' }]);

  const [useImage, setImage] = useState({ preview: null, raw: null });
  console.log(useAddDataMenu);

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
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  // handel input menu data
  useEffect(getApiData, [useImage]);

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
    formData.append('image', useImage.raw);

    const token = window.localStorage.getItem('UserTokenOmiso');
    axios.post(
      'https://omiso.com/menu/',
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then(() => {
        setAddDataMenu({
          name: '', description: '', prix: 0, category: 'plat',
        });
        getApiData();
        setImage({ preview: ' ', raw: null });
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
      .then(() => {
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
        <div className="ResultSelectAdminMenu_title">Nouveau Menu</div>

        <input type="text" id="titre" name="name" placeholder="Nom..." pattern="[a-z]{4,8}" required size="45" onChange={(e) => handleInputChange(e)} value={useAddDataMenu.name} />

        <input type="text" id="description" name="description" placeholder="Description..." required onChange={(e) => handleInputChange(e)} value={useAddDataMenu.description} />

        <input type="text" id="prix" name="prix" placeholder="Prix..." required onChange={(e) => handleInputChange(e)} value={useAddDataMenu.prix} />
        <label htmlFor="category">Catégorie:</label>
        <select className="ResultSelectAdminMenu_select" name="category" id="category" onChange={(e) => handleInputChange(e)} value={useAddDataMenu.category}>
          <option className="ResultSelectAdminMenu_select" value="entree">Entree</option>
          <option className="ResultSelectAdminMenu_select" value="plat">Plat</option>
          <option className="ResultSelectAdminMenu_select" value="dessert">Dessert</option>
          <option className="ResultSelectAdminMenu_select" value="boisson">Boisson</option>
        </select>
        <div className="ResultSelectAdminMenu_imagesViews">

          {(useImage.raw == null) ? (
            <input
              className="ResultSelectAdminMenu_imagesViews_input"
              type="file"
              id="image"
              name="image"
              onChange={(e) => {
                selectedImage(e);
              }}
            />
          ) : (
            <img className="ResultSelectAdminMenu_imagesViews_image" src={useImage.preview} />
          )}

        </div>
        <button className="ResultSelectAdminMenu_imagesViews_button" onClick={() => handlesubmitMenu()}>ajouter</button>
      </div>
    </div>

  );
};

// == Export
export default Menus;
