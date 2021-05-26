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
