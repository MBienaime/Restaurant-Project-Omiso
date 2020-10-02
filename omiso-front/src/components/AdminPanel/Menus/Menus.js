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
  const [AddDataMenu, setAddDataMenu] = useState({
    name: '', description: '', prix: 0, category: 'plat',
  });
  const [DataMenus, setDataMenus] = useState([{ _id: '' }]);
  const [Image, setImage] = useState({ preview: null, raw: null });

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
  useEffect(getApiData, [Image]);

  const handleInputChange = (e) => setAddDataMenu({
    ...AddDataMenu,
    [e.currentTarget.name]: e.currentTarget.value,
  });

  // add menu
  function handlesubmitMenu(e) {
e.preventDefault();
    const formData = new FormData();
    formData.append('name', AddDataMenu.name);
    formData.append('description', AddDataMenu.description);
    formData.append('price', AddDataMenu.prix);
    formData.append('category', AddDataMenu.category);
    formData.append('image', Image.raw);

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

      <table className="adminMenu_table">
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
          { DataMenus.map((d) => (
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

      <form className="ResultSelectAdminMenu">
        <div className="ResultSelectAdminMenu_title">Nouveau Menu</div>

        <input type="text" id="titre" name="name" placeholder="Nom..." required maxLength="12" onChange={(e) => handleInputChange(e)} value={AddDataMenu.name} />

        <input type="text" id="description" name="description" placeholder="Description..." required maxLength="32" onChange={(e) => handleInputChange(e)} value={AddDataMenu.description} />

        <input type="text" id="prix" name="prix" placeholder="Prix..." required maxLength="2" onChange={(e) => handleInputChange(e)} value={AddDataMenu.prix} />
        <label htmlFor="category">Catégorie:</label>
        <select className="ResultSelectAdminMenu_select" name="category" id="category" onChange={(e) => handleInputChange(e)} value={AddDataMenu.category}>

          <option className="ResultSelectAdminMenu_select" value="entree">Entree</option>
          <option className="ResultSelectAdminMenu_select" value="plat">Plat</option>
          <option className="ResultSelectAdminMenu_select" value="dessert">Dessert</option>
          <option className="ResultSelectAdminMenu_select" value="boisson">Boisson</option>
        </select>
        <div className="ResultSelectAdminMenu_imagesViews">

          {(Image.raw == null) ? (
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
            <img className="ResultSelectAdminMenu_imagesViews_image" src={Image.preview} />
          )}

        </div>
        <button className="ResultSelectAdminMenu_imagesViews_button" onClick={(e) => handlesubmitMenu(e)}>ajouter</button>
      </form>
    </div>

  );
};

// == Export
export default Menus;
