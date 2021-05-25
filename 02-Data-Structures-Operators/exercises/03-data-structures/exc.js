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
