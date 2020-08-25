// == Import npm
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

// == Import Style
import "./styles.css";

const Cart = ({ DataOrder, RemoveOrder, addOrder }) => {
  const [useComment, setComment] = useState("Ici votre commentaire...");

  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const sumOrder = DataOrder.map((e) => e.quantity * e.price)
    .reduce((total, number) => total + number, 0)
    .toFixed(2);

  const PaymentOrder = () => {
    const ListOrder = DataOrder.map((e) => ({
      menu: e._id,
      Number_MenuItem: e.quantity,
    }));
    const Orders = { menus: ListOrder, comment: useComment };
    const token = window.localStorage.getItem("UserTokenOmiso");
    console.log(token);

    Axios.post(
      "https://omiso.com/commande/",
      { Orders },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        console.log(res.data.forwardLink);
        if (res.data.forwardLink) {
          window.location = res.data.forwardLink;
        } else {
          alert("Le paiement a échoué.");
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
                <tr>
                  <td className="checkout-left-table-cell-description">
                    <div>
                      <div className="checkout-left-table-image"></div>
                      <span className="checkout-left-table-title">
                        {order.category}
                      </span>
                      <br></br>
                      {order.name}
                    </div>
                  </td>
                  <td className="checkout-left-table-cell blod">
                    {order.price} €
                  </td>
                  <td className="checkout-left-table-cell blod">
                    <button
                      className="checkout-left-table-buttonm"
                      onClick={() => RemoveOrder(order)}
                    >
                      -
                    </button>
                    {order.quantity}
                    <button
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
              value={useComment}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
        </div>
        <div className="checkout-right">
          <a href="#"> TOTAL A REGLER </a>
          <span className="checkout-right-total">{sumOrder}€</span>

          <button onClick={() => PaymentOrder()}>paiment </button>
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
