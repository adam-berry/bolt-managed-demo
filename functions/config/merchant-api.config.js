/* eslint-disable max-len */
// IMPORTANT - If you update these settings, you must redeploy the application

// eslint-disable-next-line require-jsdoc
function getMerchantAPISettings() {
  return {
    shippingConfig: {
      shippingOptions: true,
      shippingOptionsData: [
        {
          field: "service",
          active: true,
        },
        {
          field: "description",
          active: true,
        },
        {
          field: "cost",
          active: true,
        },
        {
          field: "tax_amount",
          active: true,
        },
        {
          field: "reference",
          active: true,
        },
        {
          field: "signature",
          active: true,
        },
        // estimated delivery is not rendered in checkout. Not sure what this is used for.
        {
          field: "estimated_delivery_date",
          active: false,
        },
        {
          field: "tax_code",
          active: true,
        },
        {
          field: "discount_by_membership",
          active: false,
        },
        {
          field: "default",
          active: true,
        },
        // to use the description_tooltips field, the description field has to contain a <span>
        // with an id that matches the target value
        {
          field: "description_tooltips",
          active: true,
        },
      ],
      pickUpOptions: false,
      shipToStoreOptions: true,
      distanceUnit: "mile",
    },
    taxConfig: null,
    createOrderConfig: null,
  };
}

exports.getMerchantAPISettings = getMerchantAPISettings;
