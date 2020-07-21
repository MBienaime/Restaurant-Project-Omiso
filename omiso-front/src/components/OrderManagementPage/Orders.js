import React from 'react';
import PropTypes from 'prop-types';
import { FaArchive } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
moment.locale('fr');

import './style.scss';

const Orders = ({
  orderList, select, archivesOrder, handleStatusOrder}) => {

   
  return(
  <div className=" col-12 col-sm-6 bg-white borderOrder">
    <div className="  h2 order-title text-center p-3">Commandes</div>
      <ul className="row">
        <div className= "d-flex justify-content-between col-12 text-center">
          <li className="col-6">
            <button className="button-items buttonArchive" type="button" onClick={()=>(handleStatusOrder(true))}>
              En cours

            </button>
          </li>
          <li className="col-6">
            <button className="button-items buttonArchive " type="button" onClick= {()=>(handleStatusOrder(false))}>
              Archivée
            </button>
          </li>
        </div>
      </ul>
    <div className="lists mt-1">
      {orderList.map((order) => (
        <div
          className="list"
          key={uuidv4()}
          onClick={() => (select(order.id))}
        >
          <div className=" order">

            <div className="row d-flex justify-content-between text-light bg-dark">
              <div className="col-5">Client:</div>
              <div className="col-1">N°:</div>
              <div className="col-5">Date:</div>
              <div className="col-1"></div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col-5">
                {`${order.client.firstname}  ${order.client.lastname}`}
              </div>
              <div className="col-1">
                {`${order.id}`}
              </div>
              <div className="col-5">
                {moment(order.created_at).format('LLL')}
              </div>
              <div className="minus col-1 ">
                <FaArchive onClick={() => (archivesOrder(order.id))} />
              </div>
            </div>

          </div>
        </div>
      ))}


    </div>
  </div>
)};

// == Export
export default Orders;

Orders.propTypes = {

  orderList: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,

};
