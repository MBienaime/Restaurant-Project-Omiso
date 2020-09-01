// == Import npm
import React, { useState, useEffect } from "react";
import axios from "axios";

// == Import Style
import "./styles.css";

// Local imports

const Orders = () => {
  const [useDataOrder, setDataOrder] = useState([]);

  //API call data menu
  const getApiDataOrder = () => {
    const url = `https://omiso.com/commande/`;
    axios
      .get(url)
      .then((resp) => {
        setDataOrder(resp);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //getting menu data
  useEffect(getApiDataOrder, []);

  return (
    <div className="sectionAdminMenu">
      <div className="fetchAdminMenu">
        <table>
          <thead>
            <tr>
              <th>Commande</th>
              <th>TEL</th>
              <th>Email</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sgds546</td>
              <td>06525214</td>
              <td>lolol</td>
              <td>39€</td>
              <td>
                <button>Supprimer</button>
                <br></br>
                <button>Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="ResultSelectAdminMenu">
        <div>Commande</div>

        <input type="text" id="Nom" name="Nom" required></input>

        <input type="text" id="Prenom" name="Prenom" required></input>

        <input type="text" id="Email" name="Email" required></input>

        <input type="text" id="TEL" name="TEL" required></input>
      </div>
    </div>
  );
};

// == Export
export default Orders;
