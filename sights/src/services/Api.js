import axios from 'axios';

export default() => axios.create({
  baseURL: process.env.API || 'http://localhost:8081',
});
