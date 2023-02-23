/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const {getMerchantAPISettings} = require("../config/merchant-api.config");
const {getStaticShippingData, pickupWindow, getToolTipContent} = require("../bolt_utils/shipping.utils");
const {shippingConfig} = getMerchantAPISettings();

const selectedShipOptFields = shippingConfig["shippingOptionsData"].filter((o)=>o.active===true).map((o)=>o.field);

const {testShippingOptions, testPickUpOptions} = getStaticShippingData(shippingConfig);

function formatShippingResponse(status, shippingOptions, pickupOptions) {
  function formatShipOpt(shipOpt) {
    return {
      service: shipOpt.service && selectedShipOptFields.includes("service") ? shipOpt.service : "",
      description: shipOpt.description && selectedShipOptFields.includes("description") ? shipOpt.description : "",
      cost: shipOpt.cost && selectedShipOptFields.includes("cost") ? shipOpt.cost : 0,
      tax_amount: shipOpt.taxAmount && selectedShipOptFields.includes("tax_amount") ? shipOpt.taxAmount : 0,
      reference: shipOpt.reference && selectedShipOptFields.includes("reference") ? shipOpt.reference : "",
      signature: shipOpt.signature && selectedShipOptFields.includes("signature") ? shipOpt.signature : "",
      estimated_delivery_date: shipOpt.estimatedDeliveryDate && selectedShipOptFields.includes("estimated_delivery_date") ? shipOpt.estimatedDeliveryDate : "",
      tax_code: shipOpt.taxCode && selectedShipOptFields.includes("tax_code") ? shipOpt.taxCode: "",
      discount_by_membership: shipOpt.discountByMembership && selectedShipOptFields.includes("discount_by_membership") ? true : false,
      default: shipOpt.default && selectedShipOptFields.includes("default") ? true : false,
      description_tooltips: shipOpt.description && getToolTipContent(shipOpt.description) ? getToolTipContent(shipOpt.description) : null,
    };
  }

  function formatPickupOpt(pickupOpt) {
    const {start, end} = pickupWindow(2);
    return {
      reference: pickupOpt.reference ? pickupOpt.reference : "",
      signature: pickupOpt.signature ? pickupOpt.signature : "",
      cost: pickupOpt.cost? pickupOpt.cost: 0,
      tax_amount: pickupOpt.taxAmount? pickupOpt.taxAmount: 0,
      store_name: pickupOpt.storeName? pickupOpt.storeName: "",
      pickup_window_open: start,
      pickup_window_close: end,
      address: pickupOpt.address ? pickupOpt.address : {},
      distance: pickupOpt.distance? pickupOpt.distance : 0,
      distance_unit: shippingConfig.distanceUnit,
    };
  }

  const data = {
    event: "order.shipping",
    status: `${status}`,
    data: {
      shipping_options: shippingConfig.shippingOptions ? shippingOptions.map((o)=>formatShipOpt(o)) : [],
      pickup_options: shippingConfig.pickUpOptions ? pickupOptions.map((p)=> formatPickupOpt(p)) : [],
      ship_to_store_options: [],
    },
  };
  return data;
}

function shippingResponse(req) {
  return formatShippingResponse("success", testShippingOptions, testPickUpOptions);
}
// TODO add testInStoreOptions
exports.shippingResponse = shippingResponse;
