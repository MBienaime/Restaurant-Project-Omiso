import React, {useState} from 'react';
import './style.css';


function App() {

 const [showPanel, setShowPanel] = useState("right-panel-active");
 const handleClick = () => setShowPanel (" ");
 const Clickhandler = () => setShowPanel ("right-panel-active");

  
  return (
	<div className={`connection-container ${showPanel}`} >

	<div className="form-container sign-up-container">
		<form action="#">
			<h1>Créer un compte</h1>
			<input type="text" placeholder="Nom" />
			<input type="text" placeholder="Prénom" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Mot de passe"/>
			<input type="number" placeholder="Téléphone" />
			<button className ="container-button">Inscription</button>
		</form>
	</div>

	<div className="form-container sign-in-container">
		<form action="#">
			<h1>Se connecter</h1>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Mot de passe" />
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

  );
}

export default App;
