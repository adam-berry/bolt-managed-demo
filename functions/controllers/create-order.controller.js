/* eslint-disable require-jsdoc */
const functions = require("firebase-functions");
const {createOrder} = require("../db/order.db");

async function createOrderInit(req, sessionId) {
  try {
    functions.logger.log("data para in createOrderInit ", req.data);
    const cart = req.data.order.cart;
    const displayId = cart.display_id ? cart.display_id : "";
    const createOrderResponse = await createOrder(req.data, sessionId);

    // eslint-disable-next-line max-len
    functions.logger.log("createOrderResponse from createOrderInit", createOrderResponse);

    const response = {
      event: "order.create",
      status: "success",
      data: {
        display_id: displayId,
      },
    };

    functions.logger.log("create order response ", response);

    return response;
  } catch (error) {
    functions.logger.warn("error while creating order ", error);
  }
}

exports.createOrderInit = createOrderInit;
