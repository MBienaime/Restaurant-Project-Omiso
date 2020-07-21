// == Import : npm
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import './styles.css';


const OrderValidation = ({ showModal, sendOrders, offModalOrder }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendOrders(comment);
    offModalOrder();
    setComment('');
  };

  return (

    <>

      {showModal && (

      <div className=" div-modal div-modal bg-dark  ">
        <div className="row justify-content-center ">
          <form type="submit" className="form col-10">
            <div className="col-12 modalHeader ">
              <span className="spanX" onClick={() => offModalOrder()}>X</span>
              <label className="row justify-content-center label">Avez vous un commentaire ? </label>
              <p className="row justify-content-center label"> Après validation votre commande sera prête dans 30 minutes, merci de votre confiance </p>
            </div>
            <div className="row justify-content-center">
              <textarea
                rows="5"
                col="70"
                className="textarea"
                value={comment}
                onChange={(e) => setComment((e.target.value))}
              />
            </div>
            <div className="row justify-content-center">
              <button
                className="button-form"
                onClick={(e) => handleSubmit(e)}
              >
              Valider
              </button>
            </div>
          </form>
        </div>
      </div>
      )}

    </>

  );
};


export default OrderValidation;

OrderValidation.propTypes = {
  showModal: PropTypes.bool.isRequired,
  // offModalorder: PropTypes.func.isRequired,
};
