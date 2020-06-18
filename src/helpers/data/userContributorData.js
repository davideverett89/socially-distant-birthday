import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserContributorsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userContributors.json?orderBy="userId"&equalTo="${userId}"`)
    .then((response) => {
      const userContributorObject = response.data;
      const userContributors = [];
      if (userContributorObject !== null) {
        Object.keys(userContributorObject).forEach((userContributorId) => {
          userContributorObject[userContributorId].id = userContributorId;
          userContributors.push(userContributorObject[userContributorId]);
        });
      }
      resolve(userContributors);
    })
    .catch((err) => reject(err));
});

export default { getUserContributorsByUserId };