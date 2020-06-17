import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBirthdays = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/birthdays.json`)
    .then((response) => {
      const birthdayObject = response.data;
      const birthdays = [];
      if (birthdayObject !== null) {
        Object.keys(birthdayObject).forEach((birthdayId) => {
          birthdayObject[birthdayId].id = birthdayId;
          birthdays.push(birthdayObject[birthdayId]);
        });
      }
      resolve(birthdays);
    })
    .catch((err) => reject(err));
});

const getBirthdaysByCreatorUid = (creatorUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/birthdays.json?orderBy="creatorUid"&equalTo="${creatorUid}"`)
    .then((response) => {
      const birthdayObject = response.data;
      const birthdays = [];
      if (birthdayObject !== null) {
        Object.keys(birthdayObject).forEach((birthdayId) => {
          birthdayObject[birthdayId].id = birthdayId;
          birthdays.push(birthdayObject[birthdayId]);
        });
      }
      resolve(birthdays);
    })
    .catch((err) => reject(err));
});

const getBirthdayById = (birthdayId) => axios.get(`${baseUrl}/birthdays/${birthdayId}.json`);

export default { getBirthdaysByCreatorUid, getBirthdayById, getBirthdays };
