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

// ------ PROTOTYPES ------

// all the objects that are created throught the Person constructor function,
// will get access to all the methods and properties that are defined on the prototype property

// setting methods on Prototypes
Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

john.calcAge();
jane.calcAge();

console.log(john.__proto__);
console.log(Person.prototype);

console.log(john.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(john)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// setting properties on Prototypes
Person.prototype.species = 'Homo Sapiens';
console.log(john.species, jane.species);

console.log(john.hasOwnProperty('firstName'));
console.log(john.hasOwnProperty('species'));
