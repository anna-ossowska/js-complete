'use strict';

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

// ---- SHORT CIRCUITING ----

// ---- OR ----

console.log(3 || 'string');
console.log(0 || 'string');
console.log('' || 'string');
console.log(NaN || 'string');
console.log(undefined || null);

// if one of the values is true, js automatically returns that value
console.log(undefined || null || 'string' || 23);

// restaurant.numGuests = 23;

const guests = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests);

// Setting the default values with || operand:
console.log(restaurant.numGuests || 10);

// ---- AND ----

// if one of the values is false, js automatically returns that value
console.log(null && undefined && 'string' && 23);

// if all values are true, the last one is returned
console.log(2 && 23 && 'string');

if (restaurant.orderPizza) {
  restaurant.orderPizza('mashrroms', 'spinach');
}

// executing the code in the second operand if the first one is true
restaurant.orderPizza && restaurant.orderPizza('mashrroms', 'spinach');

// ---- NULL COALESCING OPERATOR (??) ----
restaurant.numGuests = 0;

const guest = restaurant.numGuests || 10;
console.log(guest);

// This operator works with the concept of nullish values instead of falsy values
// Nullish values: null, undefined (NOT 0 or '')
// restaurant.numGuests is shortcircuited (since 0 is truthy, it is automatically returned)
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// ---- FOR OF (ES6 LOOP)  ----
const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu1) console.log(item);

// getting indexes (solution 1)
for (const item of menu1.entries()) {
  console.log(`${item[0]} : ${item[1]}`);
}

// getting indexes (solution 2 with distructuring)
for (const [i, el] of menu1.entries()) {
  console.log(`${i} : ${el}`);
}

// console.log([...menu1.entries()]);

// ---- ENHANCED OBJECT LITERALS (3 new ES6 features)  ----

let weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours2 = {
  // 1. using the square brackets in keys
  [weekDays[0]]: {
    open: 8,
    close: 19,
  },
  [weekDays[5]]: {
    open: 11,
    close: 15,
  },
};

const restaurant2 = {
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // 2. cleaner function syntax
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // 3. passing an object, and no need to declare its value
  openingHours2,
};

// ---- OPTIONAL CHAINING (?.)  ----

// checking if element on the left hand side of ? exists

// in objects
console.log(restaurant.openingHours?.mon?.open); // undefined returned immediately

weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of weekDays) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} we open at ${open}`);
}

// in methods
console.log(restaurant.getDeliveryTime?.() ?? 'Method does not exist.');

// in arrays
const users = [{ firstName: 'John', email: 'john@gmail.com' }];

console.log(users[0]?.firstName ?? 'User does not exist');
console.log(users[5]?.firstName ?? 'User does not exist');

// ---- LOOPING OBJECTS - OBJECT'S KEYS, VALUES AND ENTRIES ----

// KEYS
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days:`;

for (const day of properties) {
  openStr += ` ${day}`;
}

console.log(openStr);

//  VALUES
const values = Object.values(openingHours);
console.log(values);

