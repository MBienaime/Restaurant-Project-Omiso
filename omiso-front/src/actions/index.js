export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';
export const CHOIX_MENU = 'CHOIX_MENU';
export const INCREMENT_ORDER = 'INCREMENT_ORDER';
export const DECREMENT_MENU = 'DECREMENT_MENU';
export const ON_MODAL_CONNEXION = 'ON_MODAL_CONNEXION';
export const ON_MODAL_INSCRIPTION = 'ON_MODAL_INSCRIPTION';
export const OFF_MODAL_CONNEXION = 'OFF_MODAL_CONNEXION';
export const OFF_MODAL_INSCRIPTION = 'OFF_MODAL_INSCRIPTION';
export const CHECK_AUTHENTIFICATION = 'CHECK_AUTHENTIFICATION';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_INSCRIPTION = 'USER_INSCRIPTION';
export const ON_MODAL_ORDER = 'ON_MODAL_ORDER';
export const OFF_MODAL_ORDER = 'OFF_MODAL_ORDER';
export const SELECT_ORDER = 'SELECT_ORDER';
export const HANDLE_SWITCH_CHANGE = 'HANDLE_SWITCH_CHANGE';
export const SEND_ORDERS = 'SEND_ORDERS';
// export const VALIDATION_ORDER = 'VALIDATION_ORDER';
export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS';
export const ARCHIVES_ORDER = 'ARCHIVES_ORDER';
export const RECEIVE_ORDER = 'RECEIVE_ORDER';
export const RECEIVE_ORDER_SUCCESS = 'RECEIVE_ORDER_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const HANDLE_STATUS_ORDER = 'HANDLE_STATUS_ORDER';
export const HANDLE_CHANGE_COMMENT ='HANDLE_CHANGE_COMMENT';





export const handleChangeComment = (payload)=>({
  type: HANDLE_CHANGE_COMMENT,
  payload,
});


export const handleStatusOrder = (payload) => ({
  type: HANDLE_STATUS_ORDER,
  payload,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});


export const checkAuthentification = () => ({
  type: CHECK_AUTHENTIFICATION,

});

export const loggedOut = (payload) => ({
  type: LOGOUT,
  payload,
});


export const receiveOrderSuccess = (payload) => ({
  type: RECEIVE_ORDER_SUCCESS,
  payload,
});


export const receiveOrder = (payload) => ({
  type: RECEIVE_ORDER,
  payload,
});

export const archivesOrder = (payload) => (
  {
    type: ARCHIVES_ORDER,
    payload,

  });

export const connectionSuccess = (payload) => (
  {
    type: CONNECTION_SUCCESS,
    payload,

  });

// eXport const validationOrder = () => ({})

export const sendOrders = (payload) => ({

  type: SEND_ORDERS,
  payload,
});

export const handleSwitchChange = (payload) => ({
  type: HANDLE_SWITCH_CHANGE,
  payload,
});


export const onModalOrder = () => ({
  type: ON_MODAL_ORDER,
});

export const offModalOrder = () => ({
  type: OFF_MODAL_ORDER,
});


export const fetchItemsSuccess = (payload) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload,
});

export const fetchItemsError = () => ({
  type: FETCH_ITEMS_ERROR,
});

export const fetchItems = () => ({
  type: FETCH_ITEMS,
});

export const choixMenu = (payload) => ({
  type: CHOIX_MENU,
  payload,
});

// Incremente et decremente l'item cible (quantity)
export const increment = (payload) => ({
  type: INCREMENT_ORDER,
  payload,
});

export const decrement = (payload) => ({
  type: DECREMENT_MENU,
  payload,
});

// action  pour activer/desactiver modal Inscriton ou Connexion

export const onModalConnexion = () => ({
  type: ON_MODAL_CONNEXION,

});

export const onModalInscription = () => ({
  type: ON_MODAL_INSCRIPTION,

});
export const offModalConnexion = () => ({
  type: OFF_MODAL_CONNEXION,

});

export const offModalInscription = () => ({
  type: OFF_MODAL_INSCRIPTION,

});

// action recuperé par le midelware logMiddelware

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const userInscription = (payload) => ({
  type: USER_INSCRIPTION,
  payload,
});

export const selectOrder = (payload) => ({
  type: SELECT_ORDER,
  payload,

});
