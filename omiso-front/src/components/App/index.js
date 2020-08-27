// == Import npm
import React, {useState,} from 'react';
import { Route, Switch } from 'react-router-dom';


// == Import Style
import './styles.scss';

// Local imports 
import Home from '../Home';
import MenuItems from '../MenuItems';
import Header from '../Header';
import Cart from '../Cart';
import Connection from '../Connection';
import AdminPanel from '../AdminPanel/index';
import SectionMenu from '../SectionMenu';



const App = () => {

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
<Header/> 
<Home/>
<Switch>
        <Route exact path="/">
            <MenuItems addOrder={addOrder} /> 
          </Route>
          <Route path="/Connexion">
            <Connection />
          </Route>
          <Route path="/Panier">
            <Cart  DataOrder={usefilterorder} addOrder={addOrder} RemoveOrder={RemoveOrder}/>
          </Route>
</Switch>
{/*<CardMenus/>*/ }


<SectionMenu/>
</>

)}


// == Export
export default App;



