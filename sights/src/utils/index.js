import axios from 'axios';

export default {
  setAuthorizationHeader(accessToken) {
    axios.defaults.headers.common.Authorization = `${accessToken}`;
  },
};
