//Imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Models/UserModel");

//user routes logic

// find all users
exports.user_get_all = (req, res, next) => {
  
  User.find()
    .select("firstname lastname email _id ")
    .exec()
    .then((docs) => {      
      const response = {
        count: docs.length,
        users: docs.map((doc) => {          
          return {
            ...doc,
            request: {
              type: "GET",
              url: "https://omiso.com/user/" + doc._id,
            },
          };          
        }),
      };      
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

// find user by its id
exports.user_get_user = (req, res, next) => {
  const id = req.params.userId;
  
  User.findById(id)
    .select("firstname lastname email _id ")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          User: doc,
          request: {
            type: "GET",
            description: "",
            url: "https://omiso.com/user/" + doc._id,
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

//Sign Up route : creates a new user
exports.user_signup = (req, res, next) => {
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
              role:req.body.role,
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
};

//User Login
exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {      
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {         
          
          const token = jwt.sign({email: user[0].email, userId: user[0]._id, role:user[0].role }, process.env.JWT_KEY, {expiresIn: "1h"});
          
          return res.status(200).json({
            message: "Auth successful",
            token: token,            
          });
        }
        res.status(401).json({
          message: "Auth failed",

        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

//Delete user by its id
exports.user_delete = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
