// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// Import Style
import './style.scss';

// == Component
const OrderDetails = ({ SelectOrderIdDetail }) => {

  return(
  <div className=" col-12 col-sm-6 bg-white divCommande borderOrder">
    <div className=" h2 text-center">Details Commandes</div>
    <div className="client-details border border-dange">
      <p>Nom :  {SelectOrderIdDetail.firstname }</p>
      <p>Prenom :  { SelectOrderIdDetail.lastname}</p>
      <p>Tél : {SelectOrderIdDetail.phoneNumber }</p>
      <p> Email : { SelectOrderIdDetail.email}</p>
      <p> Commentaire : { SelectOrderIdDetail.comments }</p>
    </div>
    <p className="h4">Commande</p>


    { SelectOrderIdDetail.order_products.map((e) => (<p key={uuidv4()}>{e.product.name}</p>)) }

    <div className="row justify-content-center">
      <div className="total col-8 border-top text-right ">Total: {SelectOrderIdDetail.total_price} € TTC</div>
    </div>
  </div>
);
  };

// == Export
export default OrderDetails;

OrderDetails.propTypes = {
  SelectOrderIdDetail: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]),
};
