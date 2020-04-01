// DOC: https://docs.google.com/spreadsheets/d/1LdOHeRQFemXERCzdAgxaI-SKcMtZOqxtyiu4fDBmJKk/edit#gid=0

import axios from 'axios';

const baseUrl = 'https://femtogudaki-backend-user-op3ovi357a-an.a.run.app';

export const courseService = {
    /*
    params: { courseId: String }
    callback: (data, error) => {}
    */
    getCourseDetail: (params, callback) => {
        // Why POST orz
        const endpoint = '/detail/';
        axios.post(baseUrl + endpoint, params)
            .then(response => callback(response.data))
            .catch(error => callback(null, error));
    },

    /*
    params: {
        author: String,
        token: String,
        courseName: String,
        description: String,
        job: String
    }
    callback: (data: { id, status }, error) => {}
    */
    addCourse: (params, callback) => {
        const endpoint = '/addCourse/';
        axios.post(baseUrl + endpoint, params)
            .then(response => callback(response.data))
            .catch(error => callback(null, error));
    },

    /*
    params: { keyword: String[, lastId: Integer] }
    callback: (data: { data, lastId }, error) => {}
    */
    searchCourse: (params, callback) => {
        const endpoint = '/search/';
        axios.get(baseUrl + endpoint, { params: params })
            .then(response => callback(response.data))
            .catch(error => callback(null, error));
    }
}

export const enrollmentService = {
    /*
    params { couseId: String, username: String, token: String }
    callback: (data: { id, enrollDateTime, status }, error) => {}
    */
    enrollCourse: (params, callback) => {
        const endpoint = '/enroll/';
        axios.post(baseUrl + endpoint, params)
            .then(response => callback(response.data))
            .catch(error => callback(null, error));
    }
}

export const userService = {
    /*
    username: String
    callback: (user, error) => {}
    */
    getUserDetail: (username, callback) => {
        const endpoint = '/user/' + username + '/';
        // TODO: Get auth token
        const headers = { Authorization: 'AUTH TOKEN HERE' }
        axios.get(baseUrl + endpoint, { headers: headers })
            .then(response => callback(response.data))
            .catch(error => callback(null, error));
    },

    /*
    username: String
    params: { firstName: String, lastName: String, birthDate: String, job: String }
    callback: (error) => {}
    */
    updateUserDetail: (username, params, callback) => {
        const endpoint = '/user/' + username + '/';
        // TODO: Get auth token
        const headers = { Authorization: 'AUTH TOKEN HERE' }
        axios.put(baseUrl + endpoint, params, { headers: headers })
            .then(response => callback(null))
            .catch(error => callback(error));
    },

    /*
    username: String
    callback: (error) => {}
    */
    deleteUser: (username, callback) => {
        const endpoint = '/user/' + username + '/';
        // TODO: Get auth token
        const headers = { Authorization: 'AUTH TOKEN HERE' }
        axios.delete(baseUrl + endpoint, { headers: headers })
            .then(response => callback(null))
            .catch(error => callback(error));
    },

    /*
    params: {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        birthDate: String,
        job: String,
    }
    callback: (error) => {}
    */
    register: (params, callback) => {
        const endpoint = '/register/'
        axios.post(baseUrl + endpoint, params)
            .then(response => callback(null))
            .catch(error => callback(error));
    },

    /*
    params: { username: String, password: String }
    callback: (authToken, error) => {}
    */
    login: (params, callback) => {
        const endpoint = '/login/';
        axios.post(baseUrl + endpoint, params)
            .then(response => callback(response.headers.authorization))
            .catch(error => callback(null, error));
    }
}