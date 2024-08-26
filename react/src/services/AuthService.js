import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.access_token) {
      localStorage.setItem('auth_token', response.data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      console.log(response.data.access_token);
    }

    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error);
    return null;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Logout error:', error.response ? error.response.data : error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error('Get user error:', error.response ? error.response.data : error);
    return null;
  }
};
