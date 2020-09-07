// == Import npm
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// == Import Style
import './styles.scss';

// Local imports
import Home from '../Home';
import Header from '../Header';
import Cart from '../Cart';
import Connection from '../Connection';
import AdminPanel from '../AdminPanel/index';
import SectionMenu from '../SectionMenu';

const jwt = require('jsonwebtoken');

const App = () => {
  const [useAuth, setAuth] = useState({ connect: false });

  // check connexion and token
  const checkAuth = () => {
    if (localStorage.getItem('UserTokenOmiso') !== null) {
      if (jwt.decode(localStorage.getItem('UserTokenOmiso')).exp > Date.now()) {
        localStorage.removeItem('UserTokenOmiso');
        return ({ ...useAuth, connect: false });
      }
      return ({ ...useAuth, connect: true, role: jwt.decode(localStorage.getItem('UserTokenOmiso')).role });
    }

    return ({ ...useAuth, connect: false });
  };

  const deconnected = () => {
    localStorage.removeItem('UserTokenOmiso');
    setAuth({ ...useAuth, connect: false });
  };

  useEffect(() => (setAuth(checkAuth())), []);

  // order user
  const [useorder, setorder] = useState([]);

  // addorder
  const addOrder = (d) => {
    if (!useorder.some((e) => e._id === d._id)) {
      setorder([...useorder, { ...d, quantity: 1 }]);
    }
    else {
      const newdata = useorder.map((e) => (e._id === d._id ? { ...e, quantity: e.quantity + 1 } : { ...e }));
      setorder(newdata);
    }
  };

  const RemoveOrder = (d) => {
    if (!useorder.some((e) => e._id === d._id)) {
      setorder([...useorder, { ...d, quantity: 1 }]);
    }
    else {
      const newdata = useorder.map((e) => (e._id === d._id ? { ...e, quantity: e.quantity - 1 } : { ...e }));
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
          <Connection />
        </Route>
        <Route path="/Panier">
          <Cart DataOrder={usefilterorder} addOrder={addOrder} RemoveOrder={RemoveOrder} />
        </Route>
        <Route path="/Administration">
          <AdminPanel />
        </Route>

      </Switch>

      {/* <CardMenus/> */ }

    </>

  );
};

// == Export
export default App;
