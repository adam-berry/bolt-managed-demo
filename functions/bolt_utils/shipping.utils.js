/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
function shippingEstimation(days) {
  if (!days || typeof days != "number") {
    console.log("error estimating shipping");
    return "";
  }
  const d = new Date();
  let m = d.getMonth() + 1;
  console.log(m);
  if (m < 10 ) {
    m = `0${m}`;
  }
  return `${m}-${d.getDate() + days}-${d.getFullYear()}`;
}

function pickupWindow(days) {
  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + days);
  return {start: start.valueOf(), end: end.valueOf()};
}

function getStaticShippingData(shippingConfig) {
  return {
    testPickUpOptions: [
      {
        reference: "1123",
        signature: "a1B2s3dC4f5g5D6hj6E7k8F9l0",
        cost: 0,
        taxAmount: 0,
        storeName: "Greenpoint Location",
        address: {
          street_address1: "648 Manahattan Ave",
          locality: "Brooklyn",
          region: "NY",
          postal_code: "11222",
          country_code: "US",
          country: "United States",
        },
        distance: 1,
        distanceUnit: shippingConfig.distanceUnit,
      },
      {
        reference: "1123",
        signature: "a1B2s3dC4f5g5D6hj6E7k8Fdafd",
        cost: 0,
        taxAmount: 0,
        storeName: "Williamsburg Location",
        address: {
          street_address1: "424 Rodney Street",
          locality: "Brooklyn",
          region: "NY",
          postal_code: "11211",
          country_code: "US",
          country: "United States",
        },
        distance: 2,
        distanceUnit: shippingConfig.distanceUnit,
      },
    ],
    testShippingOptions: [
      {
        service: "Overnight",
        description: `The most popular choice <span id=\"1\">most</span>`,
        cost: 770,
        taxAmount: 230,
        reference: "1123",
        signature: "a1B2s3dC4f5g5D6hj6E7k8F9l0",
        estimatedDeliveryDate: shippingEstimation(1),
        taxCode: "tax-12345",
        discountByMembership: false,
        default: true,
      },
      {
        service: "Express",
        description: "The second most popular choice",
        cost: 1000,
        taxAmount: 300,
        reference: "1124",
        signature: "a1B2s3dC4f5g5D6hj6E7adfdsfa",
        estimatedDeliveryDate: shippingEstimation(2),
        taxCode: "tax-12345",
        discountByMembership: false,
        default: false,
      },
      {
        service: "Free",
        description: "The cheapest option",
        cost: 0,
        taxAmount: 230,
        reference: "1125",
        signature: "a1B2s3dC4f5g5D6hj6E7k8F9l0",
        estimatedDeliveryDate: shippingEstimation(3),
        taxCode: "tax-12345",
        discountByMembership: false,
        default: false,
      },
    ],
  };
}

function getToolTipContent(description, text="generic tool tip content") {
  const search = `<span id=\"`;
  const indx = description.indexOf(search);
  if (indx == -1) {
    console.log("no span is included in tool tip content", description);
    return false;
  } else {
    const target = parseInt(description[search.length + indx]);
    // check for parseInt returning NAN
    if (!target) {
      return false;
    } else {
      return [{
        target: parseInt(target),
        html_content: text,
      }];
    }
  }
}

exports.getToolTipContent = getToolTipContent;
exports.pickupWindow=pickupWindow;
exports.getStaticShippingData=getStaticShippingData;

