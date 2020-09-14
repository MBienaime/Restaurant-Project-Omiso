/* eslint-disable no-underscore-dangle */
// == Import npm
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

// == Import Style
import './styles.scss';

// Local imports
import Home from '../Home';
import Header from '../Header';
import Cart from '../Cart';
import Connection from '../Connection';
import AdminPanel from '../AdminPanel/index';
import SectionMenu from '../SectionMenu';
import ProtectedRoute from '../ProtectedRoute';

const jwt = require('jsonwebtoken');

const App = () => {
  const [useAuth, setAuth] = useState({ connect: false, role: 'client' });

  // check connexion and token
  const checkAuth = () => {
    if (localStorage.getItem('UserTokenOmiso') !== null) {
      const token = localStorage.getItem('UserTokenOmiso');
      axios.get('https://omiso.com/utilisateur/verifier-Token',
        { headers: { Authorization: `Bearer ${token}` } })
        .then((resp) => {
          setAuth({ role: resp.data.role, connect: resp.data.authenticated });
        })
        .catch(() => {
          setAuth({ ...useAuth, connect: false });
        });
    }
    else {
      setAuth({ ...useAuth, connect: false });
    }
  };

  const deconnected = () => {
    localStorage.removeItem('UserTokenOmiso');
    setAuth({ ...useAuth, connect: false, role: ' ' });
  };

  useEffect(() => checkAuth(), []);

  // order user
  const [useorder, setorder] = useState([]);

  // addOrder
  const addOrder = (d) => {
    if (!useorder.some((e) => e._id === d._id)) {
      setorder([...useorder, { ...d, quantity: 1 }]);
    }
    else {
      const newdata = useorder.map(
        (e) => (e._id === d._id ? { ...e, quantity: e.quantity + 1 } : { ...e }),
      );
      setorder(newdata);
    }
  };
  // removeOrder
  const RemoveOrder = (d) => {
    if (!useorder.some((e) => e._id === d._id)) {
      setorder([...useorder, { ...d, quantity: 1 }]);
    }
    else {
      const newdata = useorder.map(
        (e) => (e._id === d._id ? { ...e, quantity: e.quantity - 1 } : { ...e }),
      );
      setorder(newdata);
    }
  };

  // selector order menu
  const usefilterorder = useorder.filter((e) => e.quantity > 0);

  return (
    <>
      <Header useAuth={useAuth} deconnected={deconnected} />
      <Home />
      <Switch>
        <Route exact path="/">
          <SectionMenu addOrder={addOrder} />
        </Route>
        <Route path="/Connexion">
          <Connection checkAuth={checkAuth} />
        </Route>
        <Route path="/Panier">
          <Cart DataOrder={usefilterorder} addOrder={addOrder} RemoveOrder={RemoveOrder} />
        </Route>
        <ProtectedRoute path="/Administration" useAuth={useAuth} component={AdminPanel} />
      </Switch>

      {/* <CardMenus/> */ }

    </>

  );
};

// == Export
export default App;
