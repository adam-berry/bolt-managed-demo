/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const crypto = require("crypto");
const {shippingResponse} = require("./shipping.controller");
const {taxInit} = require("./tax.controller");
const {createOrderInit} = require("./create-order.controller");
const functions = require("firebase-functions");

async function handleMerchantAPIRequest(request, response) {
  if (request.get("X-Bolt-Hmac-Sha256")) {
    const sig = Buffer.from(request.get("X-Bolt-Hmac-Sha256") || "", "utf8");
    const hmac = crypto.createHmac("sha256", process.env.BOLT_SIGNING_SECRET);
    const digest = Buffer.from(hmac.update(request.rawBody, "utf8").digest("base64"));
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
      return response.status(401).send({
        message: `Request body digest (${digest}) did not match X-Bolt-Hmac-Sha256 ${sig}. request.rawBody ${request.rawBody}, request.body ${request.body}`,
      });
    }
  }
  if (!request.body["event"]) {
    console.error("request does not include event type");
    functions.logger.log("Inbound MerchantAPI Request", request.body);
    response.sendStatus(400);
  } else {
    switch (request.body["event"]) {
      case "order.create":
        try {
          const createOrderResponse = await createOrderInit(request.body, request.session.id);
          delete request.session.bolt_order_token;
          response.status(200).send(JSON.stringify(createOrderResponse));
        } catch (error) {
          functions.logger.error("order.create error ", error);
        }
        break;
      case "order.tax":
        response.status(200).send(JSON.stringify(taxInit(request.body)));
        break;
      case "order.shipping":
        response.status(200).send(JSON.stringify(shippingResponse(request.body)));
        break;
      default:
        functions.logger.warn("event unknown: ", request.body["event"]);
    }
  }
}

exports.handleMerchantAPIRequest = handleMerchantAPIRequest;
