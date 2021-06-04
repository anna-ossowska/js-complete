'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2021-05-27T14:11:59.604Z',
    '2021-05-29T17:01:17.194Z',
    '2021-06-02T23:36:17.929Z',
    '2021-06-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pl-PL',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPassed(new Date(), date);

  switch (true) {
    case daysPassed === 0:
      return 'Today';
      break;
    case daysPassed === 1:
      return 'Yesterday';
      break;
    case daysPassed <= 7:
      return `${daysPassed} days ago`;
      break;
    default:
      // const day = `${date.getDate()}`.padStart(2, '0');
      // const month = `${date.getMonth() + 1}`.padStart(2, '0');
      // const year = date.getFullYear();

      // return `${day}/${month}/${year}`;
      return new Intl.DateTimeFormat(locale).format(date);
      break;
  }
};

//Internationalization of Numbers
const formatCurr = function (value, locale, currency) {
  const options = {
    style: 'currency',
    currency: currency,
  };

  return new Intl.NumberFormat(locale, options).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    // Internationalization of Numbers
    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedBalance = formatCurr(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = `${formattedBalance}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  // Internationalization of Numbers
  const formattedIncomes = formatCurr(incomes, acc.locale, acc.currency);

  labelSumIn.textContent = `${formattedIncomes}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  // Internationalization of Numbers
  const formattedOut = formatCurr(out, acc.locale, acc.currency);

  labelSumOut.textContent = `${formattedOut}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  // Internationalization of Numbers
  const formattedinterest = formatCurr(interest, acc.locale, acc.currency);

  labelSumInterest.textContent = `${formattedinterest}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    let min = String(Math.floor(time / 60)).padStart(2, '0');
    let sec = String(time % 60).padStart(2, '0');
    // In each callback call print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    // When the time is at 0, stop time and log out the user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = '0';
    }

    // Decrease one second
    time--;
  };

  // Set time to 5 min
  let time = 300;

  tick();

  // We want to call the timer every second
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers

// global variables
let currentAccount;
let timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(account1);
// containerApp.style.opacity = '1';

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Display the current date and time
    const timeNow = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    // Setting to whatever language is used by the browser
    // const locale = navigator.language;

    // Setting to language of the current user
    const locale = currentAccount.locale;

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      timeNow
    );
    // const timeNow = new Date();
    // const day = `${timeNow.getDate()}`.padStart(2, '0');
    // const month = `${timeNow.getMonth() + 1}`.padStart(2, '0');
    // const year = timeNow.getFullYear();
    // const hour = `${timeNow.getHours() + 1}`.padStart(2, '0');
    // const min = `${timeNow.getMinutes() + 1}`.padStart(2, '0');

    // day/month/year
    // labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Clearing the timer of the logged out user
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Do transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Clearing the timer if the user shows the activity on the account
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Clearing the timer if the user shows the activity on the account
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// ------ CONVERTING AND CHECKING NUMBERS -----
console.log(23 === 23.0);
console.log(0.1 + 0.2);

// Type coercion
console.log(+'23'); // Number 23

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e50', 10));
console.log(Number.parseFloat(' 2.5rem '));
console.log(Number.parseInt(' 2.5rem '));
console.log(parseInt('23e'));

// checking if value is a Number
console.log(Number.isFinite('20'));
console.log(Number.isFinite(20));

console.log(Number.isInteger(23.5));

// ------ MATH AND ROUNDING -----
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(9, 5, 23));
console.log(Math.max(9, 5, '23')); // coercion
console.log(Math.max(9, 5, '23rem')); // parsin does not work NaN

console.log(Math.min(9, 5, 23));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.floor(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(5, 12));

// Rounding
console.log(Math.round(22.298));

// Always rounded up
console.log(Math.ceil(9.276));

// Always rounded down
console.log(Math.floor(123.73));
console.log(Math.floor('123.33')); // coercion (!)
console.log(Math.trunc(123.22));

// difference between floor and trunc when dealing with negative numbers
console.log(Math.floor(-2.56));
console.log(Math.trunc(-2.56));

// toFixed() (returns a string)
console.log((2.74545).toFixed(2));
console.log((2.5).toFixed(5));

