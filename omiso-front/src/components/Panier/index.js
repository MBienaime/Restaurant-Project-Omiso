// == Import npm
import React from 'react';


// == Import Style
import './styles.css';

// commande recuperation API
// == Import npm
const Panier = () =>(
  <div className="commande">
    <div className="titre_commande">
      Commande
    </div>

{/// 
}      
      <div className="item_commande">
        <div className="item_commande_titre">
          Shusi legume + poisson
        </div>
        <div className="item_commande_detail">
          <div className="item_commande_quantity">
            x 9
          </div>
          <div className="item_commande_price">
            6€
          </div>
        </div>
      </div>

      <div className="item_commande">
        <div className="item_commande_titre">
          Shusi legume + poisson
        </div>
        <div className="item_commande_detail">
          <div className="item_commande_quantity">
            x 9
          </div>
          <div className="item_commande_price">
            6€
          </div>
        </div>
      </div>


      <div className="item_commande">
        <div className="item_commande_titre">
          Shusi legume + poisson
        </div>
        <div className="item_commande_detail">
          <div className="item_commande_quantity">
            x 9
          </div>
          <div className="item_commande_price">
            6€
          </div>
        </div>
      </div>


      <div className="item_commande">
        <div className="item_commande_titre">
          Shusi legume + poisson
        </div>
        <div className="item_commande_detail">
          <div className="item_commande_quantity">
            x 9
          </div>
          <div className="item_commande_price">
            6€
          </div>
        </div>
      </div>
{/// 
}
      <div className="totale_commande">
        <div className="totale_commande_titre">
          Totale :
        </div>
        <div className="totale_commande_prix">
          24€
        </div>        
      </div>
      <button className="Commande_button">
        Paiement
      </button>

  </div>
)

// == Export
export default Panier;