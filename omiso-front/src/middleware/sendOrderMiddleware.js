import axios from 'axios';
import { SEND_ORDERS, onModalConnexion, receiveOrder, ARCHIVES_ORDER, fetchItems,handleChangeComment, receiveOrderSuccess, RECEIVE_ORDER, } from '../actions';
import { selectMenu, sommeCommande,} from '../reducers/etatMenu';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SEND_ORDERS:
      const sendOrder = selectMenu(store.getState());
      const total_price = sommeCommande(store.getState());
        
      const orderValidate = {
      userId: store.getState().etatUser.userId,
      status: true,
      comments: store.getState().etatMenu.comment,
      total_price,
      order_products: sendOrder,
      };   


      axios({
        method: 'post',


        url: 'http://ec2-184-72-98-52.compute-1.amazonaws.com/api/omiso/order/',

        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenOmiso')}`,
        },
        data: orderValidate,
      })
        .then((res) => {

          store.dispatch(fetchItems());
          store.dispatch(handleChangeComment(""));
          alert('Votre commande a été prise en compte, et sera prête dans 30 minutes :)');

        })
        .catch((err) => {
          store.dispatch(onModalConnexion());
          // store.dispatch(onModalConnexion());

        });

      break;

    case RECEIVE_ORDER:       
      axios({
        method: 'get',

        url: 'http://ec2-184-72-98-52.compute-1.amazonaws.com/api/omiso/order/receipt',

        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenOmiso')}`,
        },        
      }).then((res) => {
        // ajouter parametre pour commande
        store.dispatch(receiveOrderSuccess(res.data));
      })
      .catch((err) => {

        }); 

      break;

    case ARCHIVES_ORDER:
  
      axios({
        method: 'put',


        url: `http://ec2-184-72-98-52.compute-1.amazonaws.com/api/omiso/order/receipt/edit/${action.payload}`,


        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenOmiso')}`,
        },        
      })
        .then((res) => {         
          store.dispatch(receiveOrder());
        })
        .catch((err) => {
          // store.dispatch(onModalConnexion());
        });

      break;

    default:
      next(action);
  }
};
