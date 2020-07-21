import { connect } from 'react-redux';
import Commandes from '../components/SectionMenu/Commandes';
import { choixMenu, increment, decrement, sendOrders, handleChangeComment  } from '../actions';
import { selectMenu, sommeCommande} from '../reducers/etatMenu';


const mapStateToProps = (state) =>

  ({
    list: selectMenu(state),
    sommeCommande: sommeCommande(state),
    userIsLogged: state.etatUser,
    comment:state.etatMenu.comment,

  });


const mapDispatchToProps = (dispatch) => ({

  validationOrder: () => {
    dispatch(sendOrders());
  },

  clicMenu: (payload) => {
    dispatch(decrement(payload));
  },

  handleChangeComment: (payload)=>{
    dispatch(handleChangeComment(payload))
  },

 

});


export default connect(mapStateToProps, mapDispatchToProps)(Commandes);
