'use strict';

///////////////////////////////////////
// Coding Challenge #1

// PART 1

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
};
/*
const whereAmI = function (lat, lng) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;

  fetch(url)
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error('Coordinates not found');
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      const country = data.countryName;
      fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(response => {
          console.log(response);
          if (!response.ok) throw new Error('Country not found');
          return response.json();
        })
        .then(data => {
          const [countryData] = data;
          if (!countryData) throw new Error('Country not found');
          renderCountry(countryData);
        });
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};
*/
const getResponse = function (url, msg) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(msg);
    return response.json();
  });
};

// Refactoring:
const whereAmI = function (lat, lng) {
  getResponse(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    'Coordinates not found'
  )
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

whereAmI(-33.758011, 150.705444);
// whereAmI(52.508, 13.381);

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data.
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors.

*/
