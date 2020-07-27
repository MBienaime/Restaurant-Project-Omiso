//Import
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//import routes
const OrderRoute = require("./Routes/OrderRoute");
const MenuRoutes = require("./Routes/MenuRoute");
const userRoutes = require('./Routes/UserRoute');

//connection to DataBase
mongoose
  .connect("mongodb://localhost:27017/omiso", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Cors
/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
*/

// Parses incoming request bodies in the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route
app.use("/", express.static(__dirname + "/public"));
app.use("/order", OrderRoute);
app.use("/menu", MenuRoutes);
app.use("/user", userRoutes);

module.exports = app;
