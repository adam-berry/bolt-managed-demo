/* eslint-disable require-jsdoc */

const {tokenizeCart} = require("../services/boltOrderToken.js");

async function renderBoltCheckoutButton(request, response) {
  const session = request.session;
  const sessionId = session.id;
  try {
    let token; let boltCartData;
    if (session.bolt_order_token && session.boltCartData) {
      token = request.bolt_order_token;
    } else {
      const tokenizeCartResponse = await tokenizeCart(sessionId);
      token = tokenizeCartResponse.token;
      boltCartData = tokenizeCartResponse.boltCartData;
      session.bolt_order_token = token;
      session.boltCartData = boltCartData;
      console.log("session", session);
    }
    response.render("index", {
      connectURL: "https://connect-sandbox.bolt.com/",
      publishableKey: process.env.BOLT_PUBLISHABLE_KEY,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
}

exports.renderBoltCheckoutButton = renderBoltCheckoutButton;
