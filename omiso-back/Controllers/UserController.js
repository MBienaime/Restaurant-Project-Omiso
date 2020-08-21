/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// Imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

// Mailgun  import and configuration
const mailgun = require("mailgun-js")({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN,
});

// import Model
const User = require("../Models/UserModel");

// user routes logic
// find all users
exports.user_get_all = (req, res) => {
  User.find()
    .select("firstname lastname email _id ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map((doc) => ({
          ...doc._doc,
          request: {
            type: "GET",
            url: `https://omiso.com/utilisateur/${doc._id}`,
          },
        })),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// find user by its id
exports.user_get_user = (req, res) => {
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
            url: `https://omiso.com/utilisateur/${doc._id}`,
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

// Sign Up route : creates a new user
exports.user_signup = (req, res) => {
  // Checking if email already exists
  const { email } = req.body;
  User.find({ email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "This email already exists" });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          phone_number: req.body.phone_number,
          address: req.body.adsress,
          postal_code: req.body.postal_code,
          city: req.body.city,
          role: req.body.role,
        });
        newUser
          .save()
          .then(() => {
            res.status(201).json({ message: "User created" });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      });
    });
};

// User Login
exports.user_login = (req, res) => {
  const { email } = req.body;
  User.find({ email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Auth failed" });
        }
        if (result) {
          const token = jwt.sign(
            { userId: user[0]._id, role: user[0].role },
            process.env.JWT_PASSWORD,
            { expiresIn: "1h" }
          );

          return res.status(200).json({ message: "Auth successful", token });
        }
        res.status(401).json({ message: "Auth failed" });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// Forgotten password
exports.forget_password = (req, res) => {
  // checking if user exists
  const { email } = req.body;
  User.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ error: "User with this email does not exist" });
      }

      // Creates token
      const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_KEY, {
        expiresIn: "20m",
      });

      // Creates data to be sent and pass token in url
      const data = {
        from: "no-reply@omiso.com",
        to: email,
        subject: "Reset-password-test-nodejs",
        html: `
      <h4>Your request to reset your password</h4>
      <p>Clink on this <a href = "https://omiso.com/utilisateur/mdp-reset-mail/${token}" >link<a/>to reset your password</p>`,
      };

      // token stored in user
      User.updateOne({ resetLinkToken: token }, (error) => {
        if (error) {
          return res.status(400).json({ error: "Error link" });
        }

        // send email to user
        mailgun.messages().send(data, (err) => {
          if (err) {
            return res.json({ err });
          }
          return res.json({ message: "Email has been sent" });
        });
      });
    });
};

// Reset password
exports.reset_password = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res
        .status(400)
        .json({ error: "user with this token does not exist" });
    }
    const resetLinkToken = user.resetLinkToken;
    if (resetLinkToken) {
      jwt.verify(
        resetLinkToken.toString(),
        process.env.RESET_PASSWORD_KEY,
        (error) => {
          if (error) {
            return res
              .status(401)
              .json({ error: "token incorrect or expired" });
          }

          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({ error: err });
            }
            const obj = { password: hash };

            // assign and save new password
            Object.assign(user, obj);
            user.save((err) => {
              if (err) {
                return res.status(400).json({ error: "reset password error" });
              }
            });
          });
        }
      );
    }

    res.redirect("https://omiso.com");
    res.end();
  });
};

exports.reset_password_mail = (req, res) => {
  res.render("reset.html");
};

// Delete user by its id
exports.user_delete = (req, res) => {
  User.deleteOne({ _id: req.body.userId })
    .exec()
    .then(() => {
      res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
