import React, {useState} from 'react';
import './style.css';


const Connection= ({hideModalConnexion, handleInputChange, user}) => {

 const [showPanel, setShowPanel] = useState("right-panel-active");
 const handleClick = () => setShowPanel (" ");
 const Clickhandler = () => setShowPanel ("right-panel-active");
 console.log(user.lastname);

  return (


 <div className='modal-main '>
		<div className={`connection-container ${showPanel}`} >
		<div className="form-container sign-up-container">
			<div className = "close" onClick={hideModalConnexion}>X</div>
			<form action="#">
				<h1>Créer un compte</h1>
				<input type="text" name="lastname" onChange={(e)=>handleInputChange(e)} placeholder="Nom" value={user.lastname} />
				<input type="text" name ="firstname" onChange={(e)=>handleInputChange(e)} placeholder="Prénom" value={user.firstname}   />
				<input type="email" name ="email" onChange={(e)=>handleInputChange(e)} placeholder="Email" value={user.email} />
				<input type="password" name ="password"onChange={(e)=>handleInputChange(e)} placeholder="Mots de passe" value={user.password}  />
				<input type="tel" name ="phone_number"onChange={(e)=>handleInputChange(e)} placeholder="Téléphone"  value={user.phone_number}  />
				<button className ="container-button">Inscription</button>
			</form>
		</div>

		<div className="form-container sign-in-container">
		<div className = "close" onClick={hideModalConnexion}>X</div>
			<form action="#">
				<h1>Se connecter</h1>
				<input type="email" name ="email" onChange={(e)=>handleInputChange(e)} placeholder="Email" value={user.email}  />
				<input type="password"  name ="password"onChange={(e)=>handleInputChange(e)} placeholder="Mots de passe" value={user.password} />
				<a href="#">Mot de passe oublié ?</a>
				<button className ="container-button">Connexion</button>
			</form>
		</div>

		<div className="overlay-container">
			<div className="overlay">
				<div className="overlay-panel overlay-left">
					<h1>Bonjour!</h1>
					<p>Cliquez sur le bouton pour vous connecter</p>
					<button className="container-button transparent" onClick={handleClick}>Connexion</button>
				</div>
				<div className="overlay-panel overlay-right">
					<h1>Bienvenue!</h1>
					<p>Cliquez sur le bouton pour vous inscrire</p>
					<button className="container-button transparent" onClick={Clickhandler}>Inscription</button>
				</div>
			</div>
		</div>
		
	</div>
</div>

  );
}

export default Connection;
