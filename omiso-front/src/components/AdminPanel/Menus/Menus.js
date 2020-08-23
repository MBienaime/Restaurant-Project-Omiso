// == Import npm
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



// == Import Style
import './styles.css';

// Local imports 

const Menus = () => {

const [useDataMenus, setDataMenus] = useState([{_id:""}]);  

    //API call data menu
    const getApiData = () =>{
      const url = `https://omiso.com/menu/`;
          axios.get(url)
          .then((resp) => {            
            setDataMenus(resp.data.menuItems)
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
{ useDataMenus.map((d)=>(
              <tr key={uuidv4()}>
                <td >                  
                    {d.name}
                </td>
                <td >
                   {d.price} €
                </td>
                <td>
                    {d.category}
                </td>
                <td >
                    {d.description}
                </td>
                <td >
                <button>Supprimer</button><br></br>
                    <button>Update</button>
                </td>

              </tr>    

)) }
            </tbody>

          </table>

        


    </div>
    <div className="ResultSelectAdminMenu">
        <div>Nouveau Menu</div>
       
        <input type="text" id="titre" name="titre" required></input>
  
        <input type="text" id="description" name="descrition" required></input>
      
        <input type="text" id="prix" name="prix" required></input>
     
        <input type="text" id="categorie" name="categorie" required></input>
        
        <input type="text" id="image" name="image" required></input>
        <button>ajouter</button>
    </div>
</div>



    
)};


// == Export
export default Menus;