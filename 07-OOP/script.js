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
console.log(Person.prototype.constructor);

// ------ PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS ------
console.log(john.__proto__);

// Object.prototype (top of prototype chain)
console.log(john.__proto__.__proto__); // Object
console.log(john.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);

const arr = [5, 5, 7, 11, 2, 13, 7]; // new Array(5, 5, 7, 11, 2, 13, 7)
console.log(arr.__proto__); // each array inherits array methods from its prototype
console.log(arr.__proto__ === Array.prototype);

// Adding a new method to the prototype property of an Array constructor
// All the arrays automatically inherit this method
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const body = document.body;
console.dir(body);

console.dir(x => x + 1);

// ------ ES6 CLASSES ------

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// // (we can pass them into functions and return them from funtions)
// 3. Classes are executed in the strict mode

// class expression
// const PersonCl = class {
// }

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods are added to .prototype property
  calcAge() {
    console.log(2021 - this.birthYear);
  }

  getFirstName() {
    console.log(`${this.firstName}`);
  }
}

// PersonCl.prototype.getFirstName = function () {
//   console.log(`${this.firstName}`);
// };

const jack = new PersonCl('Jack', 1987);

jack.calcAge();
jack.getFirstName();

console.log(jack.__proto__ === PersonCl.prototype);
