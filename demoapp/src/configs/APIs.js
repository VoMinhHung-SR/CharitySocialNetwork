import axios from 'axios'
import cookies from 'react-cookies'

export let endpoints = {
    'posts': '/posts/',
    'postDetail':(postID) => `/posts/${postID}/`,
    'login': '/o/token/',
    'post-owner':(userID) => `/users/${userID}/post-owner/`,
    'current-user':'/users/current-user/',
    'comments': (postID) => `/posts/${postID}/comments/`,
    'add-comment':(postID) => `/posts/${postID}/add-comment/`
}
export const authApi = () => {
    return axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
    
}

export default axios.create({
    baseURL: "http://localhost:8000"
})