import { connect } from 'react-redux';
import OrderManagementPage from '../components/OrderManagementPage';
import { selectOrder, handleSwitchChange, archivesOrder,handleStatusOrder,receiveOrder } from '../actions';
import { selectDetailOrderById,selectArchiveTrue } from '../reducers/orders';


const mapStateToProps = (state) => ({

  orderList:selectArchiveTrue(state.orders),//state.orders.list,
  SelectOrderIdDetail: selectDetailOrderById(state),
  



});


const mapDispatchToProps = (dispatch) => ({
  selectOrder: (payload) => dispatch(selectOrder(payload)),

  switchChecked: (payload) => {
    dispatch(handleSwitchChange(payload));
  },

  archivesOrder: (payload) => {
    dispatch(archivesOrder(payload));
  },

  handleStatusOrder: (payload) => {
    dispatch(handleStatusOrder(payload));
  },

  receiveOrder: () => {
    dispatch(receiveOrder());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(OrderManagementPage);
