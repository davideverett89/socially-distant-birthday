import axios from 'axios';
import apiKeys from '../apiKeys.json';

const nodemailBaseUrl = apiKeys.nodemailAPI.baseUrl;

const sendEmails = (addresses, subject, message) => axios({
  method: 'post',
  url: `${nodemailBaseUrl}/send`,
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    sendEmail: addresses,
    name: subject,
    message,
  },
});

export default { sendEmails };
