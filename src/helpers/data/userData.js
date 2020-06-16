import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserByEmail = (email) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="email"&equalTo="${email}"`)
    .then((response) => {
      const userObject = response.data;
      const user = [];
      if (userObject !== null) {
        Object.keys(userObject).forEach((userId) => {
          userObject[userId].id = userId;
          user.push(userObject[userId]);
        });
      }
      resolve(user);
    })
    .catch((err) => reject(err));
});

const postUser = (newUser) => axios.post(`${baseUrl}/users.json`, newUser);

export default { getUserByEmail, postUser };
