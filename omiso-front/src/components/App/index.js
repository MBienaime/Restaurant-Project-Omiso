// == Import npm
import React, {useState,} from 'react';



// == Import Style
import './styles.scss';

// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import Header from '../Header';
import CardMenus from '../CardMenus';
import Cart from '../Cart';

import AdminPanel from '../AdminPanel/index';



const App = () => {

const [useshowModalCart, setshowModalCart] = useState(false); 

const showModalCart = () => {setshowModalCart(true);};
const hideModalCart = () => {setshowModalCart(false);}

const [useorder, setorder] = useState([]);

const addOrder = (d)=>{ 
if (!useorder.some((e)=>e._id === d._id)){ setorder([...useorder,{...d, quantity:1}]) }
else{ const newdata = useorder.map((e)=>((e._id===d._id)?({...e,quantity:e.quantity+1,}):({...e,}))); setorder(newdata); };
}

const RemoveOrder = (d)=>{
if (!useorder.some((e)=>e._id === d._id)){ setorder([...useorder,{...d, quantity:1}]) }
else{ const newdata = useorder.map((e)=>((e._id===d._id)?({...e,quantity:e.quantity-1,}):({...e,}))); setorder(newdata); };
}

//selector order menu
const usefilterorder= useorder.filter((e)=>(e.quantity>0));


return (
<>
<Header showModalCart={showModalCart}/> 
{useshowModalCart && <Cart hideModalCart={hideModalCart}  DataOrder={usefilterorder} addOrder={addOrder} RemoveOrder={RemoveOrder}/>}
<Home/>
<CardMenus/> 
<MenuItems addOrder={addOrder} /> 
<AdminPanel/>
</>

)}


// == Export
export default App;



