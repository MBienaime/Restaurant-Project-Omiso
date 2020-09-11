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
  const [useDetailOrder, setDetailOrder] = useState({});

  console.log(useDetailOrder);
  return (
    <div className="sectionAdminMenu">
      <div className="fetchAdminMenu">
        <table>
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
              <tr key={uuidv4()} onClick={() => setDetailOrder(e)}>
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
      <div className="ResultSelectAdminMenu">
        <div>Commande</div>

        {useDetailOrder.payment_id}
        <br />
        {useDetailOrder.statusArchive}
        <br />
        {useDetailOrder.total_Price}
      </div>
    </div>
  );
};

// == Export
export default Orders;
