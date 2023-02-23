/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const {createCart} = require("../db/cart.db.js");
const {fetchCartProductsFromDB} = require("../db/product.db");
const {formatCartDataV2, buildRandomCart} = require("../bolt_utils/cart.utils.js");

// returns bolt cart and order token
async function tokenizeCart(sessionId = "test-session") {
  console.log("creating cart in db and fetching Bolt Order Token with sessionId", sessionId);
  try {
    // 1. create cart in the db with random data
    const testCartData = buildRandomCart(sessionId);
    const newCart = await createCart(testCartData);
    // 2. fetch newly created cart
    const products = await fetchCartProductsFromDB(newCart);
    const boltCartData = formatCartDataV2(newCart, products);
    const formattedBoltRequest = {
      cart: boltCartData,
      channel: "browser",
    };
    const token = await getBoltOrderToken(formattedBoltRequest);
    return {
      token: token,
      boltCartData: boltCartData,
    };
  } catch (error) {
    console.log(error);
  }
}

// Sends outbound api request to Bolt's API for an order token
async function getBoltOrderToken(boltCartData) {
  const res = await fetch("https://api-sandbox.bolt.com/v1/merchant/orders", {
    method: "post",
    body: JSON.stringify(boltCartData),
    headers: {
      "X-Nonce": "132dc511-2b8a-7a70-7e17-af60e975281a",
      "Content-Type": "application/json",
      "X-API-Key": process.env.BOLT_API_KEY,
    },
  });
  const json = await res.json();

  if (json.token) {
    const token = json.token;
    return token;
  } else {
    console.log("Failed to fetch order token");
    return null;
  }
}

exports.tokenizeCart = tokenizeCart;
