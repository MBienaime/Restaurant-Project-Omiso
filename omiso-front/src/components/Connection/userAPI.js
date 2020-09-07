import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';

// API call : Signin
export function handleUserInscription(user) {
  const url = 'https://omiso.com/utilisateur/inscription';
  axios({
	  method: 'post',
	  url,
	  data: user,
  })
    .then((e) => console.log(e))
    .catch((e) => console.log(e));
}

// API call : login
export function handleUserConnection(user) {
  const url = 'https://omiso.com/utilisateur/login';
  axios({
	  method: 'post',
	  url,
	  data: user,
  })
    .then((e) => {
      localStorage.setItem('UserTokenOmiso', e.data.token);
    })
    .catch((e) => ({ connect: false }));
}

// API call : forget-password
export function handleUserforgetPassword(user) {
  const url = 'https://omiso.com/utilisateur/mdp-oublie';
  axios({
	  method: 'put',
	  url,
	  data: user,
  })
    .then((e) => {
      console.log(e);
    })
    .catch((e) => console.log(e));
}

// API call : reset-password
export function handleResetPassword(user) {
  const url = 'https://omiso.com/utilisateur/mdp-reset/:token';
  axios({
	  method: 'get',
	  url,
	  data: user,
  })
    .then((e) => {
      console.log(e);
    })
    .catch((e) => console.log(e));
}
