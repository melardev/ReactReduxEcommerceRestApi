import axios from "axios";

let cachedUser = {};

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    responseType: 'json',
    responseEncoding: 'utf8'
});

axiosInstance.interceptors.request.use((config) => {
    if (cachedUser.token)
        config.headers.authorization = "Bearer " + cachedUser.token;
    return config;
}, function (error) {
    return Promise.reject(error);
});

function get(url) {
    return axiosInstance.get(url)
}

function post(url, data) {
    return axiosInstance.post(url, data);
}

function put() {

}

function destroy(url) {

}

function setUser(user) {
    cachedUser = user;
}

function fetchPage(url, pagination = {page: 1, page_size: 5}) {
    return get(`${url}?page=${pagination.page || 1}&page_size=${pagination.page_size || 5}`)
}

export const AxiosService = {
    axiosInstance,
    get,
    setUser,
    post,
    put,
    destroy,
    fetchPage,
};
