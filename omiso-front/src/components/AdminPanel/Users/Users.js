// == Import npm
import React,{useState, useEffect} from 'react';
import axios from 'axios';



// == Import Style
import './styles.css';

// Local imports 

const Users = () => {

  const [useDataUsers, setDataUsers] = useState([ ]);  

  //API call data menu
  const getApiDataUsers = () =>{

    const url = `https://omiso.com/utilisateur/`;
        axios.get(url)
        .then((resp) => {            
          setDataUsers(resp)
        })
        .catch((error) => {
          console.log('error', error);
        });  
      };
      
      //getting menu data
      useEffect(getApiDataUsers, []) ;
      

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
        
        <input type="text" id="Nom" name="Nom" required></input>
       
        <input type="text" id="Prenom" name="Prenom" required></input>
        
        <input type="text" id="Email" name="Email" required></input>
        
        <input type="text" id="TEL" name="TEL" required></input>      
    
    </div>
</div>



)};


// == Export
export default Users;