import axios from 'axios';

const apiLogin = axios.create({
  baseURL: 'localhost:3001/',
});

export default apiLogin;
