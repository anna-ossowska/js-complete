'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")
// use the destructuring

for (const [score, player] of game.scored.entries()) {
  console.log(`Goal ${score + 1}: ${player}`);
}

// 2. Use a for of loop to calculate the average odd and log it to the console
const odds = Object.values(game.odds);
let total = 0;
for (const odd of odds) {
  total += odd;
}
const average = (total / odds.length).toFixed(2);
console.log(average);

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names;

const entries = Object.entries(game.odds);

for (let [key, value] of entries) {
  const teamStr = key === 'x' ? 'draw' : `victory ${game[key]}`;
  console.log(`Odd of ${teamStr} : ${value}`);
}

// 4. Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:
// {
// Gnarby: 1,
// Hummels: 1,
// Lewandowski: 2
// }

// SOLUTION 1
const arr = game.scored.sort();
const scorers = {};

for (let i = 0; i < arr.length; i++) {
  // if player's name is not present inside the object, add it as a key and assign 1 as a value
  if (!scorers[arr[i]]) {
    scorers[arr[i]] = 1;
  } else {
    scorers[arr[i]] = ++scorers[arr[i]];
  }
}

console.log(scorers);

// SOLUTION 2
const scorers2 = {};
for (const player of game.scored.sort()) {
  scorers2[player] ? scorers2[player]++ : (scorers2[player] = 1);
}

console.log(scorers2);
