// == Import npm
import React, {useState} from 'react';

// == Import Style
import './styles.scss';

// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import Header from '../Header';



const App = () => {

  const [userOrder, setOrder] = useState([{menu:" " ,nbrmenu:0}]);
  console.log(userOrder); 
  

  const addOrder = (id)=>{
    console.log(id); 
    const newOrder = userOrder.map((order)=> ((order.menu === id) ? ({...order,nbrmenu:order.nbrmenu +1 }) : ({...order, menu:id}) ));
    setOrder(newOrder);   
  };
  const removeOrder = (id)=>{
    console.log(id); 
    const newOrder = userOrder.map((order)=> ((order.menu === id) ? ({...order,nbrmenu:order.nbrmenu -1 }) : ({...order, menu:id}) ));
    setOrder(newOrder);   
  };

  return (
<>
<Header/> 
<Home/> 
<MenuItems addOrder={addOrder}/> 
</>

)}

// == Export
export default App;


