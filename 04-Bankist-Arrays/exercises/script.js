'use strict';

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

// 1. How much was deposited and withdrew in total?

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, curr) => acc + curr, 0);

const bankWithdrawalSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov < 0)
  .reduce((acc, curr) => acc + curr, 0);

console.log(bankDepositSum);
console.log(bankWithdrawalSum);

// 2. Count how many deposits were in the bank with a least 1000 dollars
const numDeposits1000v1 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

console.log(numDeposits1000v1);

// here, an accumulator is a nr of movements that are greater than 1000
const numDeposits1000v2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => (curr >= 1000 ? ++acc : acc), 0);
console.log(numDeposits1000v2);

// 3. Create a new obj which contains the sum of deposits and of the withdrawals. Use the reduce method
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
      sums[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4. Conert any string to the title case (This is a Nice Title)

const convertTitleCase = function (title) {
  const exceptions = ['a', 'as', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  return title
    .toLowerCase()
    .split(' ')
    .map((el, i) => {
      if (exceptions.includes(el) && i !== 0) {
        return el;
      } else {
        return el[0].toUpperCase(0) + el.slice(1);
      }
    })
    .join(' ');
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title'));
console.log(convertTitleCase('and ANOTHER title as an exAmpLe'));
