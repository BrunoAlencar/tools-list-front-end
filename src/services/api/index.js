import axios from 'axios';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const api = axios.create({
    baseURL: 'http://localhost:4000/tools',
    headers
})

export default api;