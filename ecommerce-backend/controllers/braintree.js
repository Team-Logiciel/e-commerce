const User = require("../models/user");
const braintree = require('braintree');
require('dotenv').config();
     

/**
 * Connexion à braintree
 */
const gateway = new braintree.BraintreeGateway({
    environment : braintree.Environment.Sandbox,
    merchantId : process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey : process.env.BRAINTREE_PRIVATE_KEY
});

/**
 * génère un token
 * @param {*} req 
 * @param {*} res 
 */
exports.generateToken = async (req, res) => {
    gateway.clientToken.generate({}, function(err, reponse){
        if(err){
            res.status(500).send(err);
        } else {
            res.send(reponse);
        }
    });
};

/**
 * Methode pour le payement 
 * @param {*} req 
 * @param {*} res 
 */
exports.processPayment = async (req, res) => {
    let nonceFromClient = req.body.paymentMethodNonce
    let amountFromClient = req.body.amount

    //(gateawaypermet de connecter a braintree)
    let newTransaction = gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromClient,
        options :{
            submitForSettlement : true
        }
    }, (error, result) => {
        if(error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    })
}

