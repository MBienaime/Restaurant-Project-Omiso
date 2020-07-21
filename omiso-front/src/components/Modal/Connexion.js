// == Import : npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';


// == Import : local
import './styles.css';

// Renome le composant usedispatch de redux;


// == Composant

const Connexion = ({
  showModal, onModalInscription, offModalConnexion, userLogin,
}) => {
  const [auth, setAuth] = useState({ username: '', password: '' });

  // fonctionpour inverse les modal inscription et connxion

  const toggleModal = () => {
    offModalConnexion();
    onModalInscription();
  };
  // capture event clic sur le bouton connexion et envoi le state locale auth, capture par le mildelware logmidelware
  const handleSubmit = (evt) => {
    evt.preventDefault();
    userLogin(auth);
  };

  return (

    <>
      {showModal && (

      <div className="fixed-top div-modal">
        <div className="bg-dark modal-connexion">
          <div className="row justify-content-center">

            <div className="col-12 ">
              <p className="h2 text-white text-right m-4 escape " onClick={() => offModalConnexion()}>X</p>
            </div>

            <form className="col-12  m-7  py-5 rounded  ">
              <div className="row justify-content-center">
                <div className=" border-top border-white  text-center ">
                  <p className="text-center text-white h2">CONNEXION</p>
                </div>

              </div>
              <div className="row justify-content-center">

                <div className="col-12 ">
                  <div className=" my-2 text-center">
                    <input type="emailConnexion" value={auth.username} onChange={(evt) => setAuth({ ...auth, username: evt.target.value })} name="emailConnexion" id="emailConnexion" placeholder="Email" className="col-10 rounded border-0 w-90 p-2" />
                  </div>
                </div>


                <div className="col-12 ">
                  <div className=" text-center">
                    <input type="Password" value={auth.password} onChange={(evt) => setAuth({ ...auth, password: evt.target.value })} name="PasswordConnexion" id="PasswordConnexion" placeholder="Mot de passe" className=" col-10  rounded border-0 w-90 p-2" />
                  </div>

                </div>
              </div>

              <div className="row justify-content-center">
                <div className=" text-center border-bottom border-white pb-3 my-4">
                  <button type="button" className="btn btn-success btn-lg" onClick={(evt) => handleSubmit(evt)}>CONNEXION</button>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className=" ">
                  <a className="text-center text-white createAccount" onClick={() => toggleModal()}>Se créer un compte </a>
                </div>
              </div>
            </form>
          </div>


        </div>
      </div>
      )}
    </>
  );
};

// == Export
export default Connexion;


// validation proptype

Connexion.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onModalInscription: PropTypes.func.isRequired,
  offModalConnexion: PropTypes.func.isRequired,

};
