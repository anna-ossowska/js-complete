'use strict';
/*
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

// ------ GETTERS AND SETTERS ------

// Object literal example
const account = {
  owner: 'john',
  movements: [300, 200, 340, 550],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 100;
console.log(account.latest);

class PersonCl1 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods are added to .prototype property
  // Instance methods
  calcAge() {
    console.log(2021 - this.birthYear);
  }

  getFullName() {
    console.log(`${this.fullName}`);
  }

  get age() {
    return 2021 - this.birthYear;
  }

  // Setting a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // static methods
  static greet() {
    console.log('Hi there');
  }
}

const person1 = new PersonCl1('john doe', 1992);
console.log(person1.age);
console.log(person1.fullName);

// ------ STATIC METHODS ------

// PersonCl1.greet = function () {
//   console.log(this);
//   console.log('Hi there');
// };

// PersonCl1.greet();


// We get an error, since greet() method is not inside the prototype of john object
// there is no way john object can iherit this method
// john.greet();

// ------ OBJECT.CREATE ------

// this is going to be a prototype of all person objects
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // steven is now an empty object
console.log(steven);
steven.calcAge();

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1992);
console.log(sarah);


// ------ INHERITANCE BETWEEN 'CLASSES': CONSTRUCTOR FUNCTIONS ------
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
// at this point Student.prototype is an empty object
Student.prototype = Object.create(Person.prototype);

// we add methods onto this empty object
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 1999, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

/*
// ------ INHERITANCE BETWEEN 'CLASSES': ES6 CLASSES ------
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2021 - this.birthYear);
  }

  getFullName() {
    console.log(`${this.fullName}`);
  }

  get age() {
    return 2021 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  static greet() {
    console.log('Hi there');
  }
}

// extends keyword links the prototypes
class Student extends Person {
  constructor(fullName, birthYear, course) {
    // super is a constructor function of the parent class
    // call to super function needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  calcAge() {
    console.log(2040 - this.birthYear);
  }
}

const martha = new Student('Martha Jones', 1998, 'Computer Science');

console.log(martha);
martha.calcAge();
*/

// ------ INHERITANCE BETWEEN 'CLASSES': OBJECT.CREATE ------

/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const StudentProto = Object.create(PersonProto);

// reusing the init method from parent prototype
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.greet = function () {
  console.log('Hi there');
};

const john = Object.create(StudentProto);
john.init('John', 1997, 'Computer Science');
john.calcAge();
*/
/*
// ------ ENCAPSULATION: PROTECTED PROPERTIES AND METHODS ------

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    // protected property
    // it should not be touched outside of the class
    this._movements = [];
    this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface
  getMovements() {
    return this._movements;
  }

  deposit(value) {
    this._movements.push(value);
  }

  withdraw(value) {
    this.deposit(-value);
  }

  _approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log('Loan approved');
    }
  }
}

const acc1 = new Account('John', 'EUR', 1111);
console.log(acc1);

acc1.deposit(50);
acc1.withdraw(10);
acc1.movements;
acc1.requestLoan(10);
console.log(acc1.getMovements());
*/

// ------ ENCAPSULATION: PRIVATE CLASS FIELDS AND METHODS ------

// 1. Public fields
// 2. Private fields
// 3. Public methods
// 4. Private methods

class Account {
  // 1. Public fields
  // they will be present on all the instances that we are creating through the class
  // they do not exist on the prototype
  locale = navigator.language;

  // 2. Private fields
  // not accessible from the oustide
  #movements = [];
  #pin; // just like creating an empty variable
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3. Public methods
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    // returning 'this' makes the metohd chainable
    return this;
  }

  withdraw(value) {
    this.deposit(-value);
    return this;
  }

  // 4. private methods
  // Syntax not supported by the browser yet:
  // #approveLoan(value)
  _approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log('Loan approved');
      return this;
    }
  }
}

const acc1 = new Account('John', 'EUR', 1111);
console.log(acc1);

acc1.deposit(50);
acc1.withdraw(10);
acc1.requestLoan(10);
console.log(acc1.getMovements());

// private class fields cannot be read
// console.log(acc1.#movements);
// console.log(acc1.#pin);

// ------ CHAINING METHODS ------

acc1.deposit(300).deposit(200).withdraw(150).requestLoan(1000).withdraw(2000);
console.log(acc1.getMovements());
