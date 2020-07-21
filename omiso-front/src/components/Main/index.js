// == Import npm
import React from 'react';
//import { Redirect } from 'react-router-dom';

// == Import
import './style.scss';

// == Composant
const Main = () => (
  <div className="container" id="accueil">

    <div className="row ">
      <div className="col text-center">
        <h2 className="titleDescription">Qui sommes nous ?</h2>

        <p className="para"> O'miso est heureux de vous accueillir depuis plus de cinq ans afin de vous faire découvrir notre savoir faire, que nous avons développé tout au long de nos voyages en Asie. Tous nos produits sont sélectionné avec soin afin de vous faire voyager grâce à notre cuisine.
        </p>
        <p className="para">
          Vous trouverez sur notre site la carte du restaurant qui vous permettra d'avoir un aperçu de nos propositions ainsi que la possibilité de précommander votre repas à emporter pour plus de rapidité.
        </p>
        <p className="para" id="ancre">
          Nous pouvons aussi vous proposer une salle de restauration et une terrasse. Nous sommes ouverts tous les jours Midi et Soir sauf le dimanche.
        </p>

      </div>
    </div>
  </div>
);

// == Export
export default Main;