console.log(+(2.74545).toFixed(2)); // conversion to Number
*/

// Array.from(document.querySelectorAll('.movements__row'));

/*
// ------ REMAINDER USE CASE -----

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'grey';
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = 'blue';
    }
  });
});

// ------ BIGINT -----
console.log(Number.MAX_SAFE_INTEGER);

// BigInt
console.log(900719925474099135252525245n);
console.log(BigInt(90071));

// ------ CREATING DATES -----
const now = new Date();
console.log(now);

console.log(new Date('Wed Jun 02 2021'));
console.log(new Date('December 25 2021'));

console.log(new Date(account1.movementsDates[0]));

// Tue Nov 15 2022 08:45:00 GMT+0100 (Central European Standard Time)
console.log(new Date(2022, 10, 15, 8, 45));

// Auto-correction
console.log(new Date(2021, 0, 32, 9, 0));

console.log(new Date(0));
console.log(new Date(1 * 24 * 60 * 60 * 1000));

// Working with dates
const date1 = new Date(2022, 10, 15, 8, 45);
console.log(date1);

console.log(date1.getFullYear());
console.log(date1.getMonth()); // num, 0 based
console.log(date1.getDate()); // calendar day
console.log(date1.getDay()); // day of the week as num, not 0 based
console.log(date1.getHours());
console.log(date1.getMinutes());
console.log(date1.getSeconds());

console.log(date1.toISOString()); // string following an international standard

console.log(date1.getTime()); // 1668498300000 -> timestamp
console.log(new Date(1668498300000)); // Tue Nov 15 2022 08:45:00 GMT+0100 (Central European Standard Time)

console.log(Date.now()); // 1622712412023
console.log(new Date(1622712412023));

date1.setFullYear(2070); // modifying the existing date
console.log(date1);
*/

/*
// ------ OPERATIONS WITH DATES -----
const future = new Date(2037, 10, 19, 15, 45);

// producing a timestamp
console.log(Number(future));
console.log(+future);

// function that returns a number of days that passed between the 2 dates
const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
const days2 = calcDaysPassed(
  new Date(2037, 3, 24),
  new Date(2037, 3, 1, 10, 0)
);
console.log(days1);
console.log(days2);
*/

// ------ INTERNATIONALIZING DATES (INTL) -----

/*
//Experimentinng with Intl API
const timeNow = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  weekday: 'long', // short, narrow
};

// Setting to whatever language is used by the browser
const locale = navigator.language;

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
  timeNow
);

// As of Thursday, June 03, 2021, 6:45 PM
*/

/*
// ------ INTERNATIONALIZING NUMBERS (INTL) -----
const num = 395456.2323;

const options = {
  style: 'currency',
  currency: 'EUR',
  // unit: 'kilometer-per-hour',
  // useGrouping: false, // separators
};

console.log('US:', new Intl.NumberFormat('en-US', options).format(num));
console.log('UK:', new Intl.NumberFormat('en-GB', options).format(num));
console.log('Poland:', new Intl.NumberFormat('pl-PL', options).format(num));
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num));

console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num)
);
*/

// ------ TIMERS ------
// setTimeout(() => console.log('Here comes your order'), 3000);
// console.log('Waiting...');

/*
setTimeout(
  (ing1, ing2) =>
    console.log(`Here comes your pizza with: ${ing1} and ${ing2}.`),
  3000,
  'olives',
  'spinach'
);
console.log('Waiting...');
*/

/*
// Cancelling timer
const ingredients = ['olives', 'spinach'];

const orderTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here comes your pizza with: ${ing1} and ${ing2}.`),
  3000,
  ...ingredients
);

console.log('Waiting...');

if (ingredients.includes('spinach')) {
  clearTimeout(orderTimer);
}
*/

/*
// setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
*/

/*
// Real clock h:min:s
setInterval(function () {
  const now = new Date();

  const hour = now.getHours().toString().padStart(2, '0');
  const min = now.getMinutes().toString().padStart(2, '0');
  const sec = now.getSeconds().toString().padStart(2, '0');

  console.log(`${hour}:${min}:${sec}`);
}, 1000);
*/
