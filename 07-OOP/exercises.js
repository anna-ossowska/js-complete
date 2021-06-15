///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  return `${this.make} going at ${(this.speed += 10)} km/h`;
};

Car.prototype.brake = function () {
  return `${this.make} going at ${(this.speed -= 5)} km/h`;
};

const bmw = new Car('BMW', 110);

console.log(bmw.accelerate());
console.log(bmw.accelerate());
console.log(bmw.brake());
console.log(bmw.accelerate());

const mercedes = new Car('Mercedes', 95);
console.log(mercedes.brake());
console.log(mercedes.accelerate());

///////////////////////////////////////
// Coding Challenge #2

// 1. Re-create challenge 1, but this time using an ES6 class;
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    console.log(`${this.make} going at ${(this.speed += 10)} km/h`);
  }

  brake() {
    console.log(`${this.make} going at ${(this.speed -= 5)} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    return (this.speed = speed * 1.6);
  }
}

const mercedes = new Car('Mercedes', 120);
console.log(mercedes.speedUS);
mercedes.accelerate();
mercedes.speedUS = 50;
console.log(mercedes);

///////////////////////////////////////
// Coding Challenge #3

// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism

// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log(`${this.make} going at ${(this.speed += 10)} km/h`);
};

Car.prototype.brake = function () {
  console.log(`${this.make} going at ${(this.speed -= 5)} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  return (this.charge = chargeTo);
};

// POLYMORPHISM
// accelerate method overwrites the accelerate method inherited from the parent class
EV.prototype.accelerate = function () {
  console.log(
    `${
      this.make
    } going at ${(this.speed += 20)}, with a charge of ${(this.charge -= 1)}%`
  );
};

const tesla = new EV('Tesla', 120, 23);

tesla.accelerate();
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    console.log(`${this.make} going at ${(this.speed += 10)} km/h`);
    return this;
  }

  brake() {
    console.log(`${this.make} going at ${(this.speed -= 5)} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    console.log(
      `${
        this.make
      } going at ${(this.speed += 20)} km/h, with a charge of ${(this.#charge -= 1)}%`
    );
    return this;
  }
}

const bmw = new CarCl('bmw', 120);
bmw.accelerate().accelerate().brake();

const rivian = new EVCl('rivian', 110, 23);
rivian.chargeBattery(90).accelerate().accelerate().brake();
