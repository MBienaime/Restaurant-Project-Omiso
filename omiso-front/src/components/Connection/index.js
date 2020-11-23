/* eslint-disable no-shadow */
import React, { useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import PropTypes from "prop-types";

const Connection = ({ checkAuth }) => {
  //* declaration State *//

  // State User
  const [user, setuser] = useState({
    email: "",
    lastmane: "",
    firstname: "",
    password: "",
    phone_number: "",
  });

  // State showpanel active connection
  const [showPanel, setShowPanel] = useState("right-panel-active");
  // State show modal forget password
  const [showPanelForgetPassword, setshowPanelForgetPassword] = useState(
    "display-none-forget"
  );

  //* declaration function *//
  const history = useHistory();
  const handleClick = () => setShowPanel(" ");
  const Clickhandler = () => setShowPanel("right-panel-active");
  const handleClickForgetPasswordBlock = () =>
    setshowPanelForgetPassword("display-block-forget ");
  const handleClickForgetPasswordNone = () =>
    setshowPanelForgetPassword("display-none-forget ");
  const handleInputChange = (e) =>
    setuser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  // API call : login
  const handleUserConnection = (user) => {
    const url = "https://omiso.com/utilisateur/login";
    axios({
      method: "post",
      url,
      data: user,
    })
      .then((e) => {
        localStorage.setItem("UserTokenOmiso", e.data.token);
        checkAuth();
        history.push("/");
      })
      .catch((e) => console.log(e));
  };

  // API call : Signin
  const handleUserRegistration = (user) => {
    const url = "https://omiso.com/utilisateur/inscription";
    axios({
      method: "post",
      url,
      data: user,
    })
      .then((e) => {
        console.log(e);
        handleClick();
      })
      .catch((e) => console.log(e));
  };

  // API call : forget-password
  const handleUserforgetPassword = (user) => {
    const url = "https://omiso.com/utilisateur/mdp-oublie";
    axios({
      method: "put",
      url,
      data: user,
    })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="modal">
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
              type="button"
              className="container-button"
              onClick={() => {
                handleUserforgetPassword(user);
                handleClickForgetPasswordNone();
              }}
            >
              {" "}
              Valider
            </button>
          </div>
        </div>

        <div className={`connection-container ${showPanel}`}>
          <div className="form-container sign-up-container">
            <Link to="/" className="close">
              X
            </Link>

            <form action="#">
              <h1>Créer un compte</h1>
              <input
                type="text"
                name="lastname"
                onChange={(e) => handleInputChange(e)}
                placeholder="Prénom"
                value={user.lastname}
              />

              <input
                type="text"
                name="firstname"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nom"
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
                type="button"
                className="container-button"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleUserRegistration(user);
                }}
              >
                Inscription
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <Link to="/" className="close">
              X
            </Link>
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
              <a href="#" onClick={() => handleClickForgetPasswordBlock()}>
                Mot de passe oublié ?
              </a>
              <button
                type="button"
                className="container-button"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleUserConnection(user);
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
                <button
                  type="button"
                  className="container-button transparent"
                  onClick={handleClick}
                >
                  Connexion
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Bienvenue!</h1>
                <p>Cliquez sur le bouton pour vous inscrire</p>
                <button
                  type="button"
                  className="container-button transparent"
                  onClick={Clickhandler}
                >
                  Inscription
                </button>
              </div>
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
