// == Import npm
import React, {useState,useEffect} from 'react';

// == Import Style
import './styles.scss';

// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import Header from '../Header';
import Cart from '../Cart';




const App = () => {

  const [userOrder, setOrder] = useState([{_id:" " ,quantity: 1}]);
  const [useshowModalCart, setshowModalCart] = useState(false)
  
  const addOrder = (data)=>{
  const newOrder = userOrder.map((order)=> ((data._id === order._id)?({...data, quantity:order.quantity+1 }):({...data, quantity:1}))); 
  setOrder([...userOrder]);     
  };

  const removeOrder = (data)=>{
  const newOrder = userOrder.map((order)=> ((data._id === order._id)?({...data, quantity:order.quantity-1 }):({...data, quantity:1})));  

  setOrder(newOrder);       
  };

  const showModalCart = () => {setshowModalCart(true);};
  const hideModalCart = () => {setshowModalCart(false);};

  console.log(userOrder);

return (
<>
<Header showModalCart={showModalCart}/> 
{useshowModalCart &&<Cart hideModalCart={hideModalCart} userOrder={userOrder}/>}
<Home/> 
<MenuItems addOrder={addOrder}/> 


</>

)}

// == Export
export default App;


