/* eslint-disable require-jsdoc */

const {db} = require("./config.db.js");

async function fetchProduct(id) {
  let reference = "";
  const collectionRef = db.collection("products");
  const querySnapshot = await collectionRef.where("id", "==", id).get();

  querySnapshot.forEach( (documentSnapshot) => {
    reference = documentSnapshot.ref.id;
  });

  const productDocumentRef = db.doc(`products/${reference}`);
  const productSnapshot = await productDocumentRef.get();
  const productData = productSnapshot.data();
  return {productReference: reference, productData: productData};
}

async function fetchCartProductsFromDB(cart) {
  console.log("calling fetchCartProductsFromDB");
  const cartData = cart;
  if (cartData.products) {
    const products = await Promise.all(cartData.products.map(async (p) => {
      const productData = await fetchProduct(p.productId);
      return productData;
    }));
    return products;
  } else return null;
}

exports.fetchProduct = fetchProduct;
exports.fetchCartProductsFromDB = fetchCartProductsFromDB;

