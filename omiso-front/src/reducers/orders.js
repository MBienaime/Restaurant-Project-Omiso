import { SELECT_ORDER, HANDLE_SWITCH_CHANGE, RECEIVE_ORDER_SUCCESS,SEND_ORDERS, HANDLE_STATUS_ORDER } from '../actions';

const initialState = {
  selectStatusOrder: true,
  selectOrderId: 1,
  list:[]
};

const orders = (state = initialState, action = {}) => {
  switch (action.type) {
    case SELECT_ORDER:
      return {
        ...state,
        selectOrderId: action.payload,
      };

    case HANDLE_SWITCH_CHANGE:
      return state;

    case RECEIVE_ORDER_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    case SEND_ORDERS:
      return {
        ...state,
        comments: action.payload,
      };

    case HANDLE_STATUS_ORDER:
      return {
        ...state,
        selectStatusOrder: action.payload,
      };


    default:
      return state;
  }
};

export default orders;


export const selectDetailOrderById = (state) => {
  const filterById = state.orders.list.filter((e) => e.id === state.orders.selectOrderId);

  if (filterById[0] === undefined) {
    return {
      email: '',
      lastname: '',
      firstname: '',
      phoneNumber: '',
      total_price: '',
      comments: '',
      order_products: [],

    };
  }

  return {
    email: filterById[0].client.email,
    lastname: filterById[0].client.lastname,
    firstname: filterById[0].client.firstname,
    phoneNumber: filterById[0].client.phone_number,
    total_price: filterById[0].total_price,
    order_products: filterById[0].orderProducts,
    comments : filterById[0].comments,
  };
};

   
  export const selectArchiveTrue = (state) => (state.list.filter((e)=> e.status ===state.selectStatusOrder));




