// == Import npm
import React from 'react';



// == Import Style
import './styles.css';

// Local imports 

const Users = () => {

return(



<div className="sectionAdminMenu">
    
    <div className="fetchAdminMenu">

    <table >
          <thead>
              <tr>
                <th >Nom</th>
                <th >Prenom</th>
                <th >Email</th>
                <th >TEL</th>
                <th >Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td >                  
                   jean
                </td>
                <td >
                    dupont
                </td>
                <td>
                    jean.dupont@gmail.com
                </td>
                <td >
                    05260525
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
        <div>Utilisateur</div>
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
export default Users;