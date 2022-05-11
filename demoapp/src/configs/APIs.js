import axios from 'axios'
import cookies from 'react-cookies'

export let endpoints = {
    'posts': '/posts/',
    'postDetail':(postID) => `/posts/${postID}/`,
    'login': '/o/token/',
    'current-user':'/users/current-user/'
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