/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable indent */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const engines = require("consolidate");
const bodyParser = require("body-parser");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");

const {handleMerchantAPIRequest} = require("./controllers/merchant-api.controller");
const {renderBoltCheckoutButton} = require("./controllers/render-button.controller.js");

const app = express();
app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: {maxAge: oneDay},
  resave: false,
}));

app.use(cookieParser());
app.use(bodyParser.json(
  {
    verify: (req, res, buf, encoding) => {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || "utf8");
      }
    },
  },
  ));

app.get("/", renderBoltCheckoutButton);

app.get("/success", (request, response)=>{
  response.render("success");
});

app.post("/merchant-api", handleMerchantAPIRequest);

exports.app = functions.https.onRequest(app);
