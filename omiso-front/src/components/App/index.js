/* eslint-disable no-underscore-dangle */
// == Import npm
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

// == Import Style
import "./styles.scss";

// Local imports
import Navigation from "../Navigation";
import Cart from "../Cart";
import Connection from "../Connection";
import AdminPanel from "../AdminPanel/index";
import SectionMenu from "../SectionMenu";
import ProtectedRoute from "./protectedRoute";
import Home from "../Home";

const App = () => {
  //* declaration State*//

  // authentification user
  const [auth, setAuth] = useState({ connect: false, role: "client" });
  // order user
  const [order, setorder] = useState([]);

  //* declaration Function *//

  // function check token for connection
  const checkAuth = () => {
    if (localStorage.getItem("UserTokenOmiso") !== null) {
      const token = localStorage.getItem("UserTokenOmiso");
      axios
        .get("https://omiso.com/utilisateur/verifier-Token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          setAuth({ role: resp.data.role, connect: resp.data.authenticated });
        })
        .catch(() => {
          setAuth({ ...auth, connect: false });
        });
    } else {
      setAuth({ ...auth, connect: false });
    }
  };

  // function deconnected user
  const deconnected = () => {
    localStorage.removeItem("UserTokenOmiso");
    setAuth({ ...auth, connect: false, role: " " });
  };

  // function add Order on state order
  const addOrder = (d) => {
    if (!order.some((e) => e._id === d._id)) {
      setorder([...order, { ...d, quantity: 1 }]);
    } else {
      const newdata = order.map((e) =>
        e._id === d._id ? { ...e, quantity: e.quantity + 1 } : { ...e }
      );
      setorder(newdata);
    }
  };
  // function remove Order on state order
  const RemoveOrder = (d) => {
    if (!order.some((e) => e._id === d._id)) {
      setorder([...order, { ...d, quantity: 1 }]);
    } else {
      const newdata = order.map((e) =>
        e._id === d._id ? { ...e, quantity: e.quantity - 1 } : { ...e }
      );
      setorder(newdata);
    }
  };

  // function selector order menu
  const usefilterorder = order.filter((e) => e.quantity > 0);

  //* Declaration useffect *//
  useEffect(() => checkAuth(), []);

  return (
    <>
      <Navigation auth={auth} deconnected={deconnected} />
      <Switch>
        <Route exact path="/">
          <Home />
          <SectionMenu addOrder={addOrder} />
        </Route>
        <Route path="/Connexion">
          <Connection checkAuth={checkAuth} />
        </Route>
        <Route path="/Panier">
          <Cart
            DataOrder={usefilterorder}
            addOrder={addOrder}
            RemoveOrder={RemoveOrder}
          />
        </Route>
        <ProtectedRoute
          path="/Administration"
          auth={auth}
          component={AdminPanel}
        />
      </Switch>
    </>
  );
};

// == Export compoment
export default App;
