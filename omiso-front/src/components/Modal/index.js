import React from "react";

// == Import Style
import "./styles.css";
import Connection from '../Connection';

// commande recuperation API
//p == Import npm
const Modal = () => {
const showHideClassName = show ? "modal display-block" : "modal display-none";

return (

  <div className={showHideClassName}>
      <div className='modal-main'>
          <button >
              X Fermer
          </button>
         <Connection />  
      </div>
     
  </div>
)};
// == Export
export default Modal;
