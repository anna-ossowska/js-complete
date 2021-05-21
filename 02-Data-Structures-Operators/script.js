'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// ---- DESTRUCTURING ARRAYS ----
const arr = [2, 3, 4];

const [x, y, z] = arr;
console.log(x, y, z);

const [first, , second] = restaurant.categories;
console.log(first, second);

let [main, , secondary] = restaurant.categories;

// Inverting:
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// Inverting (shortcut):
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Destructuring a function's return value
const [order1, order2] = restaurant.order(2, 0);
console.log(order1, order2);

// Nested array
const nested = [2, 4, [5, 6]];
const [value1, , [value2, value3]] = nested;
console.log(value1, value2, value3);

// Assigning the default values
const [el1 = 1, el2 = 1, el3 = 1] = [8, 9];
console.log(el1, el2, el3);
