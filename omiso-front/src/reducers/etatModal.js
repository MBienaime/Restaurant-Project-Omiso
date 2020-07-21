
import {
  ON_MODAL_CONNEXION, ON_MODAL_INSCRIPTION, OFF_MODAL_CONNEXION, OFF_MODAL_INSCRIPTION, ON_MODAL_ORDER, OFF_MODAL_ORDER,
} from '../actions';

// import datatest from '../components/datatest/datatest';

const initialState = {
  showModalConnexion: false,
  showModalInscription: false,
  showModalOrder: false,
};

const etatModal = (state = initialState, action = {}) => {
  switch (action.type) {

    case ON_MODAL_CONNEXION:
      return {
        ...state,
        showModalConnexion: true,
      };
    case ON_MODAL_INSCRIPTION:
      return {
        ...state,
        showModalInscription: true,
      };
    case OFF_MODAL_CONNEXION:
      return {
        ...state,
        showModalConnexion: false,
      };
    case OFF_MODAL_INSCRIPTION:
      return {
        ...state,
        showModalInscription: false,
      };
    case ON_MODAL_ORDER:
      return {
        ...state,
        showModalOrder: true,
      };
    case OFF_MODAL_ORDER:
      return {
        ...state,
        showModalOrder: false,
      };

    default:
      return state;
  }
};

export default etatModal;
