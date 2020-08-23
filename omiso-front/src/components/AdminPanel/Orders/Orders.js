// == Import npm
import React from 'react';



// == Import Style
import './styles.css';

// Local imports 

const Orders = () => {

return(
    <div className="sectionAdminMenu">
    
    <div className="fetchAdminMenu">

    <table >
          <thead>
              <tr>
                <th >Commande</th>
                <th >TEL</th>
                <th >Email</th>
                <th >Total</th>
                <th >Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td >                  
                   sgds546
                </td>
                <td >
                    06525214
                </td>
                <td>
                    jean.dupont@gmail.com
                </td>
                <td >
                   39€
                </td>
                <td >
                <button>Supprimer</button><br></br>
                    <button>Update</button>
                </td>

              </tr>    


  
            </tbody>

          </table>

        


    </div>
    <div className="ResultSelectAdminMenu">
        <div>Commande</div>
        <label for="Nom">Nom</label>
        <input type="text" id="Nom" name="Nom" required></input>
        <label for="Prenom">Prenom</label>
        <input type="text" id="Prenom" name="Prenom" required></input>
        <label for="prix">Email</label>
        <input type="text" id="Email" name="Email" required></input>
        <label for="TEL">TEL</label>
        <input type="text" id="TEL" name="TEL" required></input>      
        
    </div>
</div>
    
)};


// == Export
export default Orders;