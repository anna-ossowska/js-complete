'use strict';

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const generateSecretNumber = function () {
  return Math.floor(Math.random() * 20) + 1;
};

let secretNumber = generateSecretNumber();
let score = 20;
let highScore = 0;

const bodyEl = document.querySelector('body');
const checkEl = document.querySelector('.check');
const guessEl = document.querySelector('.guess');
const highScoreEl = document.querySelector('.highscore');
const numberEl = document.querySelector('.number');
const playAgainEl = document.querySelector('.again');
const scoreEl = document.querySelector('.score');

checkEl.addEventListener('click', function () {
  const guess = Number(guessEl.value);

  // No input is provided
  if (!guess) {
    displayMessage('No number!');

    // The player wins
  } else if (guess === secretNumber) {
    displayMessage('Correct number!');
    bodyEl.style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';
    numberEl.textContent = secretNumber;

    if (score > highScore) {
      highScoreEl.textContent = score;
      highScore = score;
    }

    // Guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      scoreEl.textContent = score;
    } else {
      displayMessage('You lost the game!');
      scoreEl.textContent = 0;
    }
  }
});

// Restarting the game
playAgainEl.addEventListener('click', function () {
  score = 20;
  secretNumber = generateSecretNumber();
  displayMessage('Start guessing...');
  scoreEl.textContent = score;
  guessEl.value = '';
  bodyEl.style.backgroundColor = '#222';
  numberEl.style.width = '15rem';
  numberEl.textContent = '?';
  highScoreEl.textContent = highScore;
});
