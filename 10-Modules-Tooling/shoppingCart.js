// Exporting module
console.log('Exporting module');

// NAMED EXPORT
const shippingCost = 10;
export const cart = [];

// Works only in top level code
export const addToCart = function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} has been added to the cart`);
};

// Will not work inside functions, if blocks, etc.
// if (true) {
//   export const addToCart = function (product, quantity) {
//     cart.push(product, quantity);
//     console.log(`${quantity} ${product} has been added to the cart`);
//   };
// }

const totalPrice = 235;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// DEFAULT EXPORT
// used to export one thing per module:
export default function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} has been added to the cart`);
}
