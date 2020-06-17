import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

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

export default { getBirthdaysByCreatorUid };
