'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('nav');

const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');
///////////////////////////////////////
// Modal window

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

///////////////////////////////////////
// Smooth scrolling

btnScrollTo.addEventListener('click', function () {
  // get the coordinates of element you want to scroll to
  const s1coords = section1.getBoundingClientRect();

  // DOMRect object
  console.log(s1coords);

  console.log(`top: ${s1coords.top}`);

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'Viewport height/width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // OLD WAY
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // MODERN WAY
  // still not supported by some browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Navigation

/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('LINK');
    const id = this.getAttribute('href');
    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// EVENT DELEGATION

// 1. Add an eventListener on the parent element of all the elements that you are interesed in
// 2. Determine which element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target !== this) {
    // e.target.classList.contains('nav__link');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  // finding the closest parent with '.operations__tab' class name
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  // if there is no 'clicked', return immediately
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade on hover

// Only one argument can be passed to the handler
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  const link = e.target;
  if (link.classList.contains('nav__link')) {
    // DOM traversing: moving up twice
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    // change the opacity of siblings
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// Passing an 'argument' into the handler
// 'this' keyword set to 0.5 and 1
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navbar

// Method nr 1: using the 'scroll' event

/*
const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

window.addEventListener('scroll', function () {
  // console.log(window.pageYOffset);
  if (window.pageYOffset > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

// Method nr 2: Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // same as entries[0]
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const options = {
  root: null,
  threshold: 0, // looking for a moment when the header is completely out of the view
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // Guard clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, revOptions);

allSections.forEach(function (section) {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

///////////////////////////////////////
// Lazy loading images

const loadImages = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // wait for the load event
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-100px',
};

const imgObserver = new IntersectionObserver(loadImages, imgOptions);

// looking for images with the data-src attribute
const imageTargets = document.querySelectorAll('img[data-src]');

imageTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider component

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let currSlide = 0;
  const maxSlide = slides.length;

  const slider = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots');

  /*
slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible';
*/

  /*
// 0%,  100%,  200%,  300%
slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});
*/

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    // select an element containing the data set attribute with a number reffering to the current slide
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    // -100%,  0%,  100%,  200%
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // Go to the next slide
  const nextSlide = function () {
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = function () {
    // console.log(currSlide);
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

// ACTIVE SLIDE --> 0%

// 1st click
// console.log(100 * (0 - 1)); // -100
// console.log(100 * (1 - 1)); // 0
// console.log(100 * (2 - 1)); // 100
// console.log(100 * (3 - 1)); // 200

// 2nd click
// console.log(100 * (0 - 2)); // -200
// console.log(100 * (1 - 2)); // -100
// console.log(100 * (2 - 2)); // 0
// console.log(100 * (3 - 2)); // 100

// 3rd click
// console.log(100 * (0 - 3)); // -300
// console.log(100 * (1 - 3)); // -200
// console.log(100 * (2 - 3)); // -100
// console.log(100 * (3 - 3)); // 0

///////////////// LECTURES ////////////////

/*
/--- SELECTING ELEMENTS -----------
/ ------
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

// --------- REMOVING EVENT LISTENERS -----------
/*
const h1 = document.querySelector('h1');

// Listening to an event only ONCE
const runAlerth1 = function () {
  alert('addEventListener: heading');
  // h1.removeEventListener('mouseenter', alerth1);
};

h1.addEventListener('mouseenter', runAlerth1);

setTimeout(() => h1.removeEventListener('mouseenter', runAlerth1), 1000);

// Old school way of listening to an event
// h1.onmouseenter = function () {
//   alert('onmouseenter: heading');
// };
*/

/*
// --------- EVENT PROPAGATION: BUBBLING AND CAPTURING-----------
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

// If we click at .nav__link, its parents (.nav__links and .nav) also get their random colors
// event happens at the document root, then travells down to the target element
// from there is bubbles up
// bubbling up means that event is triggered also in all of the parent elements, because they all listen to the same event ('click')

// e.target points to where the event originates
// 'this' keyword points to the element on which the event handler is attached to

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(this === e.currentTarget);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINKS', e.target, e.currentTarget);
});

document.querySelector('nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
*/

/*
// --------- DOM TRAVERSING -----------
// Walking through the DOM

const h1 = document.querySelector('h1');

// GOING DOWNWARDS: CHILDREN

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// GOING UPWARDS: PARENTS
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

// element itself
h1.closest('h1').style.background = 'var(--gradient-primary)';

// GOING SIDEWAYS: SIBLINGS

// Nodes
console.log(h1.nextSibling);
console.log(h1.previousSibling);

// Elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// Getting all the siblings of h1
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/

/*
// --------- THE INTERSECTION OBSERVER API-----------
const obsCallback = function (entries, observer) {
  entries.forEach(e => console.log(e));
};

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);

// target
observer.observe(section1);
*/

/*
// --------- LIFECYCLE DOM EVENTS -----------

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded, including images', e);
});

// use case: filling-up forms asking users if they are 100% they want to leave the page
window.addEventListener('beforeunload', function (e) {
  console.log('Created imediately before user leaves the page', e);
  e.returnValue = '';
});
*/
