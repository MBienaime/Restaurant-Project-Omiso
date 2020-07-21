// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import SectionMenu from '../../containers/SectionMenu';
import Inscription from '../Modal/Inscription';
import Connexion from '../Modal/Connexion';
import OrderValidation from '../Modal/OrderValidation';
import OrderManagementPage from '../../containers/OrderManagementPage';

// == Import Style
import './styles.scss';

// commande recuperation API
// == Import npm
const App = ({
  fetchItems,
  offModalConnexion,
  onModalInscription,
  offModalInscription,
  offModalOrder,
  userLogin,
  userInscription,
  showModal,
  userIsLogged,
  checkAuthentification,
  sendOrders,
}) => {
  useEffect(fetchItems, []);
 
  useEffect(checkAuthentification, []);

  // systeme de route affichage


  return (
    <div className="app">
      <Header userIsLogged={userIsLogged} />
      <Inscription
        showModal={showModal.showModalInscription}
        offModalInscription={offModalInscription}
        userInscription={userInscription}
      />
      <Connexion
        showModal={showModal.showModalConnexion}
        offModalConnexion={offModalConnexion}
        onModalInscription={onModalInscription}
        userLogin={userLogin}
      />


      {!userIsLogged.isAuthUser && (<Main />)}

      {userIsLogged.isAuthUser ? (
        userIsLogged.role === 'ROLE_EMPLOYEE' ? (
          <OrderManagementPage />
        ) : (
          <SectionMenu />
        )
      ) : (

        <SectionMenu />

      )}

      <OrderValidation showModal={showModal.showModalOrder} offModalOrder={offModalOrder} sendOrders={sendOrders} />


      <Footer userIsLogged={userIsLogged}/>
    </div>

  );
};

App.propsTypes = {
  fetchItems: PropTypes.func.isRequired,
  offModalConnexion: PropTypes.func.isRequired,
  onModalInscription: PropTypes.func.isRequired,
  offModalInscription: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
  receiveOrder: PropTypes.func.isRequired,
  userInscription: PropTypes.func.isRequired,
  showModal: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ]),
};

// == Export
export default App;
