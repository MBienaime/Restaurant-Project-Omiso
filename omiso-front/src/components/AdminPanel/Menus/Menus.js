// == Import npm
import React,{useState, useEffect} from 'react';
import axios from 'axios';



// == Import Style
import './styles.css';

// Local imports 

const Menus = () => {

const [dataAdmin, setDataAdmin] = useState([{_id:""}]);  

    //API call data menu
    const getApiData = () =>{
      const url = `https://omiso.com/menu/`;
          axios.get(url)
          .then((resp) => {
            const addquantity = resp.data.menuItems.map((e)=>({...e,quantity:0}))
            setData(addquantity)
          })
          .catch((error) => {
            console.log('error', error);
          });  
        };
        
        //getting menu data
        useEffect(getApiData, []) ;

return(



<div className="sectionAdminMenu">
    
    <div className="fetchAdminMenu">

    <table >
          <thead>
              <tr>
                <th >Plats</th>
                <th >Prix</th>
                <th >Catagorie</th>
                <th >Description</th>
                <th >Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td >                  
                    Nom du plats
                </td>
                <td >
                    15 €
                </td>
                <td>
                    Dessert
                </td>
                <td >
                    tres bon plat
                </td>
                <td >
                <button>Supprimer</button><br></br>
                    <button>Update</button>
                </td>

              </tr>    


              <tr>
                <td >                  
                    Nom du plats
                </td>
                <td >
                    15 €
                </td>
                <td>
                    Dessert
                </td>
                <td >
                    tres bon plat
                </td>
                <td >
                <button>Supprimer</button><br></br>
                    <button>Update</button>
                </td>

              </tr>       


              <tr>
                <td >                  
                    Nom du plats
                </td>
                <td >
                    15 €
                </td>
                <td>
                    Dessert
                </td>
                <td >
                    tres bon plat
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
        <div>Nouveau Menu</div>
        <label for="titre">titre</label>
        <input type="text" id="titre" name="titre" required></input>
        <label for="description">description</label>
        <input type="text" id="description" name="descrition" required></input>
        <label for="prix">prix</label>
        <input type="text" id="prix" name="prix" required></input>
        <label for="categorie">categorie</label>
        <input type="text" id="categorie" name="categorie" required></input>
        <label for="image">image</label>
        <input type="text" id="image" name="image" required></input>
        <button>ajouter</button>
    </div>
</div>



    
)};


// == Export
export default Menus;