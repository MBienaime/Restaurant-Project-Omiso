import axios from 'axios';
 

 //API call
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
  
   //API call
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

  //Axios request
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