// ENTRIES
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}.`);
}

// ---- SETS ----

const ordersSet = new Set([
  'pasta',
  'pizza',
  'pizza',
  'risotto',
  'pasta',
  'pizza',
]);

console.log(ordersSet);

// useful methods and properties:
console.log(ordersSet.size);

console.log(ordersSet.has('pizza'));
console.log(ordersSet.has('bread'));

ordersSet.add('garlic bread');

ordersSet.delete('garlic bread');

// ordersSet.clear();

// retrieving elements from the Set
for (const order of ordersSet) {
  console.log(order);
}

// Use case: removing dulicates from the array
const staff = ['waiter', 'chef', 'chef', 'manager', 'waiter', 'waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

// Getting the number of unique positions
console.log(new Set(staff).size);

// Removing duplicated letters from a string
console.log(new Set('Anna'.toLowerCase()));

// ---- MAPS ----

const rest = new Map();
rest.set('restName', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');

console.log(rest.set(2, 'Lisbon, Portugal')); // set() method returns the updated Map

// it allows us to chain the set() methods:
rest
  .set('categories', ['Italian', 'Pizzeria', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

// other useful methods and properties:

console.log(rest.get('restName'));

const time = new Date().getHours();
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));

rest.delete(2);

// rest.clear();

console.log(rest.size);

// We can use an array as a key
const arrMap = [1, 2];
rest.set(arrMap, 'Test');

console.log(rest.get(arrMap));

// Passing the DOM object as a key
rest.set(document.body, 'Body');
console.log(rest);

// ---- MAPS ITERATION ----

const question = new Map([
  ['question', 'What is the most popular programming language?'],
  [1, 'Java'],
  [2, 'JavaScript'],
  [3, 'Python'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again'],
]);

console.log(question);

// Converting an Object to Map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));

// console.log(hoursMap);

console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`${key}. ${value}`);
  }
}
const answer = 3;
// const answer = Number(prompt('Please type a number:'));

console.log(question.get(question.get('correct') === answer));

// Converting a map to array
console.log([...question]); // same as console.log(...question.entries());
// Other methods we can use on maps
console.log([...question.keys()]);
console.log([...question.values()]);

// ---- STRINGS ----

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('ABCDE'[4]);

console.log(airline.indexOf('T'));
console.log(airline.indexOf('X')); // -1
console.log(airline.lastIndexOf('r'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(airline.lastIndexOf(' ') + 1, airline.length));

console.log(airline.slice(-3));

console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s =
    seat.slice(-1) === 'B' || seat.slice(-1) === 'E'
      ? 'middle'
      : 'other than middle';
  console.log(s);
};

checkMiddleSeat('11B');
checkMiddleSeat('12E');
checkMiddleSeat('09C');
checkMiddleSeat('13B');

// BOXING
console.log(typeof new String('Anna')); // converting the primitive type to object

// What happens behind the scenes when we call methods on strings:
// 1. the primitive is converted to an object (boxing)
// 2. method is called
// 3. object is converted back to the primitive type

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fixing capitalization
const passenger = 'jOnAs';

const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

const email = 'johndoe@gmail.com';
const loginEmail = 'JohnDoe@gmail.com \n';

const validEmail = loginEmail.toLowerCase().trim();
console.log(validEmail === email);

// replacing
const priceGB = '288.99';
const pricePL = priceGB.replace('.', ',');
console.log(pricePL);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23.';

const announcement1 = announcement.replaceAll('door', 'gate');
console.log(announcement1);

const announcement2 = announcement.replace(/door/g, 'gate');
console.log(announcement2);

// Booleans as the return type
const plane1 = 'A320neo';
console.log(plane1.includes('A32'));
console.log(plane1.startsWith('Boeing'));
console.log(plane1.endsWith('neo'));

// Split and join
console.log('a+very+long+sentence'.split('+'));

const [fName, lName] = 'John Doe'.split(' ');
console.log(fName, lName);

console.log(['a', 'very', 'long', 'sentence'].join(' '));

const namesUpper = [];
const capitalizeName = function (name) {
  const names = name.split(' ');
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n[0].replace(n[0], n[0].toUpperCase()) + n.slice(1));
  }
  return namesUpper.join(' ');
};

console.log(capitalizeName('john smith davis'));

// Padding a string - adding a number of chars to the string until the string gets the desired length
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('434'.padStart(25, '*'));

const maskCreditCard = function (number) {
  const str = String(number);
  const lastFourDigits = str.slice(-4);
  return lastFourDigits.padStart(str.length, '*');
};

console.log(maskCreditCard(3509781462147));
console.log(maskCreditCard('350978146214757547'));

// Repeat
const message2 = 'Bad weather, all departures delayed...';
console.log(message2.repeat(4));
