const timeLabel = document.querySelector('.time');

const header = document.querySelector('h1');

const tick = function () {
  let day = Math.floor(time / (60 * 60 * 24));
  let hour = (Math.floor(time / (60 * 60)) % 24).toString().padStart(2, '0');
  let min = Math.floor((time / 60) % 60)
    .toString()
    .padStart(2, '0');
  let sec = (time % 60).toString().padStart(2, '0');

  if (day === 1) {
    timeLabel.innerHTML = `${day} <span>day</span> ${hour}<span>h</span> ${min}<span>min</span> ${sec}<span>s</span>`;
  } else if (day === 0) {
    timeLabel.innerHTML = `${hour}<span>h</span> ${min}<span>min</span> ${sec}<span>s</span>`;
  } else {
    timeLabel.innerHTML = `${day} <span>days</span> ${hour}<span>h</span> ${min}<span>min</span> ${sec}<span>s</span>`;
  }

  if (time === 0) {
    clearInterval(timer);
    timeLabel.style.display = 'none';
    header.textContent = 'Happy Xmas!';
  }

  time--;
};

const timeToXmas = function () {
  // in millisec
  const now = new Date().getTime();
  const xmas = new Date(2021, 11, 25, 0).getTime();

  // distance in seconds
  return Math.floor(Math.abs(xmas - now) / 1000);
};

time = timeToXmas();

tick();

const timer = setInterval(tick, 1000);
