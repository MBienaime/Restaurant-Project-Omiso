import { connect } from 'react-redux';
import App from '../components/App';

import {
  fetchItems,
  offModalConnexion,
  onModalInscription,
  offModalInscription,
  onModalConnexion,
  userLogin,
  userInscription,
  onModalOrder,
  offModalOrder,
  receiveOrder,
  loggedOut,
  checkAuthentification,
  sendOrders,
} from '../actions';


const mapStateToProps = (state) => ({
  showModal: state.etatModal,
  userIsLogged: state.etatUser,
  receiveOrder,

});

const mapDispatchToProps = (dispatch) => ({

  sendOrders: (payload) => {
    dispatch(sendOrders(payload));
  },

  checkAuthentification: () => {
    dispatch(checkAuthentification());
  },

  receiveOrder: () => {
    dispatch(receiveOrder());
  },

  fetchItems: () => {
    dispatch(fetchItems());
  },
  offModalConnexion: () => {
    dispatch(offModalConnexion());
  },
  onModalInscription: () => {
    dispatch(onModalInscription());
  },
  offModalInscription: () => {
    dispatch(offModalInscription());
  },
  onModalConnexion: () => {
    dispatch(onModalConnexion());
  },
  userLogin: (payload) => {
    dispatch(userLogin(payload));
  },
  userLogout: () => {
    dispatch(loggedOut(payload));
  },
  userInscription: (payload) => {
    dispatch(userInscription(payload));
  },
  onModalOrder: () => {
    dispatch(onModalOrder());
  },
  offModalOrder: () => {
    dispatch(offModalOrder());
  },


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
