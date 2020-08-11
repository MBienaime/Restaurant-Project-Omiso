//Imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js")({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN
});

//Model
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
            ...doc._doc,
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
  const email = req.params.email;
  User.find(email)
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
              lastname:req.body.lastname,
              firstname:req.body.firstname,
              phone_number:req.body.phone_number,
              address:req.body.adsress,
              postal_code:req.body.postal_code,
              city:req.body.city,
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
  const email = req.params.email;
  User.find(email)
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
          
          const token = jwt.sign({userId:user[0]._id, role:user[0].role }, process.env.JWT_KEY, {expiresIn:"1h"});
          
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

// Forgotten password
exports.forget_password = (req, res, next) => {
  //checking if user exists
  const email = req.body.email;
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ error: "User with this email does not exist" });
      }

      // Creates token
      const token = jwt.sign(
        { _id: req.params.userId },
       process.env.RESET_PASSWORD_KEY,
        { expiresIn: "20m" }
      );

      // Creates data to be sent and pass token in url
      const data = {
        from: "no-reply@omiso.com",
        to: email,
        subject: "Reset-password-test-nodejs",
        html: `
      <h4>Your request to reset your password</h4>
      <p>Clink on this <a href = "https://omiso.com/user/forget-password/${token}" >link<a/>to reset your password</p>`,
      };

      // token stored in user schema
      User.updateOne({ resetLink: token }, function (error, success) {
        if (error) {
          return res.status(400).json({ error: "Error link" });
        } else {
          // send email to user
          mailgun.messages().send(data, function (error, body) {
            if (error) {
              return res.json({
                error: error,
              });
            }
            return res.json({ message: "Email has been sent" });
          });
        }
      });
    });
};

// Reset password
exports.reset_password = (req, res, next) => {
  const { resetLink, newPassword } = req.body;
  //check if resetLink/token exists in user schema + comparing user token and token in link
  if (resetLink) {
    jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (
      error,
      decodedData
    ) {
      if (error) {
        return res.status(401).json({ error: "token incorrect or expired" });
      }

      User.findOne({ resetLink }, (error, user) => {
        if (!user) {
          return res
            .status(400)
            .json({ error: "user with this token does not exist" });
        }
        // create new password

        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const obj = {
              password: hash,
            };

            Object.assign(user, obj);
            user.save((err, result) => {
              if (err) {
                return res.status(400).json({ error: "reset password error" });
              } else {
                return res
                  .status(200)
                  .json({ message: "Your password has been changed" });
              }
            });
          }
        });

      });
    });
  }
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
