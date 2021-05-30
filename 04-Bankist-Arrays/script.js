'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // empty the container
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

/* let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// does not mutate the original array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-4));
console.log(arr.slice(1, -2));

// Creating a shallow copy
console.log(arr.slice());
console.log([...arr]);

// SPLICE
// mutates the original array

// removing the last elelemnt of the array
arr.splice(-1);
console.log(arr);

arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(1, 2));
console.log(arr);

// REVERSE
// mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];

const arr2 = ['j', 'i', 'g', 'h', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
// Same as:
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join('-'));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// ------- FOR...OF vs. FOREACH ----------

for (const [i, m] of movements.entries()) {
  if (m > 0) {
    console.log(`${i + 1}. You deposited ${m}.`);
  } else {
    console.log(`${i + 1}. You withdrew ${Math.abs(m)}.`);
  }
}
console.log('-------------------------------');
// break statement does not work in forEach loops

movements.forEach(function (m, i, arr) {
  if (m > 0) {
    console.log(`${i + 1}. You deposited ${m}.`);
  } else {
    console.log(`${i + 1}. You withdrew ${Math.abs(m)}.`);
  }
});

// ------- FOREACH WITH MAPS ----------

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}, ${map}`);
});

// ------- FOREACH WITH SETS ----------

const currenciesUnique = new Set(['USD', 'EUR', 'USD', 'NOK']);

currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}`);
});

*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;

// const movementsUsd = movements.map(function (mov) {
//   return mov * euroToUsd;
// });

const movementsUsd = movements.map(mov => mov * euroToUsd);

console.log(movements);
console.log(movementsUsd);

const movementsUsdfor = [];
for (const mov of movements) {
  movementsUsdfor.push(mov * euroToUsd);
}

console.log(movementsUsdfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `${i + 1}. You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}.`
);

console.log(movementsDescriptions);