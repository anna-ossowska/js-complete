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
    const fetchPro = fetch(url);

    // Hanling request which take too long
    // the fastest rejected/fulfilled Promise wins
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    // promise returned from this fn is now being rejected if there is an error
    // propagating error down from async fn in helper.js --> to async fn in model.js
    // console.log(`Helper ${err}`);
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // specifying that format that we send is JSON
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
