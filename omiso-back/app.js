// Imports
const express = require('express');

const app = express();
const mongoose = require('mongoose');

// import routes
const path = require('path');
const OrderRouter = require('./Routes/OrderRoute');
const MenuRouter = require('./Routes/MenuRoute');
const userRouter = require('./Routes/UserRoute');

// connection to DataBase
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/${process.env.DB}`, {

  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  next();
});

// Parses incoming request bodies in the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Reset password page view
app.set('views', `${__dirname}/public/views`);
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/', express.static(`${__dirname}/public`));
app.use('/upload', express.static(`${__dirname}/upload`));
app.use('/commande', OrderRouter);
app.use('/menu', MenuRouter);
app.use('/utilisateur', userRouter);

// export
module.exports = app;
