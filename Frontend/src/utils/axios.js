import axios from 'axios';


const API=axios.create({
    baseURL:'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
    }
});

API.interceptors.request.use(
    
    (config) => {
        console.log("Sending request to:", config.url);
  console.log("Request payload:", config.data);
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            console.error('Unauthorized access - redirecting to login');
            // You can also clear the token from localStorage here
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default API;
