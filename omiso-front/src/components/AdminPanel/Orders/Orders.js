// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// == Import Style
import './styles.css';
import { FaTrash } from 'react-icons/fa';

// Local imports

const Orders = () => {
  // API call data menu
  const [useDataOrder, setDataOrder] = useState([{ id_User: { email: '' } }]);
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

  //  toggle archive
  const toggleArchive = (e) => {
    const token = window.localStorage.getItem('UserTokenOmiso');
    const url = `https://omiso.com/commande/${e}`;

    // parametre axios
    const authOptions = {
      method: 'PATCH',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // send axios
    axios(authOptions)
      .then(() => getApiDataOrder())
      .catch((e) => console.log(e));
  };

  // Select view Archive or en cours
  const [useViewsArchive, setViewsArchive] = useState(false);

  // selected views detail order
  const [useDetailOrder, setDetailOrder] = useState({
    _id: '',
    id_User: { lastname: '', firstname: '', email: '' },
    order_Menu: [{ menu: '', Number_MenuItem: '', category: '' },
    ],
    total_Price: '',
    comment: '',
  });

  return (
    <div className="sectionAdminMenu">
      <div className="fetchAdminMenu">
        {(useViewsArchive)
          ? (
            <button type="button" onClick={() => setViewsArchive(!useViewsArchive)}>
              En cours
            </button>
          )
          : (
            <button type="button" onClick={() => setViewsArchive(!useViewsArchive)}>
              Archivé
            </button>
          )}

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
            { useDataOrder.filter((e) => e.statusArchive === useViewsArchive).map((e) => (
              <tr key={uuidv4()} onClick={() => setDetailOrder(e)} className={(e._id == useDetailOrder._id) ? ('selectOrder') : ('')}>
                <td>{e.id_User.firstname}</td>
                <td>{e.id_User.lastname}</td>
                <td>{e.id_User.phone_number}</td>
                <td>{e.total_Price}€</td>
                <td>
                  { (e.statusArchive) ? (
                    <button type="button" onClick={() => (toggleArchive(e._id))}>
                      <FaTrash />
                    </button>
                  ) : (
                    <button type="button" onClick={() => (toggleArchive(e._id))}>
                      En cours
                    </button>
                  )}

                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
      <div className="OrderDetail">
        <div>Commande</div>

        <div className="OrderDetail_client">
          <div>Client:</div>
          <div className="OrderDetail_client_contact">
            <div>Nom: {useDetailOrder.id_User.firstname}</div>
            <div>Prenom: {useDetailOrder.id_User.lastname}</div>
            <div>Telephone: {useDetailOrder.id_User.phone_number}</div>
            <div>Email: {useDetailOrder.id_User.email}</div>
          </div>
        </div>
        <div className="OrderDetail_order">
          <div>Commandes:</div>
          <div className="OrderDetail_order_menu">
            {useDetailOrder.order_Menu.map((e) => (
              <div key={uuidv4()} className="OrderDetail_order_menu_item">
                { (e.menu == null) ? (<div>Menu suprimer</div>) : (
                  <div>{`${e.menu.category}      ${e.menu.name}     X    ${e.Number_MenuItem}`}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="OrderDetail_order_comment">
          <div>Commentaire:</div>
          <div className="OrderDetail_order_comment_detail">
            {useDetailOrder.comment}
          </div>
        </div>
        <div className="OrderDetail_order_Total">
          <div>{`TOTAL: ${useDetailOrder.total_Price || 0}€`}</div>
          <button>archivé</button>
        </div>
      </div>
    </div>
  );
};

// == Export
export default Orders;
