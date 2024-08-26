import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
});

export const register = (userData) => API.post('/register', userData);
export const login = (userData) => API.post('/login', userData);
export const logout = () => API.post('/logout');
export const fetchUser = () => API.get('/user');
