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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  // empty the container
  containerMovements.innerHTML = '';

  // movements.slice() creates a shallow copy of an array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

const calcDisplayBalanace = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}€`;
  //labelSumIn;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter((interest, i, arr) => interest > 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUserNames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalanace(acc);

  // Display summary
  calcDisplaySummary(acc);
};

let currentAccount;

// Event handlers
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();

  // (!)
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    // Make the PIN input field lose its focus and remove the blinking cursor
    inputLoginPin.blur();

    // Display UI and welcome message
    labelWelcome.textContent = `Welcome, ${
      currentAccount.owner.split(' ')[0]
    }!`;

    containerApp.style.opacity = '1';

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Do the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }

  // Clear the input fields
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // User can request loan if
  // there is at least one deposit with at least 10% of requested loan amount
  const requestedLoan = Number(inputLoanAmount.value);

  const anyDeposit = movements.some(
    mov => mov > 0 && mov >= requestedLoan * 0.1
  );

  if (requestedLoan > 0 && anyDeposit) {
    currentAccount.movements.push(requestedLoan);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

// Delete a user
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // Check if credentials are correct
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const indx = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete an account
    accounts.splice(indx, 1);

    // Hide the UI
    containerApp.style.opacity = '0';
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// preserving the sorted state
let sortedState = false;

btnSort.addEventListener('click', function (e) {
  sortedState = !sortedState;
  e.preventDefault();
  displayMovements(currentAccount.movements, sortedState);
});

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

// const euroToUsd = 1.1;

// const movementsUsd = movements.map(function (mov) {
//   return mov * euroToUsd;
// });

/*
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

*/

/*
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);

console.log(withdrawals);

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}

console.log(depositsFor);
*/
// console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i + 1}: ${acc}`);
//   return acc + cur;
// }, 0);

/*
const balance = movements.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(balance);

let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}

console.log(balance2);
*/

/*
// Maximum value of the movements array:
const getMax = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

console.log(getMax);
*/

/*
// Chaining methods
const euroToUsd = 1.1;

const totalDepositsUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  // .map((mov, i, arr) => {
  //   console.log(arr);
  //   return mov * euroToUsd;
  // })
  .reduce((acc, curr) => acc + curr, 0);

console.log(totalDepositsUsd);
*/

// const firstWithdrawal = movements.find(mov => mov < 0);

// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Sarah Smith');
// console.log(account);

// const accountfor = function (accounts) {
//   for (const acc of accounts) {
//     if (acc.owner === 'Sarah Smith') {
//       return acc;
//     }
//   }
// };

/*
for (const acc of accounts) {
  if (acc.owner === 'Sarah Smith') {
    console.log(acc);
  }
}
*/

/*
console.log(movements);
// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some(mov => mov === -130));
const anyDeposits = movements.some(mov => mov > 500);

console.log(anyDeposits);
*/

/*
// EVERY: CONDITION
const deposit = mov => mov > 0;
console.log(movements.every(deposit));

const arr = [
  [1, 2, 3],
  [4, 5, 6],
];

console.log(arr.flat());

const arrDeep = [[[1, 2, 3]], [4, 5, 6]];

console.log(arrDeep.flat(2));

// counting the total balance of all the accounts:
// FLAT
const totalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, curr) => acc + curr, 0);

console.log(totalBalance);

// FLATMAP
const totalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => acc + curr, 0);

console.log(totalBalance2);

// * flatMap() goes only one level deep

// SORTING

// Strings
const owners = ['John', 'Alex', 'Jane'];
console.log(owners.sort());

// Numbers
console.log(movements);
*/

// return < 0 A, B
// return > 0 B, A

// ASCENDING
// const sortAsc = movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

/*
const sortAsc = movements.sort((a, b) => a - b);
console.log(sortAsc);
*/

// DESCENDING
// const sortDesc = movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

/*
const sortDesc = movements.sort((a, b) => b - a);
console.log(sortDesc);
*/
