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

const getBirthdaybyGuestOfHonorId = (guestOfHonorId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/birthdays.json?orderBy="guestOfHonorId"&equalTo="${guestOfHonorId}"`)
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

const postBirthday = (newBirthday) => axios.post(`${baseUrl}/birthdays.json`, newBirthday);

const deleteBirthday = (birthdayId) => axios.delete(`${baseUrl}/birthdays/${birthdayId}.json`);

const putBirthday = (birthdayId, updatedBirthday) => axios.put(`${baseUrl}/birthdays/${birthdayId}.json`, updatedBirthday);

export default {
  getBirthdaysByCreatorUid,
  getBirthdayById,
  getBirthdays,
  postBirthday,
  deleteBirthday,
  putBirthday,
  getBirthdaybyGuestOfHonorId,
};
