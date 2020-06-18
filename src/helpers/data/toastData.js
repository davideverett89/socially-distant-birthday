import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getToastsByBirthdayId = (birthdayId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/toasts.json?orderBy="birthdayId"&equalTo="${birthdayId}"`)
    .then((response) => {
      const toastObject = response.data;
      const toasts = [];
      if (toastObject !== null) {
        Object.keys(toastObject).forEach((toastId) => {
          toastObject[toastId].id = toastId;
          toasts.push(toastObject[toastId]);
        });
      }
      resolve(toasts);
    })
    .catch((err) => reject(err));
});

export default { getToastsByBirthdayId };
