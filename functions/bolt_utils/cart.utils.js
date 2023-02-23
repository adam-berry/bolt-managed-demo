/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const fetch = require("node-fetch");

// Transform data from database to Bolt API
function formatCartDataV2(cart, products) {
  // we use the first 10 characters of the sessionId which is available at cart.id
  // this value is used as the Bolt Display Id and the Bolt Order Reference
  const uniqueCartId = cart.id.slice(0, 10);

  const subtotal = products.reduce((acc, cur) => {
    return acc + cur.productData.price;
  }, 0);
  const items = products.map((p)=>{
    return {
      reference: p.productReference,
      total_amount: p.productData["price"],
      category: p.productData["category"],
      name: p.productData["name"],
      image_url: p.productData["image"],
      description: p.productData["description"],
      quantity: 1,
    };
  });
  return {
    currency: "USD",
    total_amount: subtotal,
    tax_amount: 0,
    order_reference: uniqueCartId,
    display_id: uniqueCartId,
    items: items,
  };
}

/** TODO formatCartDataV2 should read configuration options
 * and sould render the following optional cart_create fields:
- add_ons
- billing_address
- billing_address_id
- discount_code
- discount_source
- discounts
- in_store_cart_shipments
- loyalty_rewards (?)
- shipments (?)
- cart_url
- metadata
- order_description
- transaction_reference (?)
**/

// currently every product quantity value is hard coded to 1
function buildRandomCart(sessionId) {
  const lineItems = Math.ceil(4 * Math.random());
  const cartProducts = [];
  for (let i = 0; i < lineItems; i++) {
    const p = {
      productId: Math.ceil(Math.random() * 19),
      quantity: 1,
    };
    cartProducts.push(p);
  }

  return {
    sessionId: sessionId,
    userId: 0,
    products: cartProducts,
  };
}

exports.formatCartDataV2 = formatCartDataV2
exports.buildRandomCart = buildRandomCart
