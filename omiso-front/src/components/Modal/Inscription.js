// == Import : npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';


// == Import : local
import './styles.css';


// == Composant

const Inscription = ({ showModal, offModalInscription, userInscription }) => {
  const [inscription, setInscription] = useState({
    email: '',
    lastname: '',
    firstname: '',
    phone_number: '',
    address: '',
    postal_code: '',
    city: '',
    password: '',
    password2: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    userInscription(inscription);
    return false
  };


  return (
    <>
      {showModal && (
      <div className="div-modal-signup ">
        <div className="row bg-dark rounded justify-content-center">


          <div className="col-12 ">
            <p className="h2 text-white text-right m-2 escape " onClick={() => offModalInscription()}>X</p>
          </div>


          <form className="text-center col-12  py-5" onSubmit={(e) => (handleSubmit(e))}>

            <div className="row mt-4 justify-content-center">
              <div className=" col-6 text-center my-2 h2 text-white  pb-3 border-top border-white">
          Inscription
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center mb-3">
                <input required type="email" name="emailInscription" id="emailInscription" value={inscription.email} placeholder="Email" onChange={(evt) => setInscription({ ...inscription, email: evt.target.value })} className=" rounded border-0  mw-90 w-100 p-3" />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center mb-3">
                <input required type="text" name="lastname" id="lastname" placeholder="Nom" value={inscription.lastname} onChange={(evt) => setInscription({ ...inscription, lastname: evt.target.value })} className="  rounded border-0 mw-90 w-100 p-3" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center mb-3">
                <input required type="text" name="firstname" id="firstname" placeholder="Prenom" value={inscription.firstname} onChange={(evt) => setInscription({ ...inscription, firstname: evt.target.value })} className="  rounded border-0 mw-90 w-100 p-3" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center mb-3">
                <input required type="tel" name="phone_number" id="phone_number" value={inscription.phone_number} placeholder="Numero de telephone" onChange={(evt) => setInscription({ ...inscription, phone_number: evt.target.value })} className="  rounded border-0 mw-90 w-100 p-3" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center mb-3">
                <input required type="text" name="address" id="address" value={inscription.address} onChange={(evt) => setInscription({ ...inscription, address: evt.target.value })} placeholder="Adresse" className=" rounded border-0 mw-90 w-100 p-3" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center mb-3">
                <input required type="text" name="postal_code" id="postal_code" value={inscription.postal_code} onChange={(evt) => setInscription({ ...inscription, postal_code: evt.target.value })} placeholder="Code Postal" className="  rounded border-0 mw-90 w-100 p-3" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center mb-5">
                <input required type="text" name="city" id="city" placeholder="Ville" value={inscription.city} onChange={(evt) => setInscription({ ...inscription, city: evt.target.value })} className=" rounded border-0 mw-90 w-100 p-3" />
              </div>
            </div>


            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center mb-3">
                <input type="password" name="password" id="password" onChange={(evt) => setInscription({ ...inscription, password: evt.target.value })} placeholder="Mot de Passe" value={inscription.password} className="  rounded border-0 mw-90 w-100 p-3" />

              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center mb-3">
                <input type="Password" name="password2" id="password2" onChange={(evt) => setInscription({ ...inscription, password2: evt.target.value })} placeholder="Confirmer Mot de passe" className="  rounded border-0 mw-90 w-100 p-3" />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center text-white mb-3">
                {((inscription.password === inscription.password2) ? (<br />) : (<p>Votre mot de passe n'est pas identique </p>))}
              </div>
            </div>

            <div className="row justify-content-center ">
              <div className="col-6 text-center border-bottom border-white pb-3 my-4 ">

                {(inscription.password === inscription.password2 && inscription.password2.length !== 0) ? (<input type="submit" value="Inscription" className="btn btn-success btn-lg" />) : (<input type="submit" value="Inscription" className="btn btn-success btn-lg" disabled />)}

              </div>
            </div>
          </form>


        </div>
      </div>
      )}

    </>
  );
};
// == Export
export default Inscription;
// validation proptype

Inscription.propTypes = {
  showModal: PropTypes.bool.isRequired,
  offModalInscription: PropTypes.func.isRequired,
  userInscription: PropTypes.func.isRequired,
};
