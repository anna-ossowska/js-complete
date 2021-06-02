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

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose)
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
6. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
7. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
*/

// 1
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// dogs.forEach(dog => {
//   dog.recommendedFood = Math.floor(dog.weight ** 0.75 * 28);
// });

// 1
const calcFoodIntake = function (dogsArr) {
  dogsArr.forEach(dog => {
    dog.recommendedFood = Math.floor(dog.weight ** 0.75 * 28);
    if (
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
    ) {
      dog.eatingAmount = 'OK';
    } else if (dog.curFood < dog.recommendedFood * 0.9) {
      dog.eatingAmount = 'Too little';
    } else {
      dog.eatingAmount = 'Too much';
    }
  });
};

calcFoodIntake(dogs);

// 2
const assesFoodIntake = function (dogsArr, ownerName) {
  const searchedDog = dogsArr.find(dog => dog.owners.includes(ownerName));
  return searchedDog.eatingAmount;
};

console.log(assesFoodIntake(dogs, 'Sarah'));

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.eatingAmount === 'Too much')
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.eatingAmount === 'Too little')
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too much!`);

// 5
console.log(dogs.some(dog => dog.eatingAmount === 'OK'));

// 6
const dogsOK = dogs.filter(dog => dog.eatingAmount === 'OK');
console.log(dogsOK);

// 7
const dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);
