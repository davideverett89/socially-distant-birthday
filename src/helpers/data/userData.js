import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const userObject = response.data;
      const users = [];
      if (userObject !== null) {
        Object.keys(userObject).forEach((userId) => {
          userObject[userId].id = userId;
          users.push(userObject[userId]);
        });
      }

      resolve(users);
    })
    .catch((err) => reject(err));
});

const getUserById = (userId) => axios.get(`${baseUrl}/users/${userId}`);

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

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
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

const patchUser = (userId, updatedDisplayName, updatedUid) => axios.patch(`${baseUrl}/users/${userId}.json`, { displayName: updatedDisplayName, uid: updatedUid });

export default {
  getUserByEmail,
  postUser,
  getUserByUid,
  getUsers,
  getUserById,
  patchUser,
};
