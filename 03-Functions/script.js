'use strict';

// ---- DEFAULT PARAMETERS ----

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers //you can pass only already defined parameters
) {
  // ES5 syntax
  // numPassengers = numPassengers || 1;
  // price = price || 350;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000); // skipping the required default parameter

// ---- HOW PASSING PARAMETERS WORKS (VALUE VS REFERENCE TYPES) ----

const flight = 'LH123';
const passenger1 = {
  name: 'John Doe',
  passport: 4245224531,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  // if (passenger.passport === 4245224531) {
  //   alert('Check in');
  // } else {
  //   alert('Wrong passport!');
  // }
};

checkIn(flight, passenger1);

// LH123;
// function call generates a copy of the original flight,
// pointimg to the different address on the Stack
console.log(flight);

// name: "Mr. John Doe"; same as passenger = passeger1
// both pointing to the same address on the Heap
console.log(passenger1);

// ---- CALLBACK FUNCTIONS ----

const oneWord = function (str) {
  return str.replaceAll(/ /g, '-').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order functions accept other functions as their arguments
// ABSTRACTION achieved by using the callback function
const transformer = function (str, fn) {
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by ${fn.name}`); // built-in name property
};

transformer('This is a very long sentence', upperFirstWord);
transformer('This is a very long sentence', oneWord);

// ---- FUNCTIONS RETURNING OTHER FUNCTIONS ----

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}`);
  };
};

const greeter = greet('Hello');
greeter('John');
greeter('Steven');

// Calling in one go:
greet('Hi')('John');

// Rewriting using arrow functions:
const greet2 = greeting => userName => console.log(`${greeting}, ${userName}`);

greet2('Hi')('Jane');

// ---- CALL, APPLY AND BIND METHODS ----

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, pName) {
    console.log(
      `${pName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}` });
  },
};

lufthansa.book(245, 'John Doe');
lufthansa.book(132, 'Jane Doe');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

// book is not an obj method anymore, it is a regular, independent function
// thus, 'this' keyword points to undefined
const book = lufthansa.book;
// book(23, 'Sarah Williams');

// How to tell js how 'this' keyword should look like?
// CALL

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 211, 'John Doe');
console.log(lufthansa);

book.call(swiss, 112, 'Roberth Smith');
console.log(swiss);

// APPLY
// Works the same as call(), however, it takes an array of arguments
const flightData = [901, 'Jane Doe'];
book.apply(swiss, flightData);
console.log(swiss);

// Same as:
book.call(swiss, ...flightData);
console.log(swiss);

// BIND
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(591, 'Steven Williams');

// Setting more than one default argument
const bookEW127 = book.bind(eurowings, 127);
bookEW127('Kate Johnson');

// bind with the Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;

  console.log(this.planes);
};

const btn = document.querySelector('.buy');

// making the this keyword point to lufthansa obj
// not the DOM element, which happens by default
btn.addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// We do not care about 'this' keyword here, thus, null is passed
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

// Rewriting the function below, so that one returns another one:
const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTax2(0.23);
console.log(addVAT2(100));

// ---- IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE) ----

// Are used mostly for the situations when we need to execute the function only ONCE

(function () {
  console.log('This will never run again.');
})();

(() => console.log('This will ALSO never run again.'))();

// Before const, let and block scope consepts came to js,
// IIFEs were used heavily to create function scope and ensure data privacy (data encapsulation)

{
  const isPrivate = 23;
  var notPrivate = 22;
}

// console.log(isPrivate);
// console.log(notPrivate);

// ---- CLOSURES ----

// ---- EXAMPLE 1 ----

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

// A function always has an access to the variable environment of the execution context in which it was created, even after that execution context is gone

booker();
booker();
booker();

// inspecting the variable environment
console.dir(booker);

// ---- EXAMPLE 2 ----

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
// f closed over the variable environmet of g
f(); // 44
console.dir(f);

h();
// ressigned f closed over the variable environmet again, this time of g
f(); // 1554
console.dir(f);

// ---- EXAMPLE 3 ----

// callback function was executed independently from the boardPassengers fn, but still it was able to use the variables comming from the variable environment in which callback itself was created (n, perGroup).

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding ${n} passengers`);
    console.log(`There are 3 groups, eaach with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(120, 5);
