// == Import npm
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// == Import Style
import './styles.css';

import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

// Local imports

const Orders = () => {
  // State initialization
  const [dataOrder, setDataOrder] = useState([{
    id_User: {
      email: '',
      firstname: '',
      lastname: '',
      phone_number: '',
      total_Price: null,
      status: false,
    },
  }]);

  // Select view Archive or en cours
  const [viewsArchive, setViewsArchive] = useState(false);

  // selected views detail order
  const [detailOrder, setDetailOrder] = useState({
    _id: '',
    id_User: { lastname: '', firstname: '', email: '' },
    order_Menu: [{ menu: '', Number_MenuItem: '', category: '' },
    ],
    total_Price: '',
    comment: '',
  });

  const getApiDataOrder = () => {
    const token = window.localStorage.getItem('UserTokenOmiso');
    const url = 'https://omiso.com/commande/';
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => {
        console.log('getApiData resp :', resp);
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
    console.log(e);
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
      .then(() => {
        getApiDataOrder();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="sectionAdminMenu">

      <table className="sectionAdminMenu_table">

        <thead>        {(viewsArchive)
          ? (
            <button type="button" onClick={() => setViewsArchive(!viewsArchive)}>
              Commande en cours
            </button>
          )
          : (
            <button type="button" onClick={() => setViewsArchive(!viewsArchive)}>
              Commande Archivé
            </button>
          )}

          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          { dataOrder.map((e) => (
            <tr key={uuidv4()} onClick={() => setDetailOrder(e)}>
              <td>{e.id_User.firstname}</td>
              <td>{e.id_User.lastname}</td>
              <td>{e.id_User.phone_number}</td>
              <td>{e.total_Price}€</td>
              <td className="btn">
                <br />
                <button className=" btn-fa">
                  {(e.status) ? (<FaToggleOn onClick={() => toggleArchive(e._id)} />) : (<FaToggleOff onClick={() => toggleArchive(e._id)} />)}
                </button>

              </td>
            </tr>
          )) }
        </tbody>
      </table>

      <div className="OrderDetail">
        <div>Commande</div>

        <div className="OrderDetail_client">
          <div>Client:</div>
          <div className="OrderDetail_client_contact">
            <div>Nom: {detailOrder.id_User.firstname}</div>
            <div>Prenom: {detailOrder.id_User.lastname}</div>
            <div>Telephone: {detailOrder.id_User.phone_number}</div>
            <div>Email: {detailOrder.id_User.email}</div>
          </div>
        </div>
        <div className="OrderDetail_order">
          <div>Commandes:</div>
          <div className="OrderDetail_order_menu">
            {detailOrder.order_Menu.map((e) => (
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
            {detailOrder.comment}
          </div>
        </div>
        <div className="OrderDetail_order_Total">
          <div>{`TOTAL: ${detailOrder.total_Price || 0}€`}</div>
          <button type="button">{(detailOrder.status) ? (<FaToggleOn onClick={() => toggleArchive(detailOrder._id)} />) : (<FaToggleOff onClick={() => toggleArchive(detailOrder._id)} />)}</button>
        </div>

      </div>

    </div>
  );
};

// == Export
export default Orders;
