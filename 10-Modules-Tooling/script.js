// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

console.log('Importing module');
// addToCart('bread', 5);
// console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

//// Not a good practice to mix both named and default exports:
// import add, { totalPrice as price, tq } from './shoppingCart.js';
// add('milk', 3);
// console.log(price);
// console.log(tq);

// import add, { cart } from './shoppingCart.js';
// add('milk', 3);
// add('bread', 5);
// // LIVE connection
// // cart is NOT a copy of a value that we exported from the shoppingCart file, they both point to the same address in memory
// console.log(cart);

import add from './shoppingCart.js';
add('milk', 3);
add('bread', 5);
