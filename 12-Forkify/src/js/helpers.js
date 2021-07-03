import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// Promise will reject after certain amount of time
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // Hanling request which take too long
    // the fastest rejected/fulfilled Promise wins
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    // promise returned from this fn is now being rejected if there is an error
    // propagating error down from one async fn to the other
    // console.log(`Helper ${err}`);
    throw err;
  }
};
