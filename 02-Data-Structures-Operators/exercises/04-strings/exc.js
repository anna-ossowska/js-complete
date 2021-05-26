'use strict';

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

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// _Delayed_Departure;fao93766109;txl2133758440;11:25
// +_Arrival;bru0943384722;fao93766109;11:45
// +_Delayed_Arrival;hel7439299980;fao93766109;12:05
// +_Departure;fao93766109;lis2323639855;12:30;

const fArr = flights.split('+');

const getPart = str => str.slice(0, 3).toUpperCase();

for (const f of fArr) {
  let [info, from, to, time] = f.split(';');
  const output = `${info.startsWith('_Delayed') ? '🔴' : ''} ${info
    .replaceAll('_', ' ')
    .trim()} from ${getPart(from)} to ${getPart(to)} (${time.replace(
    ':',
    'h'
  )})\n`;

  console.log(output.padStart(50));
}
