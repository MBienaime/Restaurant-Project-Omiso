// import

const express = require('express');

const OrderRoute = express.Router();

// Route

OrderRoute.route('/')
  .get((req,res)=>{ res.status(200).json('test route get');})
  .post((req,res)=>{ res.status(200).json('test route post');});

OrderRoute.route('/:id')
  .delete((req,res)=>{ res.status(200).json('test route id delete');})
  .get((req,res)=>{ res.status(200).json('test route id get');});
 

module.exports = OrderRoute;