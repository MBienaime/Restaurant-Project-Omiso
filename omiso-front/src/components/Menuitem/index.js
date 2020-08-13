// == Import npm
import React from 'react';


// == Import Style
import './styles.css';

// commande recuperation API
// == Import npm
const Menuitem = () =>(

<div className="menuitem">
    <div className="menuitem_photo">

    </div>
    <div className="menuitem_detail">
        <div className="menuitem_detail_left">
            <div className="menuitem_titre">
                shuishi et maki
            </div>
            <div className="menuitem_descrition">
                algue fruit legume viande algue fruit legume viande
            </div>
        </div>
        <div className="menuitem_detail_right">
            <div className="menuitem_detail_price">
                3€
            </div>
            <div className="menuitem_detail_amount">                
                <button>
                    +
                </button>
                <div >
                    3
                </div>
                <button>
                    +
                </button>
            </div>
        </div>
    </div>
    <button>ajout panier</button>
</div>


)

// == Export
export default Menuitem;
