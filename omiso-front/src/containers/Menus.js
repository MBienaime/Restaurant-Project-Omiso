
import { connect } from 'react-redux';
import Menus from '../components/SectionMenu/Menus';
import { choixMenu, increment} from '../actions';
import { categoryList } from '../reducers/etatMenu';


const mapStateToProps = (state) => 

({ list: categoryList(state),
   });


const mapDispatchToProps = (dispatch) => ({
  menu: (payload) => {
    dispatch(choixMenu(payload));
  },
  clicMenu: (payload) => {
    dispatch(increment(payload));
  },

});


export default connect(mapStateToProps, mapDispatchToProps)(Menus);
