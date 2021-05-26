'use strict';

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [46, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. Create an array 'events' of the different game events that happened (no
// duplicates)

// Solution 1
// const eventsSet = new Set();
// for (const [min, event] of gameEvents) {
//   eventsSet.add(event);
// }

// const events = [...eventsSet];

// Solution2
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.

gameEvents.delete(64);

// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9.2 minutes"

const time = [...gameEvents.keys()].pop();
const eventNum = gameEvents.size;
console.log(`An event happened on average, every ${time / eventNum} minutes`);

// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL

for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF ${min}: ${event}]`);
}

// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.

// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.

// Test data (pasted to textarea, including spaces):
// underscore_case
//  first_name
// Some_Variable
//  calculate_AGE
// delayed_departure

// Should produce this output (5 separate console.log outputs):
// underscoreCase   ✅
// firstName        ✅✅
// someVariable     ✅✅✅
// calculateAge     ✅✅✅✅
// delayedDeparture ✅✅✅✅✅

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');
const textArea = document.querySelector('textarea');
const input = textArea.value;

btn.addEventListener('click', function () {
  const strLowerCase = textArea.value.toLowerCase().replaceAll(' ', '');
  const strArr = strLowerCase.split('\n');
  const formattedStrArr = [];
  let times = 1;

  for (const s of strArr) {
    const underscore = s.indexOf('_');
    const firstHalf = s.slice(0, underscore);
    const secondHalf =
      s[underscore + 1].toUpperCase() + s.slice(underscore + 2, s.length);

    const output = firstHalf + secondHalf;
    const icon = '✅'.repeat(times);

    formattedStrArr.push(`${output.padEnd(20)}${icon}`);
    times++;
  }
  console.log(formattedStrArr.join('\n'));
});
