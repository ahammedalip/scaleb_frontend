// import axios from 'axios'

// const api = axios.create({
//     baseURL: 'http://localhost:3000'
// })


// if (localStorage.getItem("retailerSales_token")) {
//     api.interceptors.request.use((request) => {
//         request.headers.Authorization = localStorage.getItem("retailerSales_token")
//         return request
//     })
// } else if (localStorage.getItem('production_token')) {
//     api.interceptors.request.use((request) => {
//         request.headers.Authorization = localStorage.getItem('production_token')
//         return request
//     })
// }else if(localStorage.getItem('superAdmin_token')){
//     api.interceptors.request.use((request)=>{
//         request.headers.Authorization = localStorage.getItem("superAdmin_token")
//         return request
//     })
// }else if(localStorage.getItem('retailer_token')){
//     api.interceptors.request.use((request)=>{
//         request.headers.Authorization = localStorage.getItem('retailer_token')
//         return request
//     })
// }

// api.interceptors.response.use(response => response, err => {
//     if (err.response && err.response.status === 500) {
//         console.log('error at interceptor', err.response);
//     }
//     return Promise.reject(err)
// })

// export default api;


import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

// Single interceptor to handle authorization
api.interceptors.request.use((request) => {
    // Define a function to get the token based on the type
    const getToken = (type:any) => localStorage.getItem(type + '_token');

    // Check for the presence of each token type and set the Authorization header accordingly
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
