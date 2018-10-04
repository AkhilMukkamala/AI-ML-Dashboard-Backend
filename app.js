const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);

// PM2 Config && Base Config

const baseConfig = require('./config/base.config').config();
const pm2Config = require('./ecosystem.config');

let mongoURI = baseConfig.connectionString;
let port = process.env.PORT || baseConfig.port;
let database = baseConfig.database;
let domain = process.env.domain || baseConfig.domain;
let environment = baseConfig.environment;

// DB Config and Connections

mongoose.Promise = global.Promise;
mongoose.connect(
  mongoURI, {
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Connection to database ${database} Successfull`);
    }
  }
);

//use sessions for tracking logins
app.use(cookieParser());
// app.use(flash());

app.use(
  session({
    secret: "DoYouNeedTheSecret?IfNo",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// Robots.txt Configuration

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
});


/**
 * App Middlewares
 */

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Setting view to ejs
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'assets')));
// app.use(express.static('./../AI-ML-Dashboard-Frontend/dist/AIMLDashboard'));


app.use((req, res, next) => {
  // Enabling CORS
  req.userip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With,authtoken,contentType, Content-Type, Authorization"
  );
  next();
});

// Routes

const home = require('./controllers/api.intents');

// API Urls

app.use('/', home);


// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'AI-ML-Dashboard/dist/AIMLDashboard/index.html'))
// })

app.options("*", (req, res) => {
  res.end();
});

// To show which URL is being hit in the Console/Terminal.

app.use((req, res, next) => {
  console.log("info", `${req.method} : ${req.url}`);
  next();
});

/**
 * Uncaught Exceptions and Unhandled Rejections Handler
 */
process.on("unhandledRejection", (reason, rejectedPromise) => {
  console.log("error", reason);
});

process.on("uncaughtException", err => {
  console.log("error", err.message, err.stack);
  process.exit(1);
});

// 404 handler
app.use((req, res, next) => {
  res.json({
    msg: "404"
  });
});

/**
 * Error Handler
 */
app.use((err, req, res) => {
  res.status(err.status || 500).send();
});

app.listen(port, domain, () => {
    console.log("Info:", `Listening on Port ${port} in ${environment} Mode at ${domain}`);
});

  // "start": "pm2 start ecosystem.config.js",
