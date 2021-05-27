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

// LH123; same as flightNum = flight
// (primitive type, pointimg to the different address on the Stack than the original flight)
console.log(flight);

// name: "Mr. John Doe"; same as passenger = passeger1
// (both pointing to the same address on the Heap)
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
