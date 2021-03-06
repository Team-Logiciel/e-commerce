const User = require("../models/user");
const passHash = new User();
const assert = require("assert");
const { Commande, ItemChariot } = require("../models/commandes");
const { errorHandler } = require("../helpers/dbErrorHandler");

/**
 * Methode pour afficher tout les users dans la BD
 * @param {*} req 
 * @param {*} res 
 */
exports.listAllUsers = (req, res) => {
  let query = User.find({});
  query.exec((err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

/**
 * Chercher un utilisateur par son ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} id 
 */
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Utilisateur introuvable",
      });
    }
    req.profile = user;
    next();
  });
};

/**
 * Methode pour lire les donnes du user
 * @param {*} req 
 * @param {*} res 
 */
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

/**
 * Methode pour mettre a jour le profile du user
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
  if (req.body.hashed_password != "") {
    req.body.hashed_password = passHash.encrypterLeMotDePasse(
      req.body.hashed_password
    );
    req.body.salt = passHash.getSalt();
  }
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "tu n'as pas lautorisation pour cette action",
        });
      }
      req.body.hashed_password = undefined;
      req.body.salt = undefined;
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

/**
 * Methode qui affiche l'historique des users cree
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.ajouterHistorique = (req, res, next) => {
  let historique = [];

  req.body.order.products.forEach((produit) => {
    historique.push({
      _id: produit._id,
      name: produit.name,
      description: produit.description,
      category: produit.category,
      quantity: produit.quantity,
      transaction_id: req.body.order.transaction_id,
    });
  });
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: historique } },
    { new: true },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Erreur de sauvegarde",
        });
      }
      next();
    }
  );
};

/**
 * Methode qui affiche l'historique des achats de chaque user
 * @param {*} req 
 * @param {*} res 
 */
exports.historiqueAchat = (req, res) => {
  Commande.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, commandes) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(commandes);
    });
};
