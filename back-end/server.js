


const cors = require("cors")
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");

// app.use(cors());
// app.use(cors({
//   origin: 'https://sustainable-hub-sachigoto.vercel.app'
// },
// methods: "GET,POST,PUT,DELETE", credentials: true, }) )
// ));



//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");


// app.use( cors({ origin: "https://sustainable-hub-sachigoto.vercel.app", methods: "GET,POST,PUT,DELETE", credentials: true, }) );
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});


//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);


//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
