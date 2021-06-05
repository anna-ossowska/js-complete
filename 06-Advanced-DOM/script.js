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
