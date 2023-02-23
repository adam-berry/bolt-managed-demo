/* eslint-disable require-jsdoc */
const {db} = require("./config.db.js");

async function createOrder(data, sessionId) {
  try {
    const now = new Date();
    const dateUTC = now.getUTCDate();
    const orderId = sessionId.slice(0, 10);
    const order = {
      createdAt: dateUTC,
      order: data.order,
      payment: {
        boltTransactionReference: null,
        boltTransactionStatus: null,
        processor: null,
      },
      riskSignals: null,
      // array of webhook types that have been processed for an order.
      webHooksReceived: [],
    };
    const ordersCollectionRef = db.collection("orders");
    const response = await ordersCollectionRef.doc(orderId).set(order);
    console.log(response);
    return response;
  } catch (error) {
    console.log("error creating cart in db", error);
  }
}

exports.createOrder = createOrder;
