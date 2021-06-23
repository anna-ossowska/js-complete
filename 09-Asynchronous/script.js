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
  countriesContainer.style.opacity = 1;
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

/*
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
        'Neighbour not found'
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
*/

// btn.addEventListener('click', function () {
//   getCountryData('Norway');
//   getCountryData('Australia');
// });

///////////////////////////////////////
// Event loop in practice

/*
console.log('Test start');

setTimeout(() => console.log(' 0 sec timer'), 0);

Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');
*/

// Test start             -> synchronous code returned first
// Test end               -> synchronous code returned first
// Resolved promise 1     -> callbacks comming from Microtasks Queue have the priority over the callbacks from the Callback Queue
// 0 sec timer            -> returned after some time

///////////////////////////////////////
// Building a Promise

/*
const lotteryPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win');
    } else {
      reject(new Error('You loose'));
    }
  }, 2000);
});

// prettier-ignore
lotteryPromise
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Old way:
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//     }, 1000);
//   }, 1000);
// }, 1000);

wait(2)
  .then(() => {
    console.log('I waited for 2s');
    return wait(1);
  })
  .then(() => console.log('I waited for 1s'));

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  });

// Resolving immediately
Promise.resolve('xxx').then(x => console.log('x'));
*/

///////////////////////////////////////
// Promisifying the Geolocation API

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

const getResponse = function (url, msg) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(msg);
    return response.json();
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return getResponse(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
        'Coordinates not found'
      );
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      const country = data.countryName;
      return getResponse(
        `https://restcountries.eu/rest/v2/name/${country}`,
        'Country not found'
      );
    })
    .then(data => {
      const [countryData] = data;
      renderCountry(countryData);

      const neighbour = countryData.borders[0];
      if (!neighbour) throw new Error('Neighbour not found');
      return getResponse(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Neighbour not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);
*/

///////////////////////////////////////
// Consuming Promises with Async/Await

// Exactly the same as:
// fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
//   console.log(res)
// );

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  const position = await getPosition();
  const { latitude: lat, longitude: lng } = position.coords;

  // Reverse geocoding
  const resGeo = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );

  const dataGeo = await resGeo.json();

  console.log(dataGeo);

  // Country data
  // we wait for the value of the Promise to be returned
  const resCountry = await fetch(
    `https://restcountries.eu/rest/v2/name/${dataGeo.countryName}`
  );

  const data = await resCountry.json();

  renderCountry(data[0]);
};

whereAmI();
console.log('Should be printed first');
*/

///////////////////////////////////////
// Error handing with Async/Await (try...catch)

// Simplified example
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
//   // Catch has an access to whatever error occuredi n the try block
// } catch (err) {
//   console.log(err.message);
// }

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse geocoding
    // // Promise comming from fetch is automatically rejected only if user has no Internet connection
    // //  We must throw an error for other scenarios manually
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    if (!resGeo.ok) throw new Error('Geolocation data not found');
    const dataGeo = await resGeo.json();

    // Country data
    const resCountry = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.countryName}`
    );

    if (!resGeo.ok) throw new Error('Country not found');
    const data = await resCountry.json();

    renderCountry(data[0]);
  } catch (err) {
    console.log(`${err.message}`);
    console.log(err.type);
  }
};
*/

///////////////////////////////////////
// Returning values from async functions

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    if (!resGeo.ok) throw new Error('Geolocation data not found');
    const dataGeo = await resGeo.json();

    // Country data
    const resCountry = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.countryName}`
    );

    if (!resGeo.ok) throw new Error('Country not found');
    const data = await resCountry.json();

    renderCountry(data[0]);

    return `You are in ${dataGeo.locality}, ${dataGeo.countryName}`;
  } catch (err) {
    console.log(`${err.message}`);
    // To reject the promise returned from async function, rethrow an error inside catch block
    throw err;
  }
};

console.log('1. Will get location');

// This function returns a Promise
// If there is error inside function body defined above, that error will never reach catch block, because Promise is automatically filfilled, not rejected
// whereAmI()
//   .then(sentence => console.log(`2. ${sentence}`))
//   .catch(err => console.error(`2. ${err.message}`))
//   .finally(() => console.log('3. Finished getting location'));

// Refactoring by using async/await
(async function () {
  try {
    const sentence = await whereAmI();
    console.log(sentence);
  } catch (err) {
    console.error(`2. ${err.message}`);
  } finally {
    console.log('3. Finished getting location');
  }
})();
