const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");

// TRES IMPORTANT INSTALLER CETTE VERSION npm install express-validator@5.3.1
//NOUVEAU EXPRESS-VALIDOATOR  ne prends plus le expressValidator comme methode dans le app.use
const expressValidator = require("express-validator");

// importation routes:
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/orders");

// load env variables
const dotenv = require("dotenv");
dotenv.config();

// la connexion avec la BD :
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })//MONGO_URI : A changer par MONGO_URI_TEST avant de lancer les tests
  .then(() => console.log("DB Marche"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(`Erreur de la BD: ${err.message}`);
});

//Notre application :
const app = express();

// les middlewares

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use(cors());
app.options("*", cors());

// Routes middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

//const port = process.env.PORT || 8000;
const port = 8000;
app.listen(port, () => {
  console.log("Connected to port " + port);
});
module.exports = app;
