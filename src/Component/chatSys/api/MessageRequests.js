import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getMessages = (id) => API.get(`/msg/${id}`);

export const addMessage = (data) => API.post('/msg/', data);