import { CONNECTION_SUCCESS, LOGOUT_SUCCESS } from '../actions';


const initialState = {
  email: ' ',
  role: ' ',
  isAuthUser: false,
  userId: ' ',
};

const etatUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case CONNECTION_SUCCESS:
      return action.payload;

    case LOGOUT_SUCCESS:
      return {};

    default:
      return state;
  }
};

export default etatUser;
