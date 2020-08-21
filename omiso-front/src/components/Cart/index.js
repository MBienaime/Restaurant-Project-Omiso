// == Import npm
import React, { useEffect,  } from "react";

// == Import Style
import "./styles.css";

const Cart = ({ hideModalCart, DataOrder, RemoveOrder, addOrder }) => {

const sumOrder = DataOrder.map((e) => e.quantity*e.price).reduce((totale, number) => totale + number, 0).toFixed(2);


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

{ DataOrder.map((order)=>(          
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
                  <button className="checkout-left-table-buttonm" onClick={()=>(RemoveOrder(order))}>-</button>
                  {order.quantity}
                  <button className="checkout-left-table-buttonp" onClick={()=>(addOrder(order))}>+</button>
                </td>
                <td className="checkout-left-table-cell blod">{order.price*order.quantity}€</td>
              </tr>


)
)

}
            </tbody>
          </table>

          <div className="checkout-left-comment">
            Ajouter un Commentaire
            <input className="checkout-left-input"></input>
          </div>
        </div>
        <div className="checkout-right">
          <a href="#"> TOTAL A REGLER </a>
          <span className="checkout-right-total">{sumOrder}€</span>
          <button className="checkout-right-button">Payer</button>
        </div>
        <button onClick={() => hideModalCart()}>X</button>
      </div>
    </div>
  );
};

// == Export
export default Cart;
