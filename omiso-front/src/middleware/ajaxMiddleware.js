import axios from 'axios';

import {
  FETCH_ITEMS, fetchItemsSuccess, 
} from '../actions';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_ITEMS:



      axios.get('http://ec2-184-72-98-52.compute-1.amazonaws.com/api/omiso/products')


        .then((res) => {
          // ajouter parametre pour commande
          const addstate = res.data.map((d) => ({ ...d, quantity: 0 }));


          store.dispatch(fetchItemsSuccess(addstate));
        })
        .catch((err) => {

        });

    default:
      next(action);
  }
};
