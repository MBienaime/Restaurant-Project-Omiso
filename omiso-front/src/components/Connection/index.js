import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import { handleUserInscription, handleUserforgetPassword } from './userAPI';

const Connection = ({ checkAuth }) => {
  const history = useHistory();

  const [user, setuser] = useState({
    email: '',
    lastmane: '',
    firstname: '',
    password: '',
    phone_number: '',

	  });

  // API call : login

  const handleUserConnection = (user) => {
    const url = 'https://omiso.com/utilisateur/login';
    axios({
      method: 'post',
      url,
      data: user,
    })
      .then((e) => {
        localStorage.setItem('UserTokenOmiso', e.data.token);
        checkAuth();
      })
      .catch((e) => (console.log(e)));
  };

  const handleInputChange = (e) => setuser({
    ...user,
    [e.currentTarget.name]: e.currentTarget.value,
  });

  const [showPanel, setShowPanel] = useState('right-panel-active');
  const handleClick = () => setShowPanel(' ');
  const Clickhandler = () => setShowPanel('right-panel-active');

  const [showPanelForgetPassword, setshowPanelForgetPassword] = useState('display-none-forget');
  const handleClickForgetPassword_block = () => setshowPanelForgetPassword('display-block-forget ');
  const handleClickForgetPassword_none = () => setshowPanelForgetPassword('display-none-forget ');

  return (
    <div className="modal-main display-block">

      <div className={`modal-forget ${showPanelForgetPassword}`}>
        <div className="modal-main-forget">
          <input
            type="email"
            name="email"
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
            value={user.email}
          />
          <button
            className="container-button"
            onClick={() => {
              handleUserforgetPassword(user); handleClickForgetPassword_none();
            }}
          > Valider
          </button>
        </div>
      </div>

      <div className={`connection-container ${showPanel}`}>
        <div className="form-container sign-up-container">
          <Link to="/" className="close">X</Link>

          <form action="#">
            <h1>Créer un compte</h1>
            <input
              type="text"
              name="lastname"
              onChange={(e) => handleInputChange(e)}
              placeholder="Nom"
              value={user.lastname}
            />

            <input
              type="text"
              name="firstname"
              onChange={(e) => handleInputChange(e)}
              placeholder="Prénom"
              value={user.firstname}
            />

            <input
              type="email"
              name="email"
              onChange={(e) => handleInputChange(e)}
              placeholder="Email"
              value={user.email}
            />

            <input
              type="password"
              name="password"
              onChange={(e) => handleInputChange(e)}
              placeholder="Mots de passe"
              value={user.password}
            />

            <input
              type="tel"
              name="phone_number"
              onChange={(e) => handleInputChange(e)}
              placeholder="Téléphone"
              value={user.phone_number}
            />
            <button
              className="container-button"
              onClick={(evt) => {
                evt.preventDefault(); handleUserInscription(user);
              }}
            >
              Inscription
            </button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <Link to="/" className="close">X</Link>
          <form action="#">
            <h1>Se connecter</h1>
            <input
              type="email"
              name="email"
              onChange={(e) => handleInputChange(e)}
              placeholder="Email"
              value={user.email}
            />

            <input
              type="password"
              name="password"
              onChange={(e) => handleInputChange(e)}
              placeholder="Mots de passe"
              value={user.password}
            />
            <a href="#" onClick={() => handleClickForgetPassword_block()}>Mot de passe oublié ?</a>
            <button
              className="container-button"
              onClick={(evt) => {
                evt.preventDefault(); handleUserConnection(user); history.push('/');
              }}
            >
              Connexion
            </button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bonjour!</h1>
              <p>Cliquez sur le bouton pour vous connecter</p>
              <button className="container-button transparent" onClick={handleClick}>
                Connexion
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bienvenue!</h1>
              <p>Cliquez sur le bouton pour vous inscrire</p>
              <button className="container-button transparent" onClick={Clickhandler}>
                Inscription
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
};

export default Connection;

Connection.propTypes = {
  checkAuth: PropTypes.func.isRequired,
};
