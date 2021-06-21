'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} mln</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// XMLHttpRequest

/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  // as soon as data arrives, the callback is called
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // const data = JSON.parse(this.responseText)[0];
    console.log(data);

    const html = `
      <article class="country">
      <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} mln</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// AJAX calls:
getCountryData('Norway');
getCountryData('Seychelles');
*/

/*
const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} mln</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// Nested callbacks
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  // as soon as data arrives, the callback is called
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // const data = JSON.parse(this.responseText)[0];

    console.log(data);

    // render country
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2 (depending on country 1)
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

// AJAX calls:
getCountryAndNeighbour('Norway');

// Callback hell
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
    }, 1000);
  }, 1000);
}, 1000);
*/

///////////////////////////////////////
// Promises and fetch API

// fetch returns a Promise
// response argument is a value of the fulfilled promise
// to read the data comming from the response (from response body), we need to call the json() method on the response object
// json() method is also asycnchronous and it return new promise as well
// Note that despite the method being named json(), the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.

// const request = fetch(`https://restcountries.eu/rest/v2/name/norway`);
// console.log(request);

// const getCountryData = function (country) {
//   // fetch() returns a promise
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       // json() returns a promise
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

///////////////////////////////////////
// Chaining promises
/*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

getCountryData('Norway');

*/

///////////////////////////////////////
// Handling rejected promises

/*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      console.log(response);

      // 'throw' immediately terminates the function, just like 'return'
      // it also returns the rejected Promise
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);

      // const neighbour = data[0].borders[0];
      const neighbour = 'xxxxx';
      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Neighbour not found (${response.status})`);
      }
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    // the rejected Promise propagates down the chain until it reaches catch() method
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('Norway');
});
*/

const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }

    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      // const neighbour = 'xxxxx';
      if (!neighbour) throw new Error('No neighbour found');

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        '`Neighbour not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('Norway');
  getCountryData('Australia');
});
