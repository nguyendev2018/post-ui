import axios from "axios";
const axiosClient = axios.create({
    baseURL: "https://js-post-api.herokuapp.com/api/",
    headers: {
        'Content-Type': "application/json",

    }
})
// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config là config request
    console.log('request interceptors', config);
    // Attach token to request if exits

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default axiosClient;