import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const saveLocation = (locationData) => API.post('/save-location', locationData);
export const getLocations = () => API.get('/locations');
