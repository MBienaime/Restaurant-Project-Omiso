import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_ERROR,
  INCREMENT_ORDER,
  DECREMENT_MENU,
} from '../actions';


const initialState = {
  list: [],
};

const datasMenus = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        list: [...action.payload],
        error: false,
      };
    case FETCH_ITEMS_ERROR:
      return {
        ...state,
        list: [],
        error: true,
      };
    case INCREMENT_ORDER:
      const newstate = state.list.map((item) => ((item.id === action.payload) ? ({ ...item, quantity: item.quantity + 1 }) : ({ ...item })));
      return {
        ...state,
        list: newstate,
      };
    case DECREMENT_MENU:
      const newdstate = state.list.map((item) => ((item.id === action.payload) ? ({ ...item, quantity: item.quantity - 1 }) : ({ ...item })));
      return {
        ...state,
        list: newdstate,
      };
    default:
      return state;
  }
};

export default datasMenus;
