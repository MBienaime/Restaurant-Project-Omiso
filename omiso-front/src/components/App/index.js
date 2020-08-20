// == Import npm
import React, {useState,useEffect} from 'react';
import axios from 'axios';


// == Import Style
import './styles.scss';

// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import Header from '../Header';
import Cart from '../Cart';


const App = () => {

  const [useshowModalCart, setshowModalCart] = useState(false);  
  const [data, setData] = useState([{_id:""}]);   


  //API call
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
 
const addOrder = (d)=>{  
const newdata = data.map((e)=>((e._id===d)?({...e,quantity:e.quantity+1,}):({...e,})));
 setData(newdata);
}

const RemoveOrder = (d)=>{  
const newdata = data.map((e)=>((e._id===d)?({...e,quantity:e.quantity-1,}):({...e,})));
 setData(newdata);
}

const DataOrder= data.filter((e)=>(e.quantity>0));

  const showModalCart = () => {setshowModalCart(true);};
  const hideModalCart = () => {setshowModalCart(false);};

  

return (
<>
<Header showModalCart={showModalCart}/> 
{useshowModalCart &&<Cart hideModalCart={hideModalCart}  DataOrder={DataOrder} addOrder={addOrder} RemoveOrder={RemoveOrder}/>}
<Home/> 
<MenuItems addOrder={addOrder} data={data}/> 


</>

)}

// == Export
export default App;


