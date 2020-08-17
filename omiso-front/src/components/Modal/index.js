import React from "react";

// == Import Style
import "./styles.css";

// commande recuperation API
//p == Import npm
const Modal = ({show, hideModal}) => {
const showHideClassName = show ? "modal display-block" : "modal display-none";

return (

  <div className={showHideClassName}>
      <div className='modal-main'>
          <button onClick={()=>hideModal()}>
              cloture modal
          </button>
          modal  
      </div>
     
  </div>
)};
// == Export
export default Modal;