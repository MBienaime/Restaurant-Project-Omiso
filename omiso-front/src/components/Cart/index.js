/* eslint-disable no-underscore-dangle */
// == Import npm
import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

// == Import Style
import './styles.css';

const Cart = ({ DataOrder, RemoveOrder, addOrder }) => {
  //* declaration State *//

  // state comment
  const [comment, setComment] = useState('Ici votre commentaire...');

  //* declaration fucntion *//

  // function handle change comment
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  // function sum order for views cart
  const sumOrder = DataOrder.map((e) => e.quantity * e.price)
    .reduce((total, number) => total + number, 0)
    .toFixed(2);

  // function call to api (axios)
  const PaymentOrder = () => {
    const ListOrder = DataOrder.map((e) => ({
      menu: e._id,
      Number_MenuItem: e.quantity,
    }));
    const Orders = { menus: ListOrder, comment };
    const token = window.localStorage.getItem('UserTokenOmiso');

    Axios.post(
      'https://omiso.com/commande/',
      { Orders },
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then((res) => {
        if (res.data.forwardLink) {
          window.location = res.data.forwardLink;
        }
        else {
          alert('Le paiement a échoué.');
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="modal display-block">
      <div className="checkout modal-main">
        <div className="checkout-left">
          <table className="checkout-left-table">
            <thead>
              <tr>
                <th className="checkout-left-table-cell">Produit</th>
                <th className="checkout-left-table-cell">Prix</th>
                <th className="checkout-left-table-cell">Quantité</th>
                <th className="checkout-left-table-cell">Total</th>
              </tr>
            </thead>
            <tbody>
              {DataOrder.map((order) => (
                <tr key={uuidv4()}>
                  <td className="checkout-left-table-cell-description">
                    <div>
                      <div className="checkout-left-table-image" />
                      <span className="checkout-left-table-title">
                        {order.category}
                      </span>
                      <br />
                      {order.name}
                    </div>
                  </td>
                  <td className="checkout-left-table-cell blod">
                    {order.price} €
                  </td>
                  <td className="checkout-left-table-cell blod">
                    <button
                      type="button"
                      className="checkout-left-table-buttonm"
                      onClick={() => RemoveOrder(order)}
                    >
                      -
                    </button>
                    {order.quantity}
                    <button
                      type="button"
                      className="checkout-left-table-buttonp"
                      onClick={() => addOrder(order)}
                    >
                      +
                    </button>
                  </td>
                  <td className="checkout-left-table-cell blod">
                    {order.price * order.quantity}€
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="checkout-left-comment">
            Ajouter un Commentaire
            <input
              className="checkout-left-input"
              value={comment}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="checkout-right">
          <a href="#"> TOTAL A REGLER </a>
          <span className="checkout-right-total">{sumOrder}€</span>

          <button type="button" onClick={() => PaymentOrder()}>paiment </button>
        </div>
        <Link to="/" className="close">
          X
        </Link>
      </div>
    </div>
  );
};

// == Export
export default Cart;

Cart.propTypes = {
  DataOrder: PropTypes.array.isRequired,
  RemoveOrder: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired,
};
