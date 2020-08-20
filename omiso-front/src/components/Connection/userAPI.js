import axios from 'axios';
 

 //API call : Signin
export function handleUserInscription(user){   
	const url= "https://omiso.com/utilisateur/inscription"
	axios({
	  method:"post",
	  url:url,
	  data: user,
	})
	.then((e)=>console.log(e))
	.catch( (e)=>console.log(e));
  }
  
   //API call : login
   export function handleUserConnection  (user) {   
	const url= "https://omiso.com/utilisateur/login"
	axios({
	  method:"post",
	  url:url,
	  data: user,
	})
	.then((e)=>{
	  console.log(e.data.token);
	  localStorage.setItem('UserTokenOmiso', e.data.token)
	})
	.catch( (e)=>console.log(e));
  }

  //API call : forget-password
  export function handleUserforgetPassword (user){   
	const url= "https://omiso.com/utilisateur/mdp-oublie"
	axios({
	  method:"put",
	  url:url,
	  data: user,
	})
	.then((e)=>{ console.log(e);})
	.catch( (e)=>console.log(e));
  }


 //API call : reset-password
 export function handleResetPassword(user){   
	const url= "https://omiso.com/utilisateur/mdp-reset"
	axios({
	  method:"put",
	  url:url,
	  data: user,
	})
	.then((e)=>{ console.log(e);})
	.catch( (e)=>console.log(e));
  }
