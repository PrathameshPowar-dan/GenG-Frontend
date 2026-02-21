import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001',
    // baseURL: 'http://uat-nlb.shorttt.in/api', // TEST API
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // if you're using cookies/auth
});

export default api;