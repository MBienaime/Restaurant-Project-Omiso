// == Import npm
import React from 'react';

// == Import Style
import './styles.css';


// == Import npm
const Home = () =>(
  <div className="home">
   <ul class="social_icons">
                <li class="icon_items"><a href="" class="icon_link"><i class="fab fa-facebook-f"></i></a></li>
                <li class="icon_items"><a href="" class="icon_link"><i class="fab fa-twitter"></i></a></li>
                <li class="icon_items"><a href="" class="icon_link"><i class="fab fa-instagram"></i></a></li>
                <li class="icon_items"><a href="" class="icon_link"><i class="fab fa-tripadvisor"></i></a></li>
            </ul>
        
            <div class="introduction scale-in-hor-left">
                <div class="intro_text ">
                    <h1>Click and Collect</h1>
                   <p><span> 1  </span>Parcourez notre carte et choisissez parmis nos produits.</p>
                    <p><span> 2  </span>Ajoutez votre sélection au panier puis valider.</p>
                    <p><span> 3  </span>Connectez vous pour régler votre achat.</p>
                    <p><span> 4  </span>Récupérez votre commande sur place.</p>
                </div>
                <div class="button">
                    <button class="btn_menu">Notre carte</button>
                </div>
            </div>
</div>

)


// == Export
export default Home;
