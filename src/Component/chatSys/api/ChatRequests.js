import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createChat = (data) => API.post('/conver/', data);

export const userChats = (id) => API.get(`/conver/${id}`);

export const findChat = (firstId, secondId) => API.get(`/conver/find/${firstId}/${secondId}`);