'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  // removing the jumping effect when click on an anchor
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////// LECTURES ////////////////

/*
// --------- SELECTING ELEMENTS -----------

// Selecting the entire document
// It is a reference to the root element of the document (<html>)
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

// Return HTML Collection
const allButtons = document.getElementsByTagName('button');
console.log(document.getElementsByClassName('btn'));

// --------- CREATING AND INSERTING ELEMENTS -----------

// .insertAdjacentHTML

// it's not yet in the DOM itself
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';

message.innerHTML =
  'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';

// INSERTS the message element as the first child of the header
header.prepend(message);

// MOVES the message position into being the last child of the header
header.append(message);

// INSERTS the message as the last child of the header
// (both first and last are visible now)
// header.append(message.cloneNode(true));

// INSERTS the message as a sibling of the header
// header.before(message);
// header.after(message);

// --------- DELETING ELEMENTS -----------
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // the old way: selecting the parent first
    // message.parentElement.removeChild(message)
  });

// --------- STYLES -----------

// setting the in-line styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// reading the inline style set by ourselves
console.log(message.style.backgroundColor);

// reading all the styles
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// Adding to the existing value
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Changing the variable inside the root of the document
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// --------- ATTRIBUTES -----------
const logo = document.querySelector('.nav__logo');

console.log((logo.alt = 'Minimalist logo'));

// NOT .class (!)
console.log(logo.className);

// Non-standard attributes
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
console.log(logo.setAttribute('company', 'Bankist'));

// returns the absolute URL
console.log(logo.src);
// returns the relative URL
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// --------- DATA ATTRIBUTE -----------
// they start with the word 'data
// data-version-number --> veersionNumber
console.log(logo.dataset.versionNumber); // 3.0

// --------- CLASSES -----------
logo.classList.add('c', 'd');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // NOT includes

// overwrites all the existing classes
// logo.className = 'random';
*/
