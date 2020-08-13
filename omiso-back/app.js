// Imports
const express = require('express');

const app = express();
const mongoose = require('mongoose');

// import routes
const OrderRouter = require('./Routes/OrderRoute');
const MenuRouter = require('./Routes/MenuRoute');
const userRouter = require('./Routes/UserRoute');
const adminRouter = require('./Routes/AdminRoute');

// connection to DataBase
mongoose
  .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/${process.env.DB}`, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Admin-bro : route to administration panel
app.use('/admin', adminRouter);

// Parses incoming request bodies in the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', express.static(`${__dirname}/public`));
app.use('/upload', express.static(`${__dirname}/upload`));
app.use('/commande', OrderRouter);
app.use('/menu', MenuRouter);
app.use('/utilisateur', userRouter);

// export
module.exports = app;
