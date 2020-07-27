//Imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require('../Models/UserModel')

/* 
user routes logic
/Sign Up route : creates a new user
*/
exports.user_signup = (req, res, next) =>{
    
// Checking if email already exists
  User.find({ email: req.body.email })
  .exec()
  .then((user) => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "This email already exists",
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
          });
          user
            .save()
            .then((result) => {
              res.status(201).json({
                message: "User created",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    }
  });

}

//Delete user by its id
exports.user_delete = (req, res, next) =>{
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}