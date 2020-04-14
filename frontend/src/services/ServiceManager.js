// DOC: https://docs.google.com/spreadsheets/d/1LdOHeRQFemXERCzdAgxaI-SKcMtZOqxtyiu4fDBmJKk/edit#gid=0

import axios from 'axios';

const courseBaseUrl = 'https://femtogudaki-backend-course-op3ovi357a-an.a.run.app';
const enrollmentBaseUrl = 'https://femtogudaki-backend-course-op3ovi357a-an.a.run.app';
const userBaseUrl = 'https://femtogudaki-backend-user-op3ovi357a-an.a.run.app';
const authToken = localStorage.getItem('auth');

export const courseService = {
    /*
    courseId: String
    callback: (data, error) => {}
    */
    getCourseDetail: (courseId, callback) => {
        // Why POST orz
        const endpoint = '/detail/';
        axios.post(courseBaseUrl + endpoint, courseId)
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
        axios.post(courseBaseUrl + endpoint, params)
            .then(response => callback(response.data))
            .catch(error => callback(null, error));
    },

    /*
    params: {
            subject: String,
            content: String,
    }
    callback: (data: { id, status }, error) => {}
    */
    addKnowledge: (params, callback) => {
        const endpoint = '/knowledge/';
        const headers = { Authorization: authToken }
        axios.post(courseBaseUrl + endpoint, params, {headers: headers})
            .then(response => callback(response.data))
            .catch(error => callback(null, error));
    },

    /*
    params: { keyword: String[, lastId: Integer] }
    callback: (data: { data, lastId }, error) => {}
    */
    searchCourse: (query, callback) => {
        const endpoint = '/course?query=' + query;
        axios.get(courseBaseUrl + endpoint)
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
        axios.post(enrollmentBaseUrl + endpoint, params)
            .then(response => callback(response.data))
            .catch(error => callback(null, error));
    },

    getEnrollCourse: (username, callback) => {
        const endpoint = '/enroll/user/' + username;
        axios.get(enrollmentBaseUrl + endpoint)
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
        const headers = { Authorization: authToken }
        axios.get(userBaseUrl + endpoint, { headers: headers })
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
        const headers = { Authorization: authToken }
        axios.put(userBaseUrl + endpoint, params, { headers: headers })
            .then(response => callback(null))
            .catch(error => callback(error));
    },

    /*
    username: String
    callback: (error) => {}
    */
    deleteUser: (username, callback) => {
        const endpoint = '/user/' + username + '/';
        const headers = { Authorization: authToken }
        axios.delete(userBaseUrl + endpoint, { headers: headers })
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
        axios.post(userBaseUrl + endpoint, params)
            .then(response => callback(null))
            .catch(error => callback(error));
    },

    /*
    params: { username: String, password: String }
    callback: (authToken, error) => {}
    */
    login: (params, callback) => {
        const endpoint = '/login/';
        axios.post(userBaseUrl + endpoint, params)
            .then(response => callback(response.headers.authorization))
            .catch(error => callback(null, error));
    }
}