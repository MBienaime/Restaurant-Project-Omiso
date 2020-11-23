/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// Imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

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
    .select("firstname lastname email _id role")
    .exec()
    .then((doc) => {
      const response = {
        users: doc,
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
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          User: doc,
        });
      } else {
        res
          .status(404)

          .json({ message: "Aucune entrée trouvée" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// Sign Up route : creates a new user
exports.user_signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // Checking if email already exists
  const { email } = req.body;
  User.find({ email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "Cet email existe déjà" });
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
            res.status(201).json({ message: "Compte créé avec succès" });
          })
          .catch((error) => {
            res.status(500).json({ message: error });
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
        return res.status(401).json({ message: "Echec connexion" });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Echec connexion" });
        }
        if (result) {
          const token = jwt.sign(
            { userId: user[0]._id, role: user[0].role },
            process.env.JWT_PASSWORD,
            { expiresIn: "1h" }
          );

          return res.status(200).json({ message: "Connexion réussie", token });
        }
        res.status(401).json({ message: "Echec connexion" });
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
          .json({ error: "L'utilisateur avec cet e-mail n'existe pas" });
      }

      // Creates token
      const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_KEY, {
        expiresIn: "20m",
      });

      // Creates data to be sent
      const data = {
        from: "no-reply@restaurant-omiso.com",
        to: email,
        subject: "Réinitialisation de votre mot de passe",

        html: `
      <h4>Votre demande de réinitialisation de mot de passe</h4>
      <p>Cliquez sur ce <a href = "https://omiso.com/utilisateur/mdp-reset-mail/${token}" >lien<a/>pour réinitialiser votre mot de passe.</p>`,
      };

      // token stored
      User.updateOne({ resetLinkToken: token }, (error) => {
        if (error) {
          return res.status(400).json({ error: "Erreur lien" });
        }

        // send email to user
        mailgun.messages().send(data, (err) => {
          if (err) {
            return res.json({ err });
          }

          return res.json({ message: "Email envoyé" });
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
    const { resetLinkToken } = user;
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
                return res
                  .status(400)
                  .json({
                    error: "Erreur lors de la réinitialisation du mot de passe",
                  });
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
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(() => {
      res.status(200).json({ message: "Utilisateur supprimé" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// check User token
exports.CheckToken = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
      res.status(200).json({ authenticated: true, role: decoded.role });
    });
  } catch {
    res.status(401).json({ authenticated: false, role: "" });
  }
};
