# Barebones Bolt Express Managed Checkout App

This repo can be used to set up a custom API integration for Bolt’s Managed Checkout. Features include:

- An implemenation of the Bolt Merchant Callback API. This is deployed to Firebase where they are hosted as [Cloud Functions](https://firebase.google.com/docs/functions). 

- The Merchant Callback API code interacts with a a simple [Firebase Firestore Database](https://firebase.google.com/docs/firestore) contains products, carts, and orders. The cloud functions for the Merchant API must be deployed each time any changes are made. You must add the endpoints in the Merchant Admin Division for shipping and tax.

# Installation Steps
1. Clone the repo and install the dependencies
2. Add the Firebase CLI
3. Create your Bolt Sandbox Account and Division for a custom API integration. You should make sure you are using separate shipping and tax endpoints and the Bolt hosted order confirmation page features. 
4. Create your Firebase cloud environment (see details below)
5. Create a .env file for all your secrets and credentials (the repo has a sample-env file that has the variable names that are used in the repo)

## Configuring Firebase

Firestore Database
- I used the [fakestoreapi](https://fakestoreapi.com/) to generate the product data in the database. You'll probably want to automate this. You could also hard code the code that generates the cart and only add a few products to your database. 

# Running the app

Make sure you refer to the official firebase documentation as the source of truth for all things firebase. 

When you make changes to the merchant api code, you will need to redeploy by running: 

```
firebase deploy --only functions && firebase emulators:start
```

```
firebase emulators:start
```

# Issues
1. No tests (i know...)
2. Merchant API does not have an update cart endpoint yet
3. Merchant API config really only works for the shipping request. The config could also be updated to support tax, and create order endpoints. 
4. The frontend JavaScript is just a script tag in the index.ejs template. To expand the frontend code, webpack or rollup integration would be nice. 
5. Each time you launch checkout, a new cart is randomly generated. This could be changed to function more like an actual site (plp, pdp, cart pages ect).