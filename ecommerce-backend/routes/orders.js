const express = require("express");
const router = express.Router();


const { requireSignin,isAuth} = require('../controllers/auth');
const { userById, ajouterHistorique } = require("../controllers/user");
const { create } = require("../controllers/orders");

router.post('/order/create/:userId',requireSignin,isAuth,ajouterHistorique,create)


router.param("userId",userById)


module.exports = router;