import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import Orders from './Orders';
import OrderDetails from './OrderDetails';

//= = Import style
import './style.scss';


// == Component
const OrderManagementPage = ({

  orderList, selectOrder, SelectOrderIdDetail, switchChecked, archivesOrder,handleStatusOrder, receiveOrder,
}) => {
  
  useEffect(receiveOrder,[]);

  return(

  <div className="container container-fluid mt-0">
    <div className="row ">
      <div className="col-12 order-management">
        <div className="  h1 text-center">Réception des commandes</div>
      </div>
      <Orders orderList={orderList} select={selectOrder} switchChecked={switchChecked} archivesOrder={archivesOrder} handleStatusOrder={handleStatusOrder}/>
      <OrderDetails SelectOrderIdDetail={SelectOrderIdDetail} />
    </div>
  </div>
);};


export default OrderManagementPage;

OrderManagementPage.propTypes = {
  orderList: PropTypes.array.isRequired,
  selectOrder: PropTypes.func.isRequired,
  SelectOrderIdDetail: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]),
};
