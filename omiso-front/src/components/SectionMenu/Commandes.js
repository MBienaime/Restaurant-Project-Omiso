
// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import Components
import { useDispatch } from 'react-redux';
import ItemCommande from './ItemCommande';
import { sendOrders, onModalOrder,onModalConnexion } from '../../actions';
import { v4 as uuidv4 } from 'uuid';




import './style.scss';


const Commandes = ({
  list, clicMenu, sommeCommande, validationOrder,userIsLogged,comment,handleChangeComment,
}) => {
  const dispatch = useDispatch();

  return (

    <div className="col-12 col-sm-6">
      <h1 className="text-center titleCommande">Commandes</h1>


      <div className="row justify-content-center">
        <div className="col-10 command">


          {list.map((dat) => (
            <ItemCommande idmenu={dat.id} key={uuidv4()} Title={dat.name} Prix={dat.price} clicMenu={clicMenu} multiplicator={dat.quantity} />
          ))}

        </div>
      </div>
          <div className="row justify-content-center">
        <input className="inputComment col-10 " type="text"
               placeholder="Commentaire sur votre commande (allergies, heure à laquelle vous souhaitez la récupérer..)" 
               value={comment}
               onChange={(e)=>handleChangeComment(e.target.value)}></input>
       
          </div>
      <div className="row justify-content-center">
        <div className="total">Total:

        </div>
        <div className="total">
          {sommeCommande} €

        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-11">

        <button className="btn valid btn-secondary btn-lg btn-block" onClick={() => (dispatch(sendOrders()))}>Valider</button>


        </div>
      </div>

    </div>

  );
};
// == Export
export default Commandes;

Commandes.propTypes = {

  list: PropTypes.array.isRequired,
  clicMenu: PropTypes.func.isRequired,
  sommeCommande: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
