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
      open: 0,
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // destructuring function arguments:
  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${time}`
    );
  },

  orderDish: function (ing1, ing2, ing3) {
    console.log(`Ingredients: ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

// passing in an object of options:
restaurant.orderDelivery({
  time: '22:30',
  mainIndex: 2,
  starterIndex: 2,
});

// making use of default values:
restaurant.orderDelivery({
  time: '20:00',
});

// ---- DESTRUCTURING ARRAYS ----
const arr = [2, 3, 4];

const [x, y, z] = arr;
console.log(x, y, z);

const [first, , second] = restaurant.categories;
console.log(first, second);

let [main, , secondary] = restaurant.categories;

// Inverting / mutating variables:
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// Inverting (shortcut):
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Destructuring a function's return value:
const [order1, order2] = restaurant.order(2, 0);
console.log(order1, order2);

// Nested arrays:
const nested = [2, 4, [5, 6]];
const [value1, , [value2, value3]] = nested;
console.log(value1, value2, value3);

// Assigning the default values:
const [el1 = 1, el2 = 1, el3 = 1] = [8, 9];
console.log(el1, el2, el3);

// ---- DESTRUCTURING OBJECTS ----

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Renaming:
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// Assigning the default values + renaming:
const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters);

// Inverting / mutating variables:
let a = 11;
let b = 100;
const obj = { a: 23, b: 56, c: 77 };
({ a, b } = obj);
console.log(a, b);

// Nested objects:
const { openingHours: opHours } = restaurant;
const {
  fri: { open: o, close: c },
} = opHours;

console.log(o, c);

// ---- SPREAD OPERATOR ----

const arr2 = [7, 8, 9];
const newArr2 = [11, 22, ...arr2];
console.log(...newArr2);

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(...newMenu);

// Creating the shallow copy of an array:
const mainMenuCopy = [...restaurant.mainMenu];

// Joining 2 arrays:
const menuJoined = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(...menuJoined);

// Iterables:
const str = 'The sentence';
const letters = [...str, '.'];

// Spread operator used for passing arguments into the function:
const ingredients = [
  // prompt('Ingredient1: '),
  // prompt('Ingredient2: '),
  // prompt('Ingredient3: '),
];

console.log(ingredients);
restaurant.orderDish(...ingredients);

// Spread operator and objects:
const newRestaurant = { ...restaurant, yearOfFounding: 2000 };

// Creating a shallow copy of an object
const restaurantCopy = { ...restaurant };

// ---- REST OPERATOR AND PARAMETERS ----

// 1. Destructuring

// SPREAD, because on the RIGHT hand side of =
const arr3 = [1, 2, ...[3, 4]];
console.log(arr3);

// REST, because on the LEFT hand side of =
const [x1, y1, ...others] = [1, 2, 3, 4, 5];
console.log(others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// REST in objects:
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2. Functions

// Passing an arbitrary amount of arguments by using the rest operator
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};

console.log(add(2, 3));
console.log(add(1, 4, 7, 8));

// calling the method with the spread operator
const arr4 = [23, 55, 89];
console.log(add(...arr4));

restaurant.orderPizza('mushrooms', 'cheese', 'onion', 'olives');
restaurant.orderPizza('mushrooms');
