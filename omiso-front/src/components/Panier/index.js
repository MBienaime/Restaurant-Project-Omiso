// == Import npm
import React from 'react';


// == Import Style
import './styles.css';

// commande recuperation API
// == Import npm
const Panier = () =>(
  <div className="checkout">
    <div className="checkout-left">
      
        <table className="checkout-left-table">
        <thead>
            <tr>
              <th className="checkout-left-table-cell">Produit</th>
              <th className="checkout-left-table-cell">Prix</th>
              <th className="checkout-left-table-cell">Quantité</th>
              <th className="checkout-left-table-cell">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkout-left-table-cell-description">
                <div>
                  <div className="checkout-left-table-image"></div>
                  <span className="checkout-left-table-title">plats</span><br></br>
                  Ici le nom du plats              
                </div> 
              </td>
              <td className="checkout-left-table-cell blod">15 €</td>
              <td className="checkout-left-table-cell blod">
                <button className="checkout-left-table-buttonm">-</button>
                  2 
                <button className="checkout-left-table-buttonp">+</button>
                </td>
              <td className="checkout-left-table-cell blod">30€</td>
            </tr>

            <tr>
              <td className="checkout-left-table-cell">
                <div>
                  <div className="checkout-left-table-image">
                    
                  </div>
                  <span className="checkout-left-table-title">Dessert</span><br></br>
                  Ici le nom du plats              
                </div> 
              </td>
              <td className="checkout-left-table-cell">15 €</td>
              <td className="checkout-left-table-cell">
              <button>-</button>
                  2 
                <button>+</button>
                </td>
              <td className="checkout-left-table-cell">30€</td>
            </tr>

            <tr>
              <td className="checkout-left-table-cell">
                <div>
                  <div className="checkout-left-table-image">
                    
                  </div>
                  <span className="checkout-left-table-title">Entree</span><br></br>
                  Ici le nom du plats              
                </div> 
              </td>
              <td className="checkout-left-table-cell">15 €</td>
              <td className="checkout-left-table-cell"> 
                <button>-</button>
                  2 
                <button>+</button></td>
              <td className="checkout-left-table-cell">30€</td>
            </tr>
          </tbody>

        </table>


      
      <div className="checkout-left-comment">        
          Ajouter un Commentaire        
        <input className="checkout-left-input">
        </input>
      </div>
    </div >
    <div className="checkout-right">
      <a href="#"> TOTAL A REGLER </a>
      <span className="checkout-right-total">33€</span>
      <button className="checkout-right-button">
        VALIDER
      </button>
    </div>
  </div> 
)

// == Export
export default Panier;