import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://teste'
});

instance.defaults.headers['Authorization'] = 'APP TOKEN INSTANCE';

instance.interceptors.request.use(request => {
    console.log('request', request);
    return request;
}, error => {
    console.log('error', error);
    Promise.reject(error);
});

export default instance;