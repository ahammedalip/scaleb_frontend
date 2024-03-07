
import axios from 'axios';

//  use config file 
const api = axios.create({
    baseURL: 'http://localhost:3000'
});

// Single interceptor to handle authorization
api.interceptors.request.use((request) => {
    // Define a function to get the token based on the type
    const getToken = (type:any) => localStorage.getItem(type + '_token');

    if (getToken('retailerSales')) {
        request.headers.Authorization = `Bearer ${getToken('retailerSales')}`;
    } else if (getToken('production')) {
        request.headers.Authorization = `Bearer ${getToken('production')}`;
    } else if (getToken('superAdmin')) {
        request.headers.Authorization = `Bearer ${getToken('superAdmin')}`;
    } else if (getToken('retailer')) {
        request.headers.Authorization = `Bearer ${getToken('retailer')}`;
    }

    return request;
}, (error) => {
    // Handle request error
    return Promise.reject(error);
});

api.interceptors.response.use(response => response, err => {
    if (err.response && err.response.status ===  500) {
        // Handle  500 error
        console.log('error at interceptor', err.response);
    }
    return Promise.reject(err);
});

export default api;
