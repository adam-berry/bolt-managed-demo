/* eslint-disable require-jsdoc */
const functions = require("firebase-functions");

function taxInit(req) {
  try {
    const shippingOption = req.data.shipping_option;
    const pickupOption = req.data.pickup_option;
    const shipToStoreOption = req.data.ship_to_store_option;
    const items = req.data.cart.items;

    const response = {
      event: "order.tax",
      status: "success",
      data: {
        tax_result: {
          items: items,
          rate_subtotal: 0,
          rate_shipping: 0,
          subtotal_amount: 200,
        },
        shipping_option: shippingOption,
        pickup_option: pickupOption,
        ship_to_store_option: shipToStoreOption,
        items: items,
      },
    };
    return response;
  } catch (error) {
    // eslint-disable-next-line max-len
    functions.logger.error("error occurred when attempting to calculate taxes ", error);
  }
}

exports.taxInit = taxInit;
