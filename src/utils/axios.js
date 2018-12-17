import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

export const axiosPost = (address, userData) => {
  return new Promise((resolve, reject) => {
    Axios.post(address, userData)
      .then(res => resolve(res))
      .catch(err => {
        reject(err);
      });
  });
};

export const axiosPut = (address, userData) => {
  return new Promise((resolve, reject) => {
    Axios.put(address, userData)
      .then(res => resolve(res))
      .catch(err => {
        reject(err);
      });
  });
};

export default Axios;
