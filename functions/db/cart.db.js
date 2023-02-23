
/* eslint-disable require-jsdoc */

const {db} = require("./config.db.js");

async function fetchCartFromDB(id) {
  let reference = "";
  const cartsCollectionRef = db.collection("carts");
  const querySnapshot = await cartsCollectionRef.where("id", "==", id).get();

  querySnapshot.forEach((documentSnapshot) => {
    console.log(`Found cart for ${id}: ref ${documentSnapshot.ref.id}`);
    reference = documentSnapshot.ref.id;
  });

  if (!reference) {
    console.log("no cart was found!");
  }

  const cartDocumentRef = db.doc(`carts/${reference}`);

  const cartSnapshot = await cartDocumentRef.get();
  const cartData = cartSnapshot.data();

  return {reference, cartData};
}

async function createCart(data) {
  try {
    const id = data.sessionId;
    const t = Date.now();
    const cart = {
      id: data.sessionId,
      created_at: t,
      products: data.products,
      userId: data.userId ? data.userId : 0,
    };
    const cartsCollectionRef = db.collection("carts");
    const response = await cartsCollectionRef.doc(id).set(cart);
    console.log(response);
    return cart;
  } catch (error) {
    console.log("error creating cart in db", error);
  }
}

exports.fetchCartFromDB = fetchCartFromDB;
exports.createCart = createCart;
