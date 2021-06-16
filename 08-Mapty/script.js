'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      // console.log(latitude, longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}}`);
      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Handling clicks on map
      map.on('click', function (mapE) {
        // copying to global variable
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
}

// Event Listeners

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Display marker
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng], { opacity: 0.8 })
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        // assigning our own css style
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();

  // Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';
});

inputType.addEventListener('change', function (e) {
  // Solution 1
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

  // Solution 2
  // if (e.target.value === 'running') {
  //   inputCadence.parentElement.classList.remove('form__row--hidden');
  //   inputElevation.parentElement.classList.add('form__row--hidden');
  // } else {
  //   inputCadence.parentElement.classList.add('form__row--hidden');
  //   inputElevation.parentElement.classList.remove('form__row--hidden');
  // }
});
