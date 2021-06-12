'use strict';

// ------ CONSTRUCTOR FUNCTION AND THE NEW OPERATOR ------

// 1. new {} is created
// 2. function is called, this = {}
// 3. {} linked to the prototype
// 4. function automatically returns {}

const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // (!) never create methods inside the constructor function
  // this.calcAge = function () {
  //   console.log(2021 - this.birthYear);
  // };
};

// calling a constructor function by using the 'new' keyword
// creating an object from the constructor function
const john = new Person('John', 1992);
const jane = new Person('Jane', 1970);

console.log(john, jane);
// console.log(john.calcAge());

console.log(john instanceof Person);
