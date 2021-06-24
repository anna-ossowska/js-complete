'use strict';

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

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

/*
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

*/
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

/*
const getResponse = function (url, msg) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(msg);
    return response.json();
  });
};

// REFACTORING
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
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
*/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imagesContainer = document.querySelector('.images');
let currentImage;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imagesContainer.insertAdjacentElement('beforeend', img);
      // img received as a resolved value
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000 * seconds);
  });
};

/*
createImage('./img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log(currentImage);
    return wait(2);
  })
  .then(() => {
    console.log('2 seconds passed');
    currentImage.style.display = 'none';
    return createImage('./img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    console.log('2 seconds passed');
    currentImage.style.display = 'none';
    return createImage('./img/img-3.jpg');
  })
  .catch(err => console.error(err.message));
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

*/

/*
const loadNPause = async function () {
  try {
    let img = await createImage('./img/img-1.jpg');
    console.log('1st image loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('./img/img-2.jpg');
    console.log('2nd image loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('./img/img-3.jpg');
    console.log('3rd image loaded');
  } catch (err) {
    console.error(err);
  }
};

loadNPause();
*/

// createImage('./img/img-1.jpg') returns a fulfilled promise
// const img = await createImage('./img/img-1.jpg'); returns a value

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(img => createImage(img));
    console.log(imgs);

    // Promise.all() will resolve all promises returned from the createImg() function
    const allImgs = await Promise.all(imgs);
    console.log(allImgs);

    allImgs.map(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

const images = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
loadAll(images);
